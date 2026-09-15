import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project, index, className = '' }) {
  const isExternal = project.link && project.link.startsWith('http');
  const isInternal = project.link && !isExternal;

  const cardContent = (
    <>
      <div className="project-card-header">
        <span className="project-index">0{index + 1} / {project.status.toUpperCase()}</span>
        <span className="project-year">{project.year}</span>
      </div>

      <div className="project-card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
      </div>

      <div className="project-card-footer">
        <div className="project-tags">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="project-tag">{tech}</span>
          ))}
        </div>
        <span className="project-arrow" aria-hidden="true">↗</span>
      </div>
    </>
  );

  if (isInternal) {
    return (
      <Link
        to={project.link}
        className={`project-card-item ${className}`.trim()}
        aria-label={`Explore ${project.title}`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <a
      href={project.link || '#'}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`project-card-item ${className}`.trim()}
      aria-label={`Explore ${project.title}`}
    >
      {cardContent}
    </a>
  );
}
