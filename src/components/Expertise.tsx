import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faDocker, faPython } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const labelsFirst = [
    "React",
    "Flask",
    "React Native",
    "Django",
    "Java Spring Boot",
    "Node.js",
    "Laravel",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "Kotlin",
    "JavaScript",
    "HTML",
    "CSS",
    "TypeScript",
    "Neo4j"
];


const labelsSecond = [
    "Git",
    "GitHub Actions",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Linux",
    "SSL/TLS",
    "Load Balancing"
];

const labelsThird = [
    "OpenAI",
    "Groq",
    "LangChain",
    "Qdrant",
    "Hugging Face",
    "LlamaIndex",
    "Streamlit",
];

const labelsDataScience = [
    "Python",
    "Pandas",
    "Scikit-learn",
    "Matplotlib",
    "Seaborn",
    "Plotly",
    "Dash",
    "NumPy",
    "Pytorch",
    "PowerBi",
    "R"
];


function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">

                            <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Full Stack Web Development</h3>
                    <p>
                        I have built a diverse array of web applications from scratch using modern technologies such as React and Flask. 
                        Additionally, I have experience with a variety of frameworks and tools, including React Native for mobile app development, 
                        Django and Java Spring Boot for robust backend services, and Node.js and Laravel for building scalable and efficient web applications.
                        I am skilled in working with both relational (MySQL, PostgreSQL) and non-relational (MongoDB, Firebase) databases. 
                        My expertise also extends to Kotlin for Android development, and I am adept at managing the SDLC process from start to finish, 
                        ensuring seamless development for both frontend and backend components.
                    </p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
    <FontAwesomeIcon icon={faDocker} size="3x"/>
    <h3>DevOps & Automation</h3>
    <p>
        Once the application is built, I help clients set up DevOps testing, CI/CD pipelines, and deployment automation to ensure successful Go-Live. 
        Additionally, I have experience in designing and deploying network infrastructure, setting up secure web servers, and ensuring high availability.
        I’ve worked with Certbot to automate the provisioning of SSL certificates, ensuring secure communication for deployed applications.
        I also configure and optimize NGINX servers to host web applications, handling reverse proxying, load balancing, and setting up domain names for seamless user access.
    </p>
    <div className="flex-chips">
        <span className="chip-title">Tech stack:</span>
        {labelsSecond.map((label, index) => (
            <Chip key={index} className='chip' label={label} />
        ))}
    </div>
</div>

                <div className="skill">
                <FontAwesomeIcon icon={faPython} size="3x" />
                <h3>GenAI, Machine Learning & Predictive Modeling</h3>
                <p>
                    I specialize in leveraging cutting-edge AI models, machine learning algorithms, and predictive analytics tools 
                    to deliver actionable insights and robust solutions. With hands-on experience in neural networks, 
                    and tools like Prophet and ARIMA, I excel at building models that forecast trends, optimize processes, 
                    and enhance decision-making.
                </p>
                <ul className="highlight-list">
                    <li>Developed neural network models for accurate predictions in real-world scenarios.</li>
                    <li>Implemented ARIMA and Prophet for time-series forecasting with high accuracy.</li>
                    <li>Integrated AI solutions into full-stack applications to ensure seamless deployment.</li>
                </ul>
                <div className="flex-chips">
                    <span className="chip-title">Tech stack:</span>
                    {labelsThird.map((label, index) => (
                        <Chip key={index} className="chip" label={label} />
                    ))}
                </div>
            </div>
            <div className="skill">
    <FontAwesomeIcon icon={faDatabase} size="3x" />
    <h3>Data Science & Data Mining</h3>
    <p>
        I specialize in extracting actionable insights from data using advanced data science and data mining techniques. 
        My projects span diverse areas such as regression analysis, exploratory data analysis (EDA), and dashboard creation 
        for interactive data exploration.
    </p>
    <ul className="highlight-list">
        <li>Developed predictive models using linear and logistic regression.</li>
        <li>Analyzed factors affecting birth rate in Guatemala using statistical modeling.</li>
        <li>Built a dynamic dashboard that processes CSV files, handles data cleaning, performs EDA, 
            and allows users to visualize insights through custom graphs.</li>
    </ul>
    <div className="flex-chips">
        <span className="chip-title">Tech stack:</span>
        {labelsDataScience.map((label, index) => (
            <Chip key={index} className="chip" label={label} />
        ))}
    </div>
</div>

            </div>
        </div>
    </div>
    );
}

export default Expertise;