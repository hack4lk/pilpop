export function AnimateObject(target, bezierPoints) {
  let startTime = null;
  const duration = 200; // Animation duration in milliseconds
  let t = 0;

  function bezier(t, p0, p1, p2, p3) {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    const p = {
      x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
      y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
    };

    return p;
  }

  function animate(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }
    const elapsed = currentTime - startTime;
    t = Math.min(1, elapsed / duration);

    const point = bezier(
      t,
      bezierPoints[0],
      bezierPoints[1],
      bezierPoints[2],
      bezierPoints[3]
    );
    target.style.left = point.x + "px";
    target.style.top = point.y + "px";

    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
