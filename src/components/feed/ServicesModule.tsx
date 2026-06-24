"use client";

import { serviceItems } from "@/data/lists";

const contractorAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
];

export function ServicesModule() {
  return (
    <div className="py-5">
      <div className="px-4 mb-3">
        <h2 className="text-base font-bold text-gray-900">Top 5 Kitchen Glow ups ✨🔨</h2>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 pb-2 w-max">
          {[...serviceItems].reverse().map((item, i) => (
            <div key={item.id} className="w-[200px] flex-shrink-0">
              <div className="relative h-[200px] rounded-[20px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 w-9 h-9 flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                    <path d="M15.602 1.14242C17.1571 -0.380739 19.6448 -0.38074 21.1999 1.14242L23.1452 3.04779C23.8826 3.77 24.8705 4.17924 25.9026 4.18995L28.6255 4.21821C30.8021 4.2408 32.5611 5.99981 32.5837 8.17648L32.612 10.8993C32.6227 11.9314 33.0319 12.9194 33.7541 13.6567L35.6595 15.6021C37.1827 17.1572 37.1827 19.6448 35.6595 21.1999L33.7542 23.1453C33.0319 23.8826 32.6227 24.8706 32.612 25.9027L32.5837 28.6255C32.5611 30.8022 30.8021 32.5612 28.6255 32.5838L25.9026 32.6121C24.8705 32.6228 23.8826 33.032 23.1452 33.7542L21.1999 35.6596C19.6448 37.1827 17.1571 37.1827 15.602 35.6596L13.6567 33.7542C12.9193 33.032 11.9313 32.6228 10.8993 32.6121L8.17642 32.5838C5.99975 32.5612 4.24074 30.8022 4.21815 28.6255L4.18989 25.9027C4.17918 24.8706 3.76994 23.8826 3.04773 23.1453L1.14236 21.1999C-0.3808 19.6448 -0.3808 17.1572 1.14236 15.6021L3.04773 13.6567C3.76994 12.9194 4.17918 11.9314 4.18989 10.8993L4.21815 8.17648C4.24074 5.99981 5.99975 4.2408 8.17642 4.21821L10.8993 4.18995C11.9313 4.17924 12.9193 3.77 13.6567 3.04779L15.602 1.14242Z" fill="#D71616"/>
                  </svg>
                  <span className="relative text-white font-bold text-[12px]">{serviceItems.length - i}</span>
                </div>
              </div>
              <h4 className="text-xs font-semibold text-gray-900 mt-2 leading-snug">{item.title}</h4>
              <div className="flex items-center gap-1.5 mt-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={contractorAvatars[i % contractorAvatars.length]} alt="" className="w-4 h-4 rounded-full object-cover" />
                <span className="text-[10px] text-gray-500">By {item.contractor}</span>
              </div>
              <button className="mt-2 w-full py-2 rounded-full bg-gray-100 text-gray-700 text-[11px] font-medium hover:bg-gray-200 active:scale-95 transition-all">
                See Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
