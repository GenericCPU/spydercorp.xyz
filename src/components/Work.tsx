import { site } from '../site';
import { WorkGallery } from './WorkGallery';
import './Work.css';

export function Work() {
  return (
    <section id="work" className="section work">
      <div className="container">
        <header className="section-header">
          <p className="section-label">{site.workSectionLabel}</p>
          <h2 className="section-title">{site.workSectionTitle}</h2>
        </header>

        <WorkGallery />
      </div>
    </section>
  );
}
