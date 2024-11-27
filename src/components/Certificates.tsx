
// Import all images
import problemSolvingInt from "../assets/images/problemsolvingint.png";
import jsInt from "../assets/images/jsint.png";
import javaProgramming from "../assets/images/javaprogramming-1.png";
import hpe from "../assets/images/hpe-1.png";
import aws from "../assets/images/aws-1.png";
import highPerformance from "../assets/images/highperformance-1.png";
import laravel from "../assets/images/laravel.jpg";
import softwareEngineer from "../assets/images/softwarengineer.png";
import softwareIntern from "../assets/images/softwareintern.png";
import sqlAdvanced from "../assets/images/sqladvanced.png";

import "../assets/styles/Certificates.scss";

function Certificates() {


    return (
        <div className='certifications-container' id="credentials">
            <h1>Credentials</h1>
            <div className="certifications-grid">
                <div className="certification">
                    <a href="https://www.hackerrank.com/certificates/iframe/ca3642d36a50" target="_blank" rel="noopener noreferrer">
                        <img src={problemSolvingInt} alt="Problem Solving Intermediate" className="zoom" width="100%" />
                        <h2>Problem Solving (Intermediate)</h2>
                    </a>
                    <p>Certified in intermediate-level problem-solving techniques and algorithmic thinking.</p>
                </div>
                <div className="certification">
                    <a href="https://www.hackerrank.com/certificates/iframe/5b009787dcfa" target="_blank" rel="noopener noreferrer">
                        <img src={jsInt} alt="JavaScript Intermediate" className="zoom" width="100%" />
                        <h2>JavaScript Intermediate</h2>
                    </a>
                    <p>Earned recognition for advanced skills in JavaScript programming and development.</p>
                </div>
                <div className="certification">
                    <a href="https://coursera.org/share/1fc210128d5676918bd482a53122a7bd" target="_blank" rel="noopener noreferrer">
                        <img src={javaProgramming} alt="Java Programming" className="zoom" width="100%" />
                        <h2>Java Programming</h2>
                    </a>
                    <p>Completed comprehensive training in Java programming concepts and object-oriented design.</p>
                </div>
                <div className="certification">
                    <a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/fgHAi6dLhpRsGKyyN/da2T3WZCbMAJD7bNB_fgHAi6dLhpRsGKyyN_NgfaRPbKLSfNo9o2M_1732497316680_completion_certificate.pdf" target="_blank" rel="noopener noreferrer">
                        <img src={hpe} alt="HPE Certification" className="zoom" width="100%" />
                        <h2>HPE Cloud Certification</h2>
                    </a>
                    <p>Certified for implementing and managing solutions using HPE cloud services.</p>
                </div>
                <div className="certification">
    <a href="https://courses.edx.org/certificates/2e8e5b744fa5491184a562e0a04c474a" target="_blank" rel="noopener noreferrer">
        <img src={aws} alt="AWS DevOps Certification" className="zoom" width="100%" />
        <h2>AWS DevOps: Code, Build, and Test</h2>
    </a>
    <p>Gained expertise in deploying applications using AWS services such as S3 buckets, Lambda functions, CodePipeline, CodeCommit, and other AWS tools for automation and continuous integration in DevOps workflows.</p>
</div>
                <div className="certification">
                    <a href="https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/0ad1ca28-9d72-4cad-98a0-ac3f77584b77-jos-auyn-bd4c249b-c349-4c49-a655-50299f36b0bc-certificate.pdf" target="_blank" rel="noopener noreferrer">
                        <img src={highPerformance} alt="High Performance Computing" className="zoom" width="100%" />
                        <h2>High-Performance Group Meetings</h2>
                    </a>
                    <p>Learned advanced skills in leveraging high-performance group meetings.</p>
                </div>
                <div className="certification">
                    <a href="https://www.udemy.com/certificate/UC-1cd09935-3472-488a-9922-c147fe4eb2f6/" target="_blank" rel="noopener noreferrer">
                        <img src={laravel} alt="Laravel Certification" className="zoom" width="100%" />
                        <h2>Laravel Developer Certificate</h2>
                    </a>
                    <p>Achieved expertise in Laravel framework for building scalable web applications.</p>
                </div>
                <div className="certification">
                    <a href="https://www.hackerrank.com/certificates/iframe/c6050dc290bd" target="_blank" rel="noopener noreferrer">
                        <img src={softwareEngineer} alt="Software Engineer Certificate" className="zoom" width="100%" />
                        <h2>Software Engineering Certification</h2>
                    </a>
                    <p>Validated knowledge of software engineering principles and design practices.</p>
                </div>
                <div className="certification">
                    <a href="https://www.hackerrank.com/certificates/a3c53744ae7c" target="_blank" rel="noopener noreferrer">
                        <img src={softwareIntern} alt="Software Intern Program" className="zoom" width="100%" />
                        <h2>Software Intern Program</h2>
                    </a>
                    <p>Validated knowledge of software engineering as an intern.</p>
                </div>
                <div className="certification">
                    <a href="https://www.hackerrank.com/certificates/iframe/dd6b1e444ec5" target="_blank" rel="noopener noreferrer">
                        <img src={sqlAdvanced} alt="Advanced SQL Certification" className="zoom" width="100%" />
                        <h2>Advanced SQL Certification</h2>
                    </a>
                    <p>Certified in advanced SQL techniques for database management and optimization.</p>
                </div>
            </div>
        </div>
    );
};

export default Certificates;
