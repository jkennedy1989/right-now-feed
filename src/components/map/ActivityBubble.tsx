'use client';

const BUBBLE_ASSETS = ['/added.png', '/bookmarked.png', '/reviewed.png', '/saved.png'];

interface ActivityBubbleProps {
  seed: number;
}

export function ActivityBubble({ seed }: ActivityBubbleProps) {
  const assetIndex = seed % BUBBLE_ASSETS.length;
  const asset = BUBBLE_ASSETS[assetIndex];
  const animDelay = (seed % 5) * 0.4;
  const offsetX = ((seed % 3) - 1) * 8;

  return (
    <div
      className="absolute -top-10 pointer-events-none animate-float"
      style={{
        left: `${offsetX}px`,
        animationDelay: `${animDelay}s`,
      }}
    >
      <img
        src={asset}
        alt=""
        className="w-8 h-auto drop-shadow-md"
      />
    </div>
  );
}
