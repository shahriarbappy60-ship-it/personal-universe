import React from 'react';

const stages = [
  {
    id: 'before',
    label: 'BEFORE',
    statement: 'I used to move through life without asking much of it.',
    reflection: 'Fear felt like something to escape, and uncertainty felt like something to solve.'
  },
  {
    id: 'shift',
    label: 'THE SHIFT',
    statement: 'Then I started asking different questions.',
    reflection: 'Who am I? Why am I here? What does it mean to experience a world from inside one particular mind?'
  },
  {
    id: 'unfolding',
    label: 'STILL UNFOLDING',
    statement: 'I’m not trying to arrive at a final version of myself.',
    reflection: 'I’m learning, building, questioning, and letting the answer change as I do.'
  }
];

export default function BecomingSection() {
  return (
    <section className="section section-pad becoming-section pt-32 md:pt-36 scroll-mt-28" id="becoming">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">BECOMING</div>
          <h2>
            Still <em>becoming.</em>
          </h2>
        </div>
        <p className="section-intro">
          I don’t see life the way I used to. I’m still figuring out who I am and where I’m going.
        </p>
      </div>

      <div className="becoming-timeline reveal delay-1">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            <article className="becoming-stage">
              <div className="becoming-stage-meta">
                <span className="becoming-stage-kicker">{stage.label}</span>
              </div>
              <h3 className="becoming-stage-statement">{stage.statement}</h3>
              <p className="becoming-stage-reflection">{stage.reflection}</p>
            </article>

            {idx < stages.length - 1 && (
              <div className="becoming-connector" aria-hidden="true">
                <svg
                  className="becoming-arrow-icon"
                  width="12"
                  height="26"
                  viewBox="0 0 12 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="6" y1="0" x2="6" y2="21" stroke="currentColor" strokeWidth="1" />
                  <path
                    d="M2 17.5L6 21.5L10 17.5"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="becoming-closing reveal delay-2">
        <div className="becoming-closing-divider" aria-hidden="true" />
        <p className="becoming-closing-phrase">
          For now, I’m okay with not knowing.
        </p>
      </div>
    </section>
  );
}
