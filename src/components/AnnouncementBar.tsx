import { site } from '../site';
import './AnnouncementBar.css';

export function AnnouncementBar() {
  return (
    <div className="announcement" role="status">
      <span className="announcement__callout">
        Systems built in days <span className="text-accent">not weeks</span>
      </span>
      <span className="announcement__sep announcement__sep--cta" aria-hidden>
        ·
      </span>
      <span className="announcement__cta">{site.announcementCta}</span>
      <span className="announcement__sep" aria-hidden>
        ·
      </span>
      <a href={`tel:${site.phoneTel}`} className="announcement__phone">
        {site.phone}
      </a>
    </div>
  );
}
