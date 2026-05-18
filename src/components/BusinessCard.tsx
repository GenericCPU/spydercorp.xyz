import { useCallback, useId, useState } from 'react';
import markSvg from '../assets/spydercorp-mark.svg?raw';
import { site } from '../site';
import './BusinessCard.css';

const markHtml = markSvg
  .replace(/\saria-label="[^"]*"/, ' aria-hidden="true"')
  .replace(/fill="currentColor"/g, 'fill="#0a0a0a"')
  .replace(
    /<svg /,
    '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ',
  );

const SERVICES = [
  'Brand & marketing',
  'Web design & shops',
  'Custom systems & admin',
  'Flexible engagement',
] as const;

export function BusinessCard() {
  const [flipped, setFlipped] = useState(false);
  const hintId = useId();

  const toggle = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  return (
    <div className="biz-card-wrap">
      <button
        type="button"
        className="biz-card"
        onClick={toggle}
        aria-pressed={flipped}
        aria-describedby={hintId}
        aria-label={flipped ? 'Business card, back. Click to show front.' : 'Business card, front. Click to show back.'}
      >
        <div className="biz-card__scene">
          <div className={`biz-card__inner${flipped ? ' biz-card__inner--flipped' : ''}`}>
            <article className="biz-card__face biz-card__face--front" aria-hidden={flipped}>
              <div className="biz-card__accent biz-card__accent--bottom" />
              <div className="biz-card__front-body">
                <div className="biz-card__front-header">
                  <div
                    className="biz-card__mark biz-card__mark--front"
                    dangerouslySetInnerHTML={{ __html: markHtml }}
                  />
                  <div className="biz-card__front-lockup">
                    <p className="biz-card__domain">{site.domain}</p>
                    <p className="biz-card__services-line">Web · Brand · Systems</p>
                  </div>
                </div>
                <p className="biz-card__tagline">{site.tagline}</p>
                <div
                  className="biz-card__mark biz-card__mark--watermark"
                  aria-hidden
                  dangerouslySetInnerHTML={{ __html: markHtml }}
                />
              </div>
            </article>

            <article className="biz-card__face biz-card__face--back" aria-hidden={!flipped}>
              <div className="biz-card__accent biz-card__accent--left" />
              <div className="biz-card__back-body">
                <div className="biz-card__back-col biz-card__back-col--contact">
                  <p className="biz-card__name">Brandon Cryderman</p>
                  <p className="biz-card__services-line">Web · Brand · Systems</p>
                  <a
                    className="biz-card__link biz-card__link--email"
                    href={`mailto:${site.email}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {site.email}
                  </a>
                  <a
                    className="biz-card__link biz-card__link--strong"
                    href={site.url}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {site.domain}
                  </a>
                  <p className="biz-card__location">{site.location}</p>
                </div>

                <div className="biz-card__back-col biz-card__back-col--services">
                  <p className="biz-card__services-heading">Services</p>
                  <ul className="biz-card__services-list">
                    {SERVICES.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="biz-card__footnote">
                    Project · retainer
                    <br />
                    Pro bono opportunities for local small businesses
                  </p>
                </div>
                <div
                  className="biz-card__mark biz-card__mark--watermark"
                  aria-hidden
                  dangerouslySetInnerHTML={{ __html: markHtml }}
                />
              </div>
            </article>
          </div>
        </div>
      </button>
      <p id={hintId} className="biz-card__hint">
        {flipped ? 'Click to show front' : 'Click to flip'}
      </p>
    </div>
  );
}
