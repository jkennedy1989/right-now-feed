"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isListDetail = pathname.startsWith("/list/");
  const [collapsed, setCollapsed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCollapsed(false);
  }, [pathname]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isListDetail) return;

    const handleScroll = () => {
      setCollapsed(el.scrollTop > 50);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isListDetail]);

  if (isListDetail) {
    return (
      <div ref={scrollRef} className="phone-screen relative w-full h-full bg-white overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="phone-screen relative w-full h-full bg-white overflow-hidden overflow-y-auto">
      <div
        className={`sticky top-0 z-50 transition-all duration-300 overflow-hidden ${
          collapsed ? "max-h-0 opacity-0" : "max-h-14 opacity-100"
        }`}
      >
        <Header />
      </div>
      {children}
    </div>
  );
}
