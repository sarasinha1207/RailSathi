import React, { useState, useEffect, useRef, useCallback } from 'react';

//  SVG Icon components 
const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <rect x="3" y="9" width="18" height="12" rx="1" /><path d="M3 9l9-6 9 6" /><line x1="9" y1="21" x2="9" y2="13" /><line x1="15" y1="21" x2="15" y2="13" />
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
  </svg>
);
const IconRoute = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" />
  </svg>
);
const IconGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
const IconStation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);
const IconChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

//  Zone data 
// All 18 Zonal Railways mapped to dedicated unique /zone_<abbr>.jpg images
const RAILWAY_ZONES = [
  {
    name: 'Northern Railway', abbr: 'NR', hq: 'New Delhi',
    established: '14 Apr 1952', routeKm: '6,968 km', divisions: 5, stations: 713,
    description: 'One of the oldest and busiest zones, spanning Delhi, Punjab, Haryana, Himachal Pradesh and J&K. Anchored by New Delhi and Old Delhi, it handles the heaviest passenger traffic in the country.',
    image: '/zone_nr.jpg', accent: '#1a3a6b',
  },
  {
    name: 'North Eastern Railway', abbr: 'NER', hq: 'Gorakhpur',
    established: '14 Apr 1952', routeKm: '3,667 km', divisions: 3, stations: 520,
    description: 'Headquartered at Gorakhpur, home to the world\'s longest railway platform at 1,366 m. NER connects eastern Uttar Pradesh and Bihar through dense Indo-Gangetic agricultural plains.',
    image: '/zone_ner.jpg', accent: '#1a3a6b',
  },
  {
    name: 'Northeast Frontier Railway', abbr: 'NFR', hq: 'Maligaon, Guwahati',
    established: '15 Jan 1958', routeKm: '3,907 km', divisions: 5, stations: 692,
    description: 'Connecting India\'s Seven Sisters through extraordinary terrain - river valleys, dense forests, and high altitude. The Bogibeel Bridge on the Brahmaputra is a crowning achievement of NFR.',
    image: '/zone_nfr.jpg', accent: '#1e5631',
  },
  {
    name: 'North Central Railway', abbr: 'NCR', hq: 'Prayagraj',
    established: '01 Apr 2003', routeKm: '3,151 km', divisions: 3, stations: 345,
    description: 'Commands the strategic Delhi-Kolkata and Delhi-Mumbai trunk routes. Headquartered at the Sangam city of Prayagraj, with one of the most critical rail junctions in the country.',
    image: '/zone_ncr.jpg', accent: '#1a3a6b',
  },
  {
    name: 'North Western Railway', abbr: 'NWR', hq: 'Jaipur',
    established: '01 Oct 2002', routeKm: '5,459 km', divisions: 4, stations: 609,
    description: 'Headquartered in the Pink City of Jaipur, NWR covers Rajasthan\'s vast desert and semi-arid terrain. Famous for the Palace on Wheels luxury train and the scenic Shekhawati rail route.',
    image: '/zone_nwr.jpg', accent: '#8b1a1a',
  },
  {
    name: 'Central Railway', abbr: 'CR', hq: 'CSMT, Mumbai',
    established: '05 Nov 1951', routeKm: '3,905 km', divisions: 5, stations: 282,
    description: 'Its headquarters CSMT Mumbai is a UNESCO World Heritage Site. Central Railway operates the world\'s busiest suburban rail corridor and connects Mumbai to Pune, Nagpur and beyond.',
    image: '/zone_cr.jpg', accent: '#6b1a1a',
  },
  {
    name: 'South Central Railway', abbr: 'SCR', hq: 'Secunderabad',
    established: '02 Oct 1966', routeKm: '5,803 km', divisions: 5, stations: 698,
    description: 'Serving the Deccan plateau across Telangana and Andhra Pradesh, SCR is known for high-speed Rajdhani and Shatabdi operations and manages the twin-city hub of Hyderabad-Secunderabad.',
    image: '/zone_scr.jpg', accent: '#6b4a1a',
  },
  {
    name: 'Southern Railway', abbr: 'SR', hq: 'Chennai',
    established: '14 Apr 1951', routeKm: '5,098 km', divisions: 6, stations: 689,
    description: 'Serving Tamil Nadu, Kerala, and Puducherry. SR operates the Nilgiri Mountain Railway - a UNESCO World Heritage Site - along with major suburban networks in Chennai.',
    image: '/zone_sr.jpg', accent: '#1e5631',
  },
  {
    name: 'South Western Railway', abbr: 'SWR', hq: 'Hubli',
    established: '01 Apr 2003', routeKm: '3,177 km', divisions: 3, stations: 514,
    description: 'Covering Karnataka, connecting the tech capital Bengaluru with the rest of India. Manages the Bengaluru Suburban Rail Project and the stunning approaches to the Kerala hills.',
    image: '/zone_swr.jpg', accent: '#1e5631',
  },
  {
    name: 'South Eastern Railway', abbr: 'SER', hq: 'Kolkata',
    established: '01 Aug 1955', routeKm: '2,631 km', divisions: 4, stations: 492,
    description: 'A freight powerhouse spanning West Bengal, Jharkhand and Odisha. SER handles the highest freight loading among all zones - primarily coal from Jharkhand\'s mineral belt.',
    image: '/zone_ser.jpg', accent: '#1a3a6b',
  },
  {
    name: 'South East Central Railway', abbr: 'SECR', hq: 'Bilaspur',
    established: '01 Apr 2003', routeKm: '2,447 km', divisions: 3, stations: 286,
    description: 'Covering the mineral-rich Chhattisgarh and parts of Madhya Pradesh, SECR is an important zone for coal and steel freight. Bilaspur is its vibrant railway hub.',
    image: '/zone_secr.jpg', accent: '#5c4a1a',
  },
  {
    name: 'East Central Railway', abbr: 'ECR', hq: 'Hajipur',
    established: '01 Oct 2002', routeKm: '3,628 km', divisions: 5, stations: 555,
    description: 'Spanning Bihar and Jharkhand, ECR commands the Varanasi-Patna-Hajipur corridor. The Mahatma Gandhi Setu bridge near Hajipur was once the longest river bridge in Asia.',
    image: '/zone_ecr.jpg', accent: '#1a3a6b',
  },
  {
    name: 'Eastern Railway', abbr: 'ER', hq: 'Kolkata',
    established: '14 Apr 1952', routeKm: '2,414 km', divisions: 4, stations: 521,
    description: 'One of India\'s oldest zones, centred on the iconic Howrah and Sealdah stations in Kolkata. ER runs extensive suburban and long-distance services across West Bengal and Bihar.',
    image: '/zone_er.jpg', accent: '#1a3a6b',
  },
  {
    name: 'East Coast Railway', abbr: 'ECoR', hq: 'Bhubaneswar',
    established: '01 Apr 2003', routeKm: '2,572 km', divisions: 3, stations: 313,
    description: 'Covering scenic coastal Odisha and parts of Andhra Pradesh. ECoR manages significant freight including steel and iron ore, and operates through culturally rich temple-town corridors.',
    image: '/zone_ecor.jpg', accent: '#1a5c6b',
  },
  {
    name: 'Western Railway', abbr: 'WR', hq: 'Mumbai',
    established: '05 Nov 1951', routeKm: '6,182 km', divisions: 6, stations: 786,
    description: 'One of the highest revenue-earning zones. WR runs the densest suburban rail network in Mumbai. Its reach spans Gujarat\'s industrial heartland including Ahmedabad, Surat and Vadodara.',
    image: '/zone_wr.jpg', accent: '#1a3a6b',
  },
  {
    name: 'West Central Railway', abbr: 'WCR', hq: 'Jabalpur',
    established: '01 Apr 2003', routeKm: '2,965 km', divisions: 3, stations: 284,
    description: 'Covering Madhya Pradesh, WCR handles the strategic Itarsi-Bhopal corridor - one of the busiest trunk routes in India. Jabalpur sits near the stunning Marble Rocks of Bhedaghat.',
    image: '/zone_wcr.jpg', accent: '#5c4a1a',
  },
  {
    name: 'Konkan Railway', abbr: 'KR', hq: 'Navi Mumbai',
    established: '26 Jan 1998', routeKm: '741 km', divisions: 1, stations: 58,
    description: 'An engineering marvel, threading through 91 tunnels and over 2,000 bridges along the breathtaking Konkan coastline. It connects Mumbai to Mangaluru through Maharashtra, Goa and Karnataka.',
    image: '/zone_kr.jpg', accent: '#1a5c6b',
  },
  {
    name: 'Metro Railway, Kolkata', abbr: 'MR', hq: 'Kolkata',
    established: '24 Oct 1984', routeKm: '60.01 km', divisions: 1, stations: 45,
    description: 'India\'s first metro railway. Operating under the Ministry of Railways, Kolkata Metro continues to expand its underground and elevated network through the cultural capital of India.',
    image: '/zone_mr.jpg', accent: '#1a3a6b',
  },
];

