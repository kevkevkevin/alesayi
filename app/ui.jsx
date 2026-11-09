const arrowPaths = {
  diagonal: "M4 16 16 4M6 4h10v10",
  down: "M10 3v14m-6-6 6 6 6-6",
  up: "M10 17V3m-6 6 6-6 6 6",
};

export function Arrow({ direction = "diagonal" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={arrowPaths[direction]} stroke="currentColor" strokeWidth="1.35" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}

export function TextileImage({ image, className, position, eager = false }) {
  return (
    <img
      src={`/media/${image}.webp`}
      alt=""
      className={className}
      style={{ objectPosition: position }}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
    />
  );
}
