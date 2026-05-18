import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { portfolio, type PortfolioProject, type PortfolioShot } from '../data/portfolio';
import { getWorkGalleryLayout } from '../lib/galleryLayout';
import './WorkGallery.css';

function useLightbox(shots: readonly PortfolioShot[]) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const current = index !== null ? shots[index] : null;

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (delta: number) => {
      setIndex((i) => {
        if (i === null || shots.length === 0) return i;
        return (i + delta + shots.length) % shots.length;
      });
    },
    [shots.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, go]);

  return { index, setIndex, open, current, close, go, shots };
}

function shotAspectStyle(shot: PortfolioShot): React.CSSProperties {
  return { '--shot-aspect': shot.width / shot.height } as React.CSSProperties;
}

function ProjectGallery({ project }: { project: PortfolioProject }) {
  const shots = [...project.shots];
  const lightbox = useLightbox(shots);

  if (!shots.length) return null;

  const layout = getWorkGalleryLayout(shots);
  const pairedLayout = layout === 'row' || layout === 'grid';

  return (
    <article className="work-project panel">
      <header className="work-project__header">
        <div>
          <span className="work-project__category">{project.category}</span>
          <h3>{project.title}</h3>
          {project.description ? <p>{project.description}</p> : null}
        </div>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work-project__link"
          >
            Live site
            <ArrowUpRight size={18} aria-hidden />
          </a>
        ) : null}
      </header>

      {project.tags.length > 0 && (
        <ul className="work-project__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      <div className={`work-gallery work-gallery--${layout}`}>
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            className={`work-shot${shot.width >= shot.height ? ' work-shot--landscape' : ' work-shot--portrait'}`}
            style={pairedLayout ? shotAspectStyle(shot) : undefined}
            onClick={() => lightbox.setIndex(i)}
          >
            <span className="work-shot__media">
              <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
            </span>
            <span className="work-shot__caption">{shot.caption}</span>
          </button>
        ))}
      </div>

      <Dialog.Root
        open={lightbox.open}
        lazyMount
        unmountOnExit
        onOpenChange={(d) => {
          if (!d.open) lightbox.close();
        }}
      >
        <Portal>
          <Dialog.Backdrop className="work-lightbox-backdrop" />
          <Dialog.Positioner className="work-lightbox-positioner">
            <Dialog.Content className="work-lightbox">
              <Dialog.Title className="sr-only">
                {lightbox.current?.caption ?? project.title}
              </Dialog.Title>
              <div className="work-lightbox__toolbar">
                <span className="work-lightbox__meta">
                  {project.title} · {lightbox.current?.caption}
                </span>
                <Dialog.CloseTrigger className="work-lightbox__close" aria-label="Close">
                  <X size={22} />
                </Dialog.CloseTrigger>
              </div>
              {lightbox.current && (
                <figure className="work-lightbox__figure">
                  <img src={lightbox.current.src} alt={lightbox.current.alt} />
                </figure>
              )}
              {shots.length > 1 && (
                <div className="work-lightbox__nav">
                  <button
                    type="button"
                    className="work-lightbox__arrow"
                    aria-label="Previous"
                    onClick={() => lightbox.go(-1)}
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <span className="work-lightbox__count">
                    {(lightbox.index ?? 0) + 1} / {shots.length}
                  </span>
                  <button
                    type="button"
                    className="work-lightbox__arrow"
                    aria-label="Next"
                    onClick={() => lightbox.go(1)}
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </article>
  );
}

export function WorkGallery() {
  return (
    <div className="work-gallery-list">
      {portfolio.map((project) => (
        <ProjectGallery key={project.id} project={project} />
      ))}
    </div>
  );
}