const INFO_ROWS = [
  { icon: <IconBuilding />, label: 'Headquarters', key: 'hq' },
  { icon: <IconCalendar />, label: 'Established', key: 'established' },
  { icon: <IconRoute />,    label: 'Route Length', key: 'routeKm' },
  { icon: <IconGrid />,     label: 'Divisions', key: 'divisions' },
  { icon: <IconStation />,  label: 'Stations', key: 'stations' },
];

//  Component 
export default function RailwayZonesSlider() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = back
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);
  const total = RAILWAY_ZONES.length;

  const changeTo = useCallback((index, direction = 1) => {
    setVisible(false);
    setDir(direction);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
    }, 300);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % total;
        setVisible(false);
        setDir(1);
        setTimeout(() => { setCurrent(next); setVisible(true); }, 300);
        return c; // return same to let timeout do it
      });
    }, 6000);
  }, [total]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const prev = () => {
    const idx = (current - 1 + total) % total;
    changeTo(idx, -1);
    resetTimer();
  };

  const next = () => {
    const idx = (current + 1) % total;
    changeTo(idx, 1);
    resetTimer();
  };

  const goTo = (i) => {
    changeTo(i, i > current ? 1 : -1);
    resetTimer();
  };

  const zone = RAILWAY_ZONES[current];

  return (
    <>
      <style>{`
        .rzs-wrapper { width:100%; background:#f0f4f8; display:flex; justify-content:center; box-sizing:border-box; }
        .rzs-container { width:100%; max-width:1440px; padding:80px 32px; box-sizing:border-box; }

        /* Section title */
        .rzs-title-wrap { text-align:center; margin-bottom:48px; }
        .rzs-title { font-size:2.25rem; font-weight:800; color:var(--primary-color); display:inline-block; position:relative; padding-bottom:14px; margin:0; }
        .rzs-title::after { content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:60px; height:3px; background:var(--accent-color); border-radius:2px; }
        .rzs-subtitle { font-size:1rem; color:var(--text-muted); margin:16px auto 0; line-height:1.6; max-width:580px; }

        /* Slider track */
        .rzs-track { display:flex; align-items:stretch; gap:20px; }

        /* Arrow buttons */
        .rzs-arrow {
          flex-shrink:0; width:52px; height:52px;
          border-radius:14px; border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          background:var(--primary-color); color:#fff;
          box-shadow:0 6px 20px rgba(112,12,40,0.28);
          transition:background 0.2s, box-shadow 0.2s, transform 0.15s;
          align-self:center;
        }
        .rzs-arrow:hover {
          background:#9c1135; color:#fff;
          box-shadow:0 10px 28px rgba(112,12,40,0.38);
          transform:scale(1.08);
        }
        .rzs-arrow:active { transform:scale(0.96); }

        /* Main card */
        .rzs-card {
          flex:1; background:#fff;
          border-radius:20px; overflow:hidden;
          box-shadow:0 8px 48px rgba(0,0,0,0.13);
          border:1px solid #e4e8f0;
          display:flex; min-height:560px;
          transition:opacity 0.3s ease, transform 0.3s ease;
        }
        .rzs-card.hidden { opacity:0; transform:translateY(10px); }
        .rzs-card.visible { opacity:1; transform:translateY(0); }

        /* Image panel */
        .rzs-image-panel {
          flex:0 0 50%; position:relative; overflow:hidden; min-height:500px;
        }
        .rzs-zone-img {
          width:100%; height:100%; object-fit:cover;
          display:block; transition:transform 6s ease;
        }
        .rzs-card.visible .rzs-zone-img { transform:scale(1.04); }
        .rzs-card.hidden .rzs-zone-img { transform:scale(1); }

        /* Gradient overlay on image */
        .rzs-img-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 60%);
        }

        /* Abbr badge */
        .rzs-badge {
          position:absolute; top:18px; left:18px;
          background:rgba(0,0,0,0.6); color:#fff;
          font-weight:900; font-size:0.85rem; letter-spacing:1.5px;
          padding:5px 14px; border-radius:20px;
          backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,0.2);
        }

        /* Info panel */
        .rzs-info-panel {
          flex:1; padding:48px 52px;
          display:flex; flex-direction:column; justify-content:center;
        }
        .rzs-zone-name { font-size:1.95rem; font-weight:800; color:var(--primary-color); margin:0 0 14px; line-height:1.2; }
        .rzs-zone-desc {
          font-size:1rem; color:#64748b; line-height:1.8; margin:0 0 30px;
          display:-webkit-box; -webkit-line-clamp:5; -webkit-box-orient:vertical; overflow:hidden;
        }

        /* Info rows */
        .rzs-info-table { display:flex; flex-direction:column; border-top:1px solid #f0f2f5; }
        .rzs-info-row {
          display:flex; align-items:center; gap:14px;
          padding:13px 0;
          border-bottom:1px solid #f0f2f5;
        }
        .rzs-row-icon { color:#94a3b8; flex-shrink:0; display:flex; align-items:center; }
        .rzs-row-label { font-size:0.85rem; color:#94a3b8; font-weight:600; flex:0 0 140px; }
        .rzs-row-value { font-size:0.95rem; color:#1e293b; font-weight:700; }

        /* Dots */
        .rzs-dots { display:flex; justify-content:center; gap:6px; margin-top:24px; flex-wrap:wrap; }
        .rzs-dot {
          height:8px; border-radius:4px; border:none; cursor:pointer; padding:0;
          transition:all 0.3s ease;
        }
        .rzs-dot.active { width:24px; background:var(--primary-color); }
        .rzs-dot.inactive { width:8px; background:#c8cdd5; }
        .rzs-dot:hover { background:var(--accent-color); }

        /* Responsive */
        @media (max-width:900px) {
          .rzs-card { flex-direction:column; min-height:auto; border-radius:16px; }
          .rzs-image-panel { flex:0 0 240px; min-height:240px; }
          .rzs-info-panel { padding:24px 20px; }
          .rzs-arrow { width:42px; height:42px; border-radius:10px; }
          .rzs-row-label { flex:0 0 110px; }
          .rzs-title { font-size:1.8rem; }
        }

        @media (max-width:600px) {
          .rzs-track { gap:8px; }
          .rzs-arrow { width:34px; height:34px; border-radius:8px; }
          .rzs-image-panel { flex:0 0 180px; min-height:180px; }
          .rzs-info-panel { padding:18px 14px; }
          .rzs-zone-name { font-size:1.2rem; }
          .rzs-zone-desc { font-size:0.85rem; }
          .rzs-row-label { flex:0 0 95px; font-size:0.78rem; }
          .rzs-row-value { font-size:0.85rem; }
          .rzs-title { font-size:1.5rem; }
          .rzs-subtitle { font-size:0.88rem; }
        }
      `}</style>

      <div className="rzs-wrapper">
        <div className="rzs-container">
          {/* Title */}
          <div className="rzs-title-wrap">
            <h3 className="rzs-title">Indian Railway Zones</h3>
            <p className="rzs-subtitle">All 18 zonal railways of Indian Railways — explore their reach, heritage, and network.</p>
          </div>

          {/* Slider */}
          <div className="rzs-track">
            {/* Prev */}
            <button className="rzs-arrow" onClick={prev} aria-label="Previous zone">
              <IconChevronLeft />
            </button>

            {/* Card */}
            <div className={`rzs-card ${visible ? 'visible' : 'hidden'}`}>
              {/* Image Panel */}
              <div className="rzs-image-panel">
                <img src={zone.image} alt={zone.name} className="rzs-zone-img" />
                <div className="rzs-img-overlay" />
                <div className="rzs-badge">{zone.abbr}</div>

              </div>

              {/* Info Panel */}
              <div className="rzs-info-panel">
                <h4 className="rzs-zone-name">{zone.name}</h4>
                <p className="rzs-zone-desc">{zone.description}</p>
                <div className="rzs-info-table">
                  {INFO_ROWS.map((row) => (
                    <div key={row.key} className="rzs-info-row">
                      <span className="rzs-row-icon">{row.icon}</span>
                      <span className="rzs-row-label">{row.label}</span>
                      <span className="rzs-row-value">{zone[row.key]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next */}
            <button className="rzs-arrow" onClick={next} aria-label="Next zone">
              <IconChevronRight />
            </button>
          </div>

          {/* Dots */}
          <div className="rzs-dots">
            {RAILWAY_ZONES.map((_, i) => (
              <button
                key={i}
                className={`rzs-dot ${i === current ? 'active' : 'inactive'}`}
                onClick={() => goTo(i)}
                aria-label={`Zone ${i + 1}: ${RAILWAY_ZONES[i].abbr}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
