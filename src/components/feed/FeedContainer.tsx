"use client";

import { useState, useEffect } from "react";
import { lists, FeedCategory, CuratedList, Business, singleItems } from "@/data/lists";
import { NeighborhoodModule } from "./NeighborhoodModule";
import { ListCarousel } from "./ListCarousel";
import { SingleCard } from "./SingleCard";
import { SavedListCarousel } from "./SavedListCarousel";
import { SingleItemCard } from "./SingleItemCard";
import { CriticallyAcclaimedModule } from "./CriticallyAcclaimedModule";
import { YAModule } from "./YAModule";
import { ServicesModule } from "./ServicesModule";
import { EventCard, feedEvents } from "./EventCard";
import { DailyPicksOverlay } from "../daily-picks/DailyPicksOverlay";
import { DailyPicksModule } from "../daily-picks/DailyPicksModule";
import { SaveButton } from "../shared/SaveButton";
import { useSavedItems } from "@/hooks/useSavedItems";
import { useAppContext } from "@/providers/AppContextProvider";
import { SUB_FILTER_LIST_MAP } from "@/components/map/MapFilterPills";
import { weeklyPicks } from "@/data/weekly-picks";

const PINNED_IDS = ["check-off-wishlist-new", "latest-from-friends"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FeedContainer() {
  const { activeCategory, activeSubFilter, selectBusinessByName, openWeeklyPicks } = useAppContext();
  const [showOverlay, setShowOverlay] = useState(false);
  const [feedLists, setFeedLists] = useState<CuratedList[]>([]);

  const wishlist = lists.find((l) => l.id === "check-off-wishlist-new");
  const friendsList = lists.find((l) => l.id === "latest-from-friends");

  useEffect(() => {
    const nonPinned = lists.filter((l) => !PINNED_IDS.includes(l.id) && l.moduleType !== "award");
    let filtered: CuratedList[];
    if (activeCategory === "all") {
      filtered = nonPinned;
    } else if (activeCategory === "things-to-do") {
      filtered = nonPinned.filter((l) => l.category === "things-to-do" || l.category === "guides");
    } else {
      filtered = nonPinned.filter((l) => l.category === activeCategory);
    }

    // Apply sub-filter if active
    if (activeSubFilter) {
      const listIds = SUB_FILTER_LIST_MAP[activeCategory]?.[activeSubFilter] || [];
      if (listIds.length > 0) {
        filtered = lists.filter((l) => listIds.includes(l.id));
      }
    }

    setFeedLists(shuffle(filtered));
  }, [activeCategory, activeSubFilter]);

  let singleIndex = 0;

  return (
    <div>
      <div className="pb-20">
        {/* 1. Neighborhood Module */}
        <NeighborhoodModule />

        {/* 2. Previously Saved */}
        {wishlist && (activeCategory === "all" || activeCategory === "restaurants") && (
          <SavedListCarousel list={wishlist} />
        )}

        {/* 3. Top 10 Weekly Picks */}
        {activeCategory !== "events" && activeCategory !== "services" && (
          <DailyPicksModule onOpen={() => openWeeklyPicks()} />
        )}

        {/* 4. Friends carousel */}
        {friendsList && (activeCategory === "all" || activeCategory === "restaurants") && (
          <FriendsCarousel list={friendsList} />
        )}

        {/* 5. Critically Acclaimed */}
        {(activeCategory === "all" || activeCategory === "restaurants") && (
          <CriticallyAcclaimedModule />
        )}

        {/* Services only when Services tab is selected */}
        {activeCategory === "services" && <ServicesModule />}

        {/* Events only when Events tab is selected */}
        {activeCategory === "events" && feedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}

        {/* 5+ Randomized feed (not shown in Services or Events tab) */}
        {activeCategory !== "services" && activeCategory !== "events" && (() => {
          let consecutiveCarousels = 0;
          return feedLists.map((list, i) => {
            const isRanked = list.title.toLowerCase().includes("top");
            const elements = [];

            // Every 2nd module insert a Single item card
            if (i > 0 && i % 2 === 0 && singleIndex < singleItems.length) {
              elements.push(
                <SingleItemCard key={`single-${i}`} item={singleItems[singleIndex++]} />
              );
              consecutiveCarousels = 0;
            }


            // Insert YA Module at slot 6
            if (i === 6) {
              elements.push(<YAModule key="ya-module" />);
              consecutiveCarousels = 0;
            }

            // Insert Services at slot 8 when "All"
            if (i === 7 && activeCategory === "all") {
              elements.push(<ServicesModule key="services-slot" />);
              consecutiveCarousels = 0;
            }

            // Insert event cards at slots 3 and 9
            if (i === 3 && activeCategory === "all") {
              elements.push(<EventCard key="feed-evt-0" event={feedEvents[0]} />);
              consecutiveCarousels = 0;
            }
            if (i === 9 && activeCategory === "all") {
              elements.push(<EventCard key="feed-evt-1" event={feedEvents[1]} />);
              consecutiveCarousels = 0;
            }

            // Force a SingleCard grid if we've had 2 carousels in a row
            if (consecutiveCarousels >= 2 && !isRanked) {
              elements.push(<SingleCard key={list.id} list={list} />);
              consecutiveCarousels = 0;
            } else if (isRanked) {
              elements.push(
                <ListCarousel key={list.id} list={list} ranked={true} />
              );
              consecutiveCarousels++;
            } else {
              elements.push(
                <ListCarousel key={list.id} list={list} />
              );
              consecutiveCarousels++;
            }

            return elements;
          });
        })()}
      </div>
    </div>
  );
}

const friendAvatars: Record<string, string> = {
  "Jamie R.": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "Richard R.": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "Pita S.": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  "Ida I.": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "Spencer R.": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
};

function FriendsCarousel({ list }: { list: CuratedList }) {
  const { isSaved, toggle } = useSavedItems();
  const { selectBusinessByName } = useAppContext();

  return (
    <div className="py-5">
      <div className="px-4 mb-3">
        <h2 className="text-base font-bold text-gray-900">{list.title}</h2>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 pb-2 w-max">
          {list.businesses.map((biz) => {
            const friendName = biz.friendActivity?.split(" ").slice(0, 2).join(" ") || "";
            const avatar = friendAvatars[friendName.trim()] || "";
            return (
              <div key={biz.id} className="w-[240px] flex-shrink-0 cursor-pointer" onClick={() => selectBusinessByName(biz.name)}>
                <div className="relative h-[140px] rounded-[20px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={biz.imageUrl} alt={biz.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <SaveButton saved={isSaved(biz.id)} onToggle={() => toggle(biz.id)} size={14} className="absolute top-2 right-2" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mt-1.5 truncate">{biz.name}</h4>
                {biz.friendActivity && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {avatar && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                    )}
                    <span className="text-xs font-medium text-gray-600 truncate">{biz.friendActivity}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
