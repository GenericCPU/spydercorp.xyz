import { useEffect, useId, useMemo } from 'react';
import './SpiderWebBackground.css';

type Node = { x: number; y: number; r?: number };

function buildWeb(
  cx: number,
  cy: number,
  rings: number,
  spokes: number,
  maxR: number,
): { nodes: Node[]; threads: [number, number][] } {
  const nodes: Node[] = [{ x: cx, y: cy, r: 4 }];
  const threads: [number, number][] = [];

  for (let s = 0; s < spokes; s++) {
    const angle = (s / spokes) * Math.PI * 2 - Math.PI / 2;
    const nx = cx + Math.cos(angle) * maxR;
    const ny = cy + Math.sin(angle) * maxR;
    nodes.push({ x: nx, y: ny });
    threads.push([0, nodes.length - 1]);
  }

  for (let ring = 1; ring <= rings; ring++) {
    const radius = (ring / rings) * maxR * 0.92;
    const ringStart = nodes.length;
    for (let s = 0; s < spokes; s++) {
      const angle = (s / spokes) * Math.PI * 2 - Math.PI / 2;
      const wobble = ring % 2 === 0 ? 0.04 : -0.02;
      nodes.push({
        x: cx + Math.cos(angle + wobble) * radius,
        y: cy + Math.sin(angle + wobble) * radius,
        r: ring === rings ? 2 : 1.5,
      });
    }
    for (let s = 0; s < spokes; s++) {
      const a = ringStart + s;
      const b = ringStart + ((s + 1) % spokes);
      threads.push([a, b]);
      const spokeOuter = 1 + s;
      const prevRing = ringStart - spokes + s;
      if (ring === 1) threads.push([spokeOuter, a]);
      else threads.push([prevRing, a]);
    }
  }

  return { nodes, threads };
}

export function SpiderWebBackground() {
  const id = useId().replace(/:/g, '');
  const webs = useMemo(
    () => [
      buildWeb(50, 52, 5, 12, 42),
      buildWeb(88, 18, 4, 10, 28),
      buildWeb(12, 78, 4, 9, 24),
    ],
    [],
  );

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      document.documentElement.style.setProperty('--web-phase', String(frame * 0.008));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="web-bg" aria-hidden>
      <div className="web-bg__glow web-bg__glow--violet" />
      <div className="web-bg__glow web-bg__glow--cyan" />
      <div className="web-bg__noise" />
      <svg className="web-bg__svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${id}-silk`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id={`${id}-fade`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#050506" stopOpacity="0" />
            <stop offset="70%" stopColor="#050506" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#050506" stopOpacity="0.92" />
          </radialGradient>
        </defs>

        {webs.map((web, wi) => (
          <g key={wi} className={`web-cluster web-cluster--${wi}`}>
            {web.threads.map(([a, b], ti) => {
              const n1 = web.nodes[a];
              const n2 = web.nodes[b];
              return (
                <line
                  key={`${wi}-${ti}`}
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  className="web-thread"
                  style={{ animationDelay: `${(ti % 7) * 0.15}s` }}
                />
              );
            })}
            {web.nodes.map((n, ni) => (
              <circle
                key={`${wi}-n-${ni}`}
                cx={n.x}
                cy={n.y}
                r={n.r ?? 1.2}
                className={ni === 0 ? 'web-node web-node--hub' : 'web-node'}
              />
            ))}
          </g>
        ))}

        <rect width="100" height="100" fill={`url(#${id}-fade)`} />
      </svg>
    </div>
  );
}
