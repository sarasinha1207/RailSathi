import React from 'react';
import { TRAIN_CATEGORIES, STATION_CATEGORIES } from '../constants';

export default function Faq() {
  return (
    <main className="main-content w-full">
      <div className="form-card" style={{ marginBottom: '40px' }}>
        <div className="card-header" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '15px', marginBottom: '25px' }}>
          <h2 className="card-title" style={{ fontSize: '1.8rem', color: 'var(--primary-color)' }}>
            Frequently Asked Questions (FAQ)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>
            Common inquiries about RailSathi and passenger support services
          </p>
        </div>

        <div className="faq-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>

          <details className="faq-item">
            <summary className="faq-question">What complaint categories and subcategories are available for Train Complaints?</summary>
            <div className="faq-answer">
              <p>The following table lists all available categories and their respective subcategories for train-related grievances:</p>
              <div className="faq-table-container">
                <table className="faq-table">
                  <thead>
                    <tr>
                      <th>Category ({Object.keys(TRAIN_CATEGORIES).length})</th>
                      <th>Subcategory ({Object.values(TRAIN_CATEGORIES).flat().length})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(TRAIN_CATEGORIES).sort().map((category) => (
                      <tr key={category}>
                        <td style={{ fontWeight: 'bold' }}>{category} ({TRAIN_CATEGORIES[category].length})</td>
                        <td>{TRAIN_CATEGORIES[category].join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">What complaint categories and subcategories are available for Station Complaints?</summary>
            <div className="faq-answer">
              <p>The following table lists all available categories and their respective subcategories for station-related grievances:</p>
              <div className="faq-table-container">
                <table className="faq-table">
                  <thead>
                    <tr>
                      <th>Category ({Object.keys(STATION_CATEGORIES).length})</th>
                      <th>Subcategory ({Object.values(STATION_CATEGORIES).flat().length})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(STATION_CATEGORIES).sort().map((category) => (
                      <tr key={category}>
                        <td style={{ fontWeight: 'bold' }}>{category} ({STATION_CATEGORIES[category].length})</td>
                        <td>{STATION_CATEGORIES[category].join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">What complaints fall under passenger amenities?</summary>
            <div className="faq-answer">
              <p>
                This category includes issues related to seating comfort, lighting, charging facilities,
                announcements, waiting areas, and other passenger services. Describe the problem and provide the
                train or station details. The complaint is assigned to the relevant department. Accurate
                information helps improve passenger convenience.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">How do I report a major operational issue?</summary>
            <div className="faq-answer">
              <p>
                Use the Operational Issues category and provide complete details about the situation. Examples
                include train delays, train halts, cancellations, route disruptions, or operational failures.
                Major operational complaints are monitored closely by railway authorities. Critical incidents
                may be escalated through higher control levels.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">When should I use the Miscellaneous category?</summary>
            <div className="faq-answer">
              <p>
                Use this category when your concern does not clearly fit into any of the listed categories.
                Provide a detailed description so that the system can route it to the appropriate department.
                The complaint will still undergo priority assessment and assignment. Clear explanations help
                avoid delays in processing.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">What should I do if I notice sparks or smoke from an electrical panel?</summary>
            <div className="faq-answer">
              <p>
                Immediately inform onboard railway staff or the nearest railway official and register a complaint
                under Electrical Equipment. Such complaints are treated as critical because they may pose a
                safety risk. The system prioritizes these complaints and routes them to the concerned electrical
                authorities. Passenger safety is given the highest priority.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">How can I request medical assistance on a train?</summary>
            <div className="faq-answer">
              <p>
                Register a complaint under <strong>Medical Assistance</strong> and provide your train and coach
                details. For emergencies, immediately inform the onboard railway staff as well.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">Are special facilities available for senior citizens and differently abled passengers?</summary>
            <div className="faq-answer">
              <p>
                Yes. Railways provide various amenities and support services to ensure a comfortable journey for
                senior citizens and differently abled passengers. Available infrastructure and assistance
                services at many stations include:
              </p>
              <ul>
                <li><strong>Accessible Infrastructure:</strong> Ramps, lifts, and specially designed accessible toilets.</li>
                <li><strong>Mobility Support:</strong> Wheelchairs and dedicated assistance services.</li>
                <li><strong>On-Site Help:</strong> Passengers can contact station staff directly for guidance and support during their journey.</li>
              </ul>
              <p><strong>Note:</strong> Specific facilities and their availability may vary depending on the station location.</p>
            </div>
          </details>
        </div>
      </div>
    </main>
  );
}
