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

  // Extract trailing arrow from string children if present, so it is cleanly managed by .btn-icon
  let cleanChildren = children;
  let detectedIcon = null;
  if (typeof children === 'string') {
    const arrowMatch = children.match(/[\s\u00A0]*([→←↑↓↗↘])[\s\u00A0]*$/);
    if (arrowMatch) {
      detectedIcon = arrowMatch[1];
      cleanChildren = children.replace(/[\s\u00A0]*[→←↑↓↗↘][\s\u00A0]*$/, '').trim();
    }
  }

  const effectiveIcon = icon !== undefined ? icon : (detectedIcon || '→');
  const isDown = effectiveIcon === '↓';

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
