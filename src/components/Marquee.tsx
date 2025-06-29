import { cn } from "@/lib/utils";
import React from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex w-full overflow-x-hidden p-2 [--gap:1rem] [--duration:40s] [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 animate-marquee items-center justify-start",
          {
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          }
        )}
      >
        <div className="flex items-center gap-[var(--gap)]">{children}</div>
        <div className="flex items-center gap-[var(--gap)] pl-[var(--gap)]" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
