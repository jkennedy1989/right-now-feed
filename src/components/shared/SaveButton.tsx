"use client";

import { Bookmark } from "lucide-react";
import { motion } from "framer-motion";

interface SaveButtonProps {
  saved: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
}

export function SaveButton({ saved, onToggle, size = 20, className = "" }: SaveButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
        saved ? "bg-[#E00707]/90 text-white" : "bg-black/30 text-white hover:bg-black/50"
      } ${className}`}
      aria-label={saved ? "Unsave" : "Save"}
    >
      <Bookmark size={size} fill={saved ? "currentColor" : "none"} strokeWidth={2} />
    </motion.button>
  );
}
