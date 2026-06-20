"use client";

/**
 * Base page surface. The moving gold hue lives in <CursorGlow /> so it can
 * stay static over the hero and follow the cursor past it.
 */
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-surface" />
    </div>
  );
};

export default AnimatedBackground;
