"use client";

import { FeedCategory } from "@/data/lists";

interface FilterPillsProps {
  active: FeedCategory;
  onChange: (category: FeedCategory) => void;
}

const filters: { label: string; value: FeedCategory }[] = [
  { label: "All", value: "all" },
  { label: "Restaurants", value: "restaurants" },
  { label: "Things To Do", value: "things-to-do" },
  { label: "Events", value: "events" },
  { label: "Services", value: "services" },
];

export function FilterPills({ active, onChange }: FilterPillsProps) {
  return (
    <div className="px-4 py-2 sticky top-0 z-40 bg-white/90 backdrop-blur-sm">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              active === filter.value
                ? "bg-[#E00707] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
