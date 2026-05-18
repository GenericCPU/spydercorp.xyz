type SizedShot = { width: number; height: number };

export type WorkGalleryLayout = 'single' | 'row' | 'grid' | 'stack';

/** Side-by-side for pairs; stack wide/tall sets; grid for 3+ mostly portrait. */
export function getWorkGalleryLayout(shots: readonly SizedShot[]): WorkGalleryLayout {
  const n = shots.length;
  if (n <= 1) return 'single';

  const horizontal = shots.filter((s) => s.width >= s.height).length;

  if (horizontal >= 2) return 'stack';
  if (n > 2) return horizontal >= 1 ? 'stack' : 'grid';
  return 'row';
}
