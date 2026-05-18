import { WorkGallery } from './WorkGallery';
import './Work.css';

export function Work() {
  return (
    <section id="work" className="section work">
      <div className="container">
        <p className="section-label">Selected work</p>
        <h2 className="section-title">Built to convert.</h2>
        <p className="section-lead">
          Real client UIs — full frames, nothing cropped. Tap any shot to expand.
        </p>

        <WorkGallery />
      </div>
    </section>
  );
}
