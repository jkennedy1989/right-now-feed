'use client';

function getRatingColor(rating: number): string {
  if (rating >= 5) return '#FB433C';
  if (rating >= 4) return '#FF643D';
  if (rating >= 3) return '#FF8742';
  if (rating >= 2) return '#FFAD48';
  return '#FFCC4B';
}

interface RatingPillProps {
  rating: number;
  size?: 'sm' | 'md';
}

export function RatingPill({ rating, size = 'sm' }: RatingPillProps) {
  const color = getRatingColor(rating);
  const formatted = rating % 1 === 0 ? `${rating}.0` : rating.toFixed(1);

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded ${
        size === 'sm' ? 'px-1.5 py-0.5' : 'px-2 py-1'
      }`}
      style={{ backgroundColor: color }}
    >
      <img
        src="/ratingstar.svg"
        alt=""
        className={size === 'sm' ? 'w-[9px] h-[9px]' : 'w-[11px] h-[11px]'}
      />
      <span className={`text-white font-semibold ${size === 'sm' ? 'text-[10px]' : 'text-[11px]'}`}>
        {formatted}
      </span>
    </div>
  );
}
