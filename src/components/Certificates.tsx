
import React, { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';
import {
  problemsolvingint,
  jsint,
  javaprogramming1,
  hpe1,
  aws1,
  highperformance1,
  laravel,
  softwareengineer,
  softwareintern,
  sqladvanced
} from '../assets/images';

import "../assets/styles/Certificates.scss";

function Certificates() {
    const gridRef = useRef<HTMLDivElement>(null);

    const certificates = [
        {
            id: 'problem-solving',
            title: 'Problem Solving (Intermediate)',
            description: 'Certified in intermediate-level problem-solving techniques and algorithmic thinking.',
            image: problemsolvingint,
            link: 'https://www.hackerrank.com/certificates/iframe/ca3642d36a50',
            provider: 'HackerRank',
            category: 'Algorithm'
        },
        {
            id: 'javascript',
            title: 'JavaScript Intermediate',
            description: 'Earned recognition for advanced skills in JavaScript programming and development.',
            image: jsint,
            link: 'https://www.hackerrank.com/certificates/iframe/5b009787dcfa',
            provider: 'HackerRank',
            category: 'Programming'
        },
        {
            id: 'java',
            title: 'Java Programming',
            description: 'Completed comprehensive training in Java programming concepts and object-oriented design.',
            image: javaprogramming1,
            link: 'https://coursera.org/share/1fc210128d5676918bd482a53122a7bd',
            provider: 'Coursera',
            category: 'Programming'
        },
        {
            id: 'hpe',
            title: 'HPE Cloud Certification',
            description: 'Certified for implementing and managing solutions using HPE cloud services.',
            image: hpe1,
            link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/fgHAi6dLhpRsGKyyN/da2T3WZCbMAJD7bNB_fgHAi6dLhpRsGKyyN_NgfaRPbKLSfNo9o2M_1732497316680_completion_certificate.pdf',
            provider: 'HPE',
            category: 'Cloud'
        },
        {
            id: 'aws',
            title: 'AWS DevOps: Code, Build, and Test',
            description: 'Gained expertise in deploying applications using AWS services such as S3 buckets, Lambda functions, CodePipeline, CodeCommit, and other AWS tools for automation and continuous integration in DevOps workflows.',
            image: aws1,
            link: 'https://courses.edx.org/certificates/2e8e5b744fa5491184a562e0a04c474a',
            provider: 'AWS',
            category: 'DevOps'
        },
        {
            id: 'performance',
            title: 'High-Performance Group Meetings',
            description: 'Learned advanced skills in leveraging high-performance group meetings.',
            image: highperformance1,
            link: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/0ad1ca28-9d72-4cad-98a0-ac3f77584b77-jos-auyn-bd4c249b-c349-4c49-a655-50299f36b0bc-certificate.pdf',
            provider: 'Training',
            category: 'Soft Skills'
        },
        {
            id: 'laravel',
            title: 'Laravel Developer Certificate',
            description: 'Achieved expertise in Laravel framework for building scalable web applications.',
            image: laravel,
            link: 'https://www.udemy.com/certificate/UC-1cd09935-3472-488a-9922-c147fe4eb2f6/',
            provider: 'Udemy',
            category: 'Framework'
        },
        {
            id: 'software-engineer',
            title: 'Software Engineering Certification',
            description: 'Validated knowledge of software engineering principles and design practices.',
            image: softwareengineer,
            link: 'https://www.hackerrank.com/certificates/iframe/c6050dc290bd',
            provider: 'HackerRank',
            category: 'Engineering'
        },
        {
            id: 'software-intern',
            title: 'Software Intern Program',
            description: 'Validated knowledge of software engineering as an intern.',
            image: softwareintern,
            link: 'https://www.hackerrank.com/certificates/a3c53744ae7c',
            provider: 'HackerRank',
            category: 'Engineering'
        },
        {
            id: 'sql',
            title: 'Advanced SQL Certification',
            description: 'Certified in advanced SQL techniques for database management and optimization.',
            image: sqladvanced,
            link: 'https://www.hackerrank.com/certificates/iframe/dd6b1e444ec5',
            provider: 'HackerRank',
            category: 'Database'
        }
    ];

    useEffect(() => {
        const grid = gridRef.current!;
        const cards = Array.from(grid.querySelectorAll('.certification'));

        const observer = new IntersectionObserver(
            (entries) => {
                entries
                    .filter((e) => e.isIntersecting)
                    .forEach((entry) => {
                        const el = entry.target as HTMLElement;

                        createTimeline()
                            .add(el, {
                                opacity: [0, 1],
                                translateY: [30, 0],
                                rotateX: [15, 0],
                                easing: 'easeOutExpo',
                                duration: 800,
                            })
                            .then(() => observer.unobserve(el));
                    });
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        );

        cards.forEach((c) => observer.observe(c));
        return () => observer.disconnect();
    }, []);
    return (
        <div className='certifications-container' id="credentials">
            <h1>Credentials</h1>
            <div ref={gridRef} className="certifications-grid">                {certificates.map((cert) => (
                    <div 
                        key={cert.id}
                        className="certification"
                    >
                        <div className="cert-badge">{cert.category}</div>
                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                            <img src={cert.image} alt={cert.title} className="zoom" width="100%" />
                            <h2>{cert.title}</h2>
                        </a>
                        <div className="cert-provider">
                            <span>Issued by {cert.provider}</span>
                        </div>
                        <p>{cert.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Certificates;
