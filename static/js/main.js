document.addEventListener("DOMContentLoaded", () => {
    // 1. Horizontal Tab Toggling
    const tabButtons = document.querySelectorAll(".form-tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetTab = btn.getAttribute("data-tab");

            // Toggle active menu class on buttons
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Toggle active panel class
            tabPanels.forEach(panel => {
                panel.classList.remove("active");
                if (panel.id === `${targetTab}-panel`) {
                    panel.classList.add("active");
                }
            });

            // Adjust URL hash (optional, for bookmarkability)
            history.pushState(null, null, `#${targetTab}`);
        });
    });

    // Check for hash on load to open specific tab
    const hash = window.location.hash.replace("#", "");
    if (hash) {
        const matchingBtn = document.querySelector(`.form-tab-btn[data-tab="${hash}"]`);
        if (matchingBtn) {
            matchingBtn.click();
        }
    }

    // 2. Dropdown Population Logic
    const trainClassSelect = document.getElementById("trainClass");
    const trainSubClassSelect = document.getElementById("trainSubClass");
    const stationClassSelect = document.getElementById("stationClass");
    const stationSubClassSelect = document.getElementById("stationSubClass");

    // Populate Train Classes
    if (trainClassSelect && typeof TRAIN_CATEGORIES !== "undefined") {
        trainClassSelect.innerHTML = '<option value="">Select Category</option>';
        Object.keys(TRAIN_CATEGORIES).sort().forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            trainClassSelect.appendChild(option);
        });

        trainClassSelect.addEventListener("change", function() {
            const selectedClass = this.value;
            trainSubClassSelect.innerHTML = '<option value="">Select Subcategory</option>';
            
            if (selectedClass && TRAIN_CATEGORIES[selectedClass]) {
                TRAIN_CATEGORIES[selectedClass].sort().forEach(sub => {
                    const option = document.createElement("option");
                    option.value = sub;
                    option.textContent = sub;
                    trainSubClassSelect.appendChild(option);
                });
            }
        });
    }

    // Populate Station Classes
    if (stationClassSelect && typeof STATION_CATEGORIES !== "undefined") {
        stationClassSelect.innerHTML = '<option value="">Select Category</option>';
        Object.keys(STATION_CATEGORIES).sort().forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            stationClassSelect.appendChild(option);
        });

        stationClassSelect.addEventListener("change", function() {
            const selectedClass = this.value;
            stationSubClassSelect.innerHTML = '<option value="">Select Subcategory</option>';

            if (selectedClass && STATION_CATEGORIES[selectedClass]) {
                STATION_CATEGORIES[selectedClass].sort().forEach(sub => {
                    const option = document.createElement("option");
                    option.value = sub;
                    option.textContent = sub;
                    stationSubClassSelect.appendChild(option);
                });
            }
        });
    }

    // Set current date/time as default and max for datetime-local inputs
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now - tzOffset)).toISOString().slice(0, 16);
    
    document.querySelectorAll('input[type="datetime-local"]').forEach(input => {
        input.max = localISOTime;
        input.value = localISOTime;
    });

    // 3. AJAX Form Submissions (Train, Station)
    const forms = ["train-form", "station-form"];
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const submitBtn = form.querySelector(".btn-submit");
                const originalBtnText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = "Submitting...";

                try {
                    const response = await fetch(form.action, {
                        method: "POST",
                        body: formData
                    });

                    if (response.ok) {
                        const result = await response.json();
                        
                        // Render Success screen inside the card
                        const cardBody = form.closest(".form-card");
                        const cardTitle = cardBody.querySelector(".card-title");
                        
                        cardTitle.textContent = "Complaint Registered";
                        cardBody.innerHTML = `
                            <div class="card-header">
                                <h2 class="card-title">Grievance Registered Successfully</h2>
                            </div>
                            <div class="success-banner">
                                <h3>Complaint Filed Successfully</h3>
                                <p>Please note down your unique Complaint ID for tracking:</p>
                                <div class="id-badge">${result.complaint_id}</div>
                            </div>
                            <div class="submit-container" style="gap: 15px;">
                                <button class="btn-submit" style="background-color: #555;" onclick="window.location.hash='#track'; window.location.reload();">Track Status</button>
                                <button class="btn-submit" onclick="window.location.reload()">File New Grievance</button>
                            </div>
                        `;
                    } else {
                        const errText = await response.text();
                        alert("Error: " + errText);
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                    }
                } catch (error) {
                    console.error("Submission error:", error);
                    alert("An error occurred during submission. Please check your connection.");
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            });
        }
    });

    // 4. AJAX Complaint Tracking
    const trackForm = document.getElementById("track-form");
    const trackerResults = document.getElementById("tracker-results");

    if (trackForm) {
        trackForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const complaintId = document.getElementById("trackId").value.trim();
            const submitBtn = trackForm.querySelector(".btn-submit");

            if (!complaintId) return;

            submitBtn.disabled = true;
            submitBtn.textContent = "Searching...";
            trackerResults.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Fetching status details...</p>';

            try {
                const response = await fetch(`/track-api/${complaintId}`);
                if (response.status === 404) {
                    trackerResults.innerHTML = `
                        <div class="success-banner" style="background-color: #ffebee; border-color: #ffcdd2;">
                            <h3 style="color: var(--error-color)">Complaint Not Found</h3>
                            <p>No records found for Complaint ID <b>${complaintId}</b>. Please check the spelling and try again.</p>
                        </div>
                    `;
                } else if (response.ok) {
                    const data = await response.json();
                    
                    // Render details beautifully
                    const typeLabel = data.complaint_type === "Train" ? "Train Complaint" : "Station Complaint";
                    const locationLabel = data.complaint_type === "Train" 
                        ? `Train No: ${data.train_number} | Coach: ${data.coach_number || 'N/A'}`
                        : `Station: ${data.station_name} | Platform: ${data.platform_number || 'N/A'} | Area: ${data.station_area || 'N/A'}`;

                    const statusClass = data.complaint_status.toLowerCase() === "open" ? "open" : "closed";

                    trackerResults.innerHTML = `
                        <div class="tracker-results">
                            <h3 class="form-section-title" style="margin-top:0;">Grievance Status Details</h3>
                            <div class="form-grid" style="margin-bottom: 0;">
                                <div class="form-group">
                                    <label>Complaint ID</label>
                                    <div style="font-weight: 700; color: var(--primary-color); font-size: 1.1rem;">${data.complaint_id}</div>
                                </div>
                                <div class="form-group">
                                    <label>Current Status</label>
                                    <div><span class="status-badge ${statusClass}">${data.complaint_status}</span></div>
                                </div>
                                <div class="form-group">
                                    <label>Phone Number</label>
                                    <div>${data.phone_number}</div>
                                </div>
                                <div class="form-group">
                                    <label>Type & Category</label>
                                    <div><b>${typeLabel}</b> > ${data.main_class} (${data.sub_class})</div>
                                </div>
                                <div class="form-group">
                                    <label>Location Details</label>
                                    <div>${locationLabel}</div>
                                </div>
                                <div class="form-group">
                                    <label>Incident Date & Time</label>
                                    <div>${data.incident_date} ${data.incident_time || ''}</div>
                                </div>
                                <div class="form-group">
                                    <label>Registered On</label>
                                    <div>${data.created_at}</div>
                                </div>
                                <div class="form-group full-width">
                                    <label>Complaint Description</label>
                                    <div style="background-color: #fafbfc; border: 1px solid var(--border-color); padding: 12px; border-radius: 6px; font-style: italic;">
                                        "${data.complaint_description}"
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    trackerResults.innerHTML = `
                        <div class="success-banner" style="background-color: #ffebee; border-color: #ffcdd2;">
                            <h3 style="color: var(--error-color)">Error</h3>
                            <p>Unable to retrieve records at this time. Please try again later.</p>
                        </div>
                    `;
                }
            } catch (error) {
                console.error("Tracking search error:", error);
                trackerResults.innerHTML = `
                    <div class="success-banner" style="background-color: #ffebee; border-color: #ffcdd2;">
                        <h3 style="color: var(--error-color)">Connection Error</h3>
                        <p>Could not connect to the database. Please verify your connection.</p>
                    </div>
                `;
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Track Status";
            }
        });
    }

    // 5. Word Counting & Truncation for Textareas (Max 150 Words)
    const textareas = [
        { id: "trainDescription", counterId: "trainWordCount" },
        { id: "stationDescription", counterId: "stationWordCount" }
    ];

    textareas.forEach(item => {
        const textarea = document.getElementById(item.id);
        const counter = document.getElementById(item.counterId);

        if (textarea && counter) {
            const updateCount = () => {
                const text = textarea.value;
                let words = text.trim().split(/\s+/).filter(w => w.length > 0);
                let wordCount = words.length;

                if (wordCount > 150) {
                    // Match the first 150 words including their whitespace
                    const match = text.match(/^(\s*\S+\s+){149}\s*\S+/);
                    if (match) {
                        textarea.value = match[0];
                        words = textarea.value.trim().split(/\s+/).filter(w => w.length > 0);
                        wordCount = words.length;
                    }
                }

                counter.textContent = `(${wordCount} / 150 words)`;

                if (wordCount >= 150) {
                    counter.classList.add("limit-reached");
                } else {
                    counter.classList.remove("limit-reached");
                }
            };

            textarea.addEventListener("input", updateCount);
            updateCount();
        }
    });
});
