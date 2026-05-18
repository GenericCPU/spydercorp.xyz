import './GridMesh.css';

export function GridMesh() {
  return (
    <div className="grid-mesh" aria-hidden>
      <div className="grid-mesh__lines" />
      <div className="grid-mesh__vignette" />
    </div>
  );
}
