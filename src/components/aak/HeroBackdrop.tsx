import Iridescence from "@/components/aak/Iridescence";
import type { CSSProperties, ReactNode } from "react";

type HeroBackdropProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/**
 * Hero wrapper with a CSS gradient fallback and optional WebGL iridescence overlay.
 * Content stays readable even when WebGL is unavailable.
 */
export function HeroBackdrop({ children, className = "", innerClassName = "" }: HeroBackdropProps) {
  const iridescenceStyle: CSSProperties = {
    filter: "saturate(1.1) brightness(0.92)",
  };

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2c090d] via-[#4a1015] to-[#22070b] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-65">
        <Iridescence
          color={[0.62, 0.16, 0.16]}
          mouseReact={false}
          amplitude={0.08}
          speed={0.2}
          className="h-full w-full"
          style={iridescenceStyle}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2c090d]/70 via-[#4a1015]/50 to-[#22070b]/60" />
      <div className={`relative z-10 ${innerClassName}`}>{children}</div>
    </section>
  );
}
