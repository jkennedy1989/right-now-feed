"use client";

interface TagPillsProps {
  tags?: string[];
  className?: string;
  variant?: "light" | "dark";
}

export function TagPills({ tags, className = "", variant = "dark" }: TagPillsProps) {
  if (!tags || tags.length === 0) return null;

  const pillStyle = variant === "dark"
    ? "bg-white/20 text-white/90 backdrop-blur-sm"
    : "bg-gray-100 text-gray-600";

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <span key={tag} className={`${pillStyle} text-[10px] font-medium px-2 py-0.5 rounded-full`}>
          {tag}
        </span>
      ))}
    </div>
  );
}
