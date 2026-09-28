import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  to,
  href,
  onClick,
  children,
  variant = 'solid', // 'solid' | 'outline' | 'glass'
  className = '',
  icon,
  target,
  rel,
  type = 'button',
  ariaLabel,
  disabled = false
}) {
  const baseClass = `btn-master btn-${variant} magnetic ${className}`.trim();

  // Buttons use clean typography only; decorative arrows are intentionally omitted site-wide.
  const cleanChildren = typeof children === 'string'
    ? children.replace(/[\s\u00A0]*[→←↑↓↗↘][\s\u00A0]*$/, '').trim()
    : children;
  const effectiveIcon = null;
  const isDown = false;

  const content = (
    <>
      <span className="btn-text">{cleanChildren}</span>
      {effectiveIcon && (
        <span className={`btn-icon ${isDown ? 'btn-icon-down' : ''}`} aria-hidden="true">
          {effectiveIcon}
        </span>
      )}
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
