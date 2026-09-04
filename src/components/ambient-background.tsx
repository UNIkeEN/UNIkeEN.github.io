import { useEffect, useRef } from "react";

const glowColors = ["purple", "orange", "pink"] as const;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function AmbientBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glows = backgroundRef.current?.children;

    if (!glows) return;

    Array.from(glows).forEach((glow) => {
      if (!(glow instanceof HTMLElement)) return;

      for (const stop of ["start", "middle", "end"]) {
        glow.style.setProperty(
          `--glow-${stop}-x`,
          `${randomBetween(-22, 78).toFixed(2)}vw`
        );
        glow.style.setProperty(
          `--glow-${stop}-y`,
          `${randomBetween(-28, 76).toFixed(2)}vh`
        );
      }

      glow.style.setProperty(
        "--glow-size",
        `${randomBetween(32, 52).toFixed(2)}rem`
      );
      glow.style.setProperty(
        "--glow-duration",
        `${randomBetween(16, 24).toFixed(2)}s`
      );
      glow.style.setProperty(
        "--glow-delay",
        `${randomBetween(-16, -2).toFixed(2)}s`
      );
    });
  }, []);

  return (
    <div ref={backgroundRef} className="ambient-background" aria-hidden="true">
      {glowColors.map((color) => (
        <span
          className={`ambient-background__glow ambient-background__glow--${color}`}
          key={color}
        />
      ))}
    </div>
  );
}
