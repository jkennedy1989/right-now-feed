"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { weeklyPicks } from "@/data/weekly-picks";

interface DailyPicksModuleProps {
  onOpen: () => void;
}

export function DailyPicksModule({ onOpen }: DailyPicksModuleProps) {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setTimeout(() => setHasAnimated(false), 2000);
    }
  }, [isInView, hasAnimated]);

  const shouldSplay = (isInView && hasAnimated) || isHovered;

  return (
    <button
      ref={ref}
      onClick={onOpen}
      className="mx-4 my-4 rounded-[20px] p-2.5 bg-gradient-to-br from-[#FFF7E5] to-[#FDD5D5] w-[calc(100%-32px)] text-left overflow-visible relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-[70px] h-[60px] flex-shrink-0 ml-1">
          {weeklyPicks.slice(0, 4).map((biz, i) => {
            const baseRotation = (i - 1.5) * 8;
            const baseOffsetX = (i - 1.5) * 6;
            const animatedRotation = baseRotation + (i - 1.5) * 4;
            const animatedOffsetX = baseOffsetX + (i - 1.5) * 3;
            return (
              <motion.div
                key={biz.id}
                initial={{ rotate: 0, x: 0, opacity: 0.5 }}
                animate={{
                  rotate: shouldSplay ? animatedRotation : baseRotation,
                  x: shouldSplay ? animatedOffsetX : baseOffsetX,
                  opacity: 1,
                }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5, type: "spring", stiffness: 200 }}
                className="absolute top-0 left-1 w-[48px] h-[60px] rounded-lg overflow-hidden shadow-sm border-2 border-white"
                style={{ zIndex: 4 - i }}
              >
                {!imgErrors[i] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={biz.imageUrl}
                    alt={biz.name}
                    className="w-full h-full object-cover"
                    onError={() => setImgErrors((prev) => ({ ...prev, [i]: true }))}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-bold text-gray-900 leading-tight">🌟 See your Top 10 Weekly Picks</h2>
        </div>
      </div>
    </button>
  );
}
