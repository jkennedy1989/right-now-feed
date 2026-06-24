"use client";

import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/providers/AppContextProvider";
import { ChevronDown, ChevronUp } from "lucide-react";

function Ticker({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const speed = 0.64; // pixels per frame

    const animate = () => {
      scrollRef.current += speed;
      const halfWidth = container.scrollWidth / 2;
      if (scrollRef.current >= halfWidth) {
        scrollRef.current = 0;
      }
      container.style.transform = `translateX(-${scrollRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="overflow-hidden py-2">
      <div ref={containerRef} className="flex whitespace-nowrap text-[11px] text-gray-400 will-change-transform">
        {items.map((item, i) => (
          <span key={`a-${i}`} className="px-3 flex-shrink-0">{item}</span>
        ))}
        {items.map((item, i) => (
          <span key={`b-${i}`} className="px-3 flex-shrink-0">{item}</span>
        ))}
      </div>
    </div>
  );
}
import { lists } from "@/data/lists";

const mockEvents = [
  { id: "e1", title: "Jazz at the Rex", date: "Tonight · 9 PM", thumb: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200&q=80" },
  { id: "e2", title: "Kensington Night Market", date: "Sat Jun 21 · 6 PM", thumb: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&q=80" },
  { id: "e3", title: "AGO First Thursdays", date: "Thu Jun 26 · 7 PM", thumb: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80" },
  { id: "e4", title: "Distillery Summer Fest", date: "Fri Jun 27 · 5 PM", thumb: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&q=80" },
  { id: "e5", title: "Rooftop Cinema Club", date: "Sat Jun 28 · 8 PM", thumb: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&q=80" },
];

const activityTicker = [
  "⭐ Alex left a review at Bar Raval",
  "🔖 Jamie saved Alo to their list",
  "📍 Priya checked in at Mother's Dumplings",
  "✍️ Marcus reviewed Cry Baby Gallery",
  "💾 Spencer bookmarked Paradise Theatre",
  "📸 Olivia posted a photo at Kensington Market",
  "🎉 Chris just made a reservation at Alo",
  "❤️ Dana loved Burger Drops",
  "🍽️ Taylor booked a table at Edulis",
  "🌟 Sam rated Quetzal 5 stars",
  "📌 Mia pinned Seven Lives Tacos",
  "🔥 Jordan said Bar 404 is trending",
  "💬 Riley commented on Loga's Corner",
  "🎶 Casey checked in at Drake Hotel",
  "👏 Morgan recommended Roselle Desserts",
  "📝 Quinn wrote a tip for Hanmoto",
];

const guideGradients = [
  "linear-gradient(135deg, #F4EEFF, #E8DBFF)",
  "linear-gradient(135deg, #E1F4FE, #C5E8FA)",
  "linear-gradient(135deg, #E1F7DC, #C8EFC0)",
  "linear-gradient(135deg, #FFF4E1, #FFE8C4)",
];

function getTrendingPills(): string[] {
  const bizNames = lists.flatMap((l) => l.businesses.map((b) => b.name));
  const categories = ["Patio Dining", "Natural Wine", "Brunch Spots", "Late Night", "Ramen", "Cocktails", "Dim Sum", "Tacos"];
  const mixed = [...bizNames.sort(() => Math.random() - 0.5).slice(0, 3), ...categories.sort(() => Math.random() - 0.5).slice(0, 2)];
  return mixed;
}

export function NeighborhoodModule() {
  const [expanded, setExpanded] = useState(false);
  const [trending, setTrending] = useState<string[]>([]);
  const guides = lists.filter((l) => l.moduleType === "guide");
  const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6;
  const greeting = isNight ? "Tonight in Toronto" : "Today in Toronto";

  useEffect(() => {
    setTrending(getTrendingPills());
  }, []);

  return (
    <div className="mx-4 my-3 bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{isNight ? "🌝" : "☀️"} {greeting}</h2>
          <span className="text-sm font-medium text-gray-500">22°C</span>
        </div>
      </div>

      {/* Activity ticker — JS-driven seamless scroll */}
      <Ticker items={activityTicker} />

      {/* Local Guides — fit inline */}
      <div className="pt-4 pb-3 px-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Local Guides</p>
        <div className="flex gap-2">
          {guides.map((guide, idx) => {
            const emojiMatch = guide.title.match(/^(\p{Emoji_Presentation}|\p{Emoji}️?)/u);
            const emoji = emojiMatch ? emojiMatch[0] : "📍";
            const titleWithoutEmoji = emojiMatch ? guide.title.slice(emojiMatch[0].length).trim() : guide.title;
            return (
              <div key={guide.id} className="flex-1 min-w-0 cursor-pointer">
                <div className="h-[74px] rounded-xl p-2.5 flex flex-col justify-between" style={{ background: guideGradients[idx % guideGradients.length] }}>
                  <span className="text-base">{emoji}</span>
                  <p className="text-[11px] font-bold text-gray-800 leading-tight line-clamp-2">{titleWithoutEmoji}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="pb-3">
          {/* Trending searches */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2 px-4">Trending searches</p>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pl-4 pb-2 w-max">
              {trending.map((item) => (
                <button key={item} className="flex-shrink-0 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 active:scale-95 rounded-full text-xs font-medium text-gray-700 transition-all flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/></svg>
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Events */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2 px-4">Events nearby</p>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pl-4 pb-1 w-max">
              {mockEvents.map((event) => (
                <div key={event.id} className="flex-shrink-0 w-[120px]">
                  <div className="relative h-[65px] rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={event.thumb} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[11px] font-semibold text-gray-900 mt-1.5 truncate">{event.title}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{event.date}</p>
                </div>
              ))}
              <div className="flex-shrink-0 w-[100px] h-[65px] rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                <span className="text-[10px] font-medium text-gray-500 text-center px-2">See all events →</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expand/collapse arrow at bottom center */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-2 flex justify-center"
      >
        {expanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
      </button>
    </div>
  );
}
