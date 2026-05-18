import { useEffect, useState } from 'react';

/** Highlights the in-view section for anchor nav (single-page). */
export function useActiveSection(sectionIds: string[], offsetPx = 120) {
  const [activeHref, setActiveHref] = useState('');

  useEffect(() => {
    const resolve = () => {
      let current = '';
      const y = window.scrollY + offsetPx;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = `#${id}`;
      }

      setActiveHref(current);
    };

    resolve();
    window.addEventListener('scroll', resolve, { passive: true });
    window.addEventListener('resize', resolve);
    return () => {
      window.removeEventListener('scroll', resolve);
      window.removeEventListener('resize', resolve);
    };
  }, [sectionIds, offsetPx]);

  return activeHref;
}
