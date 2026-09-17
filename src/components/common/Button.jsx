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

  // If icon is explicitly provided (or null/false), honor it.
  // Otherwise, if children text already has an arrow symbol (→, ←, ↑, ↓, ↗, ↘), do not append duplicate!
  const hasArrowInChildren = typeof children === 'string' && /[→←↑↓↗↘]/.test(children);
  const effectiveIcon = icon !== undefined ? icon : (hasArrowInChildren ? null : '→');

  const content = (
    <>
      <span className="btn-text">{children}</span>
      {effectiveIcon && <span className="btn-icon" aria-hidden="true">{effectiveIcon}</span>}
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
