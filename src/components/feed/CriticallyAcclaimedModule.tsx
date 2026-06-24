"use client";

// Link removed — no route pages
import { ChevronRight } from "lucide-react";
import { lists } from "@/data/lists";

export function CriticallyAcclaimedModule() {
  const awardLists = lists.filter((l) => l.moduleType === "award");

  if (awardLists.length === 0) return null;

  return (
    <div className="py-6" style={{ background: "linear-gradient(to bottom, #FFF7E5, #fafafa)" }}>
      <div className="px-4 mb-3">
        <h2 className="text-base font-bold text-gray-900">🏆 Critically Acclaimed</h2>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="flex -space-x-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon_michelinguide.png" alt="Michelin" className="w-5 h-5 rounded-full border-2 border-white z-10 object-cover" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon_yelp.png" alt="Yelp" className="w-5 h-5 rounded-full border-2 border-white object-cover" />
          </div>
          <p className="text-[11px] text-gray-500">By <span className="font-bold text-gray-700 underline">Michelin Guide</span> and <span className="font-bold text-gray-700 underline">Yelp</span></p>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 w-max">
          {awardLists.map((list) => (
            <div key={list.id} className="w-[200px] flex-shrink-0 bg-white rounded-[16px] border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-bold text-gray-900">{list.title.replace(/^[^\w\s]\s?/u, '').replace(/^(\p{Emoji_Presentation}|\p{Emoji}️?)\s?/u, '')}</h3>
              {list.description && <p className="text-xs text-gray-500 mt-0.5 mb-3">{list.description}</p>}
              <div className="space-y-2">
                {list.businesses.slice(0, 3).map((biz, i) => (
                  <div key={biz.id} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={biz.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs font-medium text-gray-800 truncate">{biz.name}</p>
                  </div>
                ))}
              </div>
              <div
                className="block text-center text-[11px] font-semibold text-amber-800 mt-3 py-1.5 rounded-full bg-[#FFF0CC] hover:bg-[#FFE8AA] transition-colors cursor-pointer"
              >
                See full list →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
