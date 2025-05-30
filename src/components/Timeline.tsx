import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          ><h3 className="vertical-timeline-element-title">Freelance Full Stack Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Remote</h4>
            <p>Apr. 2024 - Present</p>
            <p>
              <strong>Alina (Legal AI SaaS):</strong> Developed frontend and backend using Vanilla JavaScript and Python (Flask). 
              Integrated with private AI provider's API to automate legal document processing, improving processing speed by 40% 
              and reducing manual review workload by 60%.
            </p>
            <p>
              <strong>Aquacorp (Water Resource Monitoring):</strong> Designed and built a backend system using Express.js with 
              a RESTful API to monitor environmental metrics. Collaborated with internal stakeholders to define scalable endpoints 
              and deploy to cloud infrastructure. Simplified data logging workflows, enabling non-technical users to interact 
              with the system more efficiently.
            </p>
            <p>
              <strong>Educational Game Service:</strong> Created a full-stack system with React Native (frontend), Golang (backend), 
              and MongoDB (database). Implemented authentication and mission tracking for students learning arithmetic and math skills. 
              Increased student engagement by 70% through gamified learning mechanics.
            </p>
            <p>
              <strong>Retail Store CRM/ERP:</strong> Built an integrated CRM and ERP solution using PHP and MySQL tailored to sales, 
              inventory, and client tracking. Reduced time spent on inventory reconciliation by 50% through real-time stock updates 
              and improved conversion rates by 25%.
            </p>          </VerticalTimelineElement>
          
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Full Stack Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Korean-Guatemalan Chamber of Commerce</h4>
            <p>Nov. 2023 - Mar. 2024</p>
            <p>
              Engineered web applications using React, Bootstrap (frontend) and Node.js (backend). Designed MongoDB-powered 
              data systems for business and trade management. Led UI/UX improvements using Figma and developed RESTful APIs 
              to enhance platform interoperability. Achieved a 30% increase in company registrations.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Software Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Granja El Ceibillal</h4>
            <p>Mar. 2023 - Nov. 2023</p>
            <p>
              Built an automated data management system for poultry farm operations using React Native (frontend) and 
              Flask (backend). Implemented AWS-hosted databases and designed microservices architecture to streamline 
              operations. Reduced farm losses by 25% through optimized real-time monitoring and data management systems.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;