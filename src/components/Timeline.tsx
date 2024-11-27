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
          >
            <h3 className="vertical-timeline-element-title">Full Stack Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Guatemala</h4>
            <p>dic. 2023 - mar. 2024</p>
            <p>
            Developed and maintained web applications using both backend and frontend technologies. I implemented and optimized databases, and collaborated on digital platform development projects aimed at improving business and commerce management. I worked as part of an international team of professionals. A key achievement was improving the number of companies approaching the Chamber to register, which contributed to an increase in membership growth.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
          
            <h3 className="vertical-timeline-element-title">Fullstack Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Guatemala</h4>
          
            <p>
            Designed and developed an application for the operational and data management of an avian farm. Implemented an API for efficient data management using React Native (frontend) and Flask (backend). Configured the database hosted on an AWS server. Participated in all stages of the project, including design, development, quality assurance (QA) testing, and deployment. A notable achievement was the significant reduction in economic losses due to optimized data management.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;