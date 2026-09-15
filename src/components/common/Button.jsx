import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  to,
  href,
  onClick,
  children,
  variant = 'solid', // 'solid' | 'outline' | 'glass'
  className = '',
  icon = '→',
  target,
  rel,
  type = 'button',
  ariaLabel
}) {
  const baseClass = `btn-master btn-${variant} magnetic ${className}`.trim();

  const content = (
    <>
      <span className="btn-text">{children}</span>
      {icon && <span className="btn-icon" aria-hidden="true">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClass} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={baseClass}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={baseClass} aria-label={ariaLabel} onClick={onClick}>
      {content}
    </button>
  );
}
