/**
 * Subtle ambient 3D floating geometric shapes in the page background
 * to add depth without interfering with content readability.
 */
export function Ambient3DBackground() {
  return (
    <div className="ambient-3d-stage" aria-hidden="true">
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-ring ring-1" />
      <div className="ambient-cube cube-1">
        <span className="cube-face face-front" />
        <span className="cube-face face-back" />
        <span className="cube-face face-right" />
        <span className="cube-face face-left" />
        <span className="cube-face face-top" />
        <span className="cube-face face-bottom" />
      </div>
    </div>
  );
}
