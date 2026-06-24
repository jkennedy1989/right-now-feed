'use client';

import { TORONTO_MODULES, ContentModule } from '@/data/toronto-content';
import { useAppContext } from '@/providers/AppContextProvider';
import { FeedBusinessCard } from './FeedBusinessCard';
import { ChevronRight } from 'lucide-react';

const ACTIVITY_ITEMS = [
  '⭐ Jamie R. left a 5-star review at Quetzal',
  '🔖 Sam bookmarked Bar Raval',
  '📍 Richard checked in at Alo',
  '⭐ Brittney B. rated Prime Seafood Palace 4 stars',
  '🔖 Catherine B. saved Moore Park Ravine',
  '📍 Jamie R. checked in at Seven Lives',
  '⭐ Brian S. left a review at Dear Grain',
  '🔖 Terrene H. bookmarked Juicy Dumpling',
  '📍 Sam checked in at Bar 404',
  '⭐ Richard R. rated Sushi Masaki Saito 5 stars',
];

function ActivityStream() {
  return (
    <div className="px-5 py-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">🌝 Tonight in Toronto</h2>
        <span className="text-sm text-gray-400">22°C</span>
      </div>
      <div className="space-y-1.5">
        {ACTIVITY_ITEMS.map((item, i) => (
          <p key={i} className="text-sm text-gray-700 leading-relaxed">{item}</p>
        ))}
      </div>
    </div>
  );
}

function ImageGrid({ module }: { module: ContentModule }) {
  const { selectBusinessByName } = useAppContext();
  const items = module.businesses.slice(0, 4);

  return (
    <div className="px-5 py-6">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {module.emoji} {module.title}
        </h2>
        {module.description && (
          <p className="text-sm text-gray-500 mt-0.5">{module.description}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((biz) => (
          <button
            key={biz.name}
            onClick={() => selectBusinessByName(biz.name)}
            className="aspect-square rounded-xl overflow-hidden bg-gray-100"
          >
            {biz.imageUrl && (
              biz.imageUrl.includes('.mp4') || biz.imageUrl.includes('stream.mux.com') ? (
                <video src={biz.imageUrl} className="w-full h-full object-cover" muted autoPlay loop playsInline />
              ) : (
                <img src={biz.imageUrl} alt={biz.name} className="w-full h-full object-cover" loading="lazy" />
              )
            )}
          </button>
        ))}
      </div>
      <button className="flex items-center gap-0.5 text-sm font-medium text-[#0099cc] hover:text-[#007aa3] mt-3">
        <span>See full list</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function ModuleHeader({ module }: { module: ContentModule }) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-semibold text-gray-900">
        {module.emoji} {module.title}
      </h2>
      {module.description && (
        <p className="text-sm text-gray-500 mt-0.5">{module.description}</p>
      )}
      {module.author && (
        <span className="text-xs text-gray-400 mt-1 block">
          by {module.author}
        </span>
      )}
    </div>
  );
}

function SingleCard({ module }: { module: ContentModule }) {
  const { selectBusinessByName } = useAppContext();

  return (
    <div className="px-5 py-6">
      <ModuleHeader module={module} />
      <div className="space-y-4">
        {module.businesses.map((biz) => (
          <button
            key={biz.name}
            onClick={() => selectBusinessByName(biz.name)}
            className="w-full rounded-xl overflow-hidden bg-white border border-gray-100 shadow-md text-left"
          >
            {biz.imageUrl && (
              <div className="h-[180px] w-full bg-gray-100">
                {biz.imageUrl.includes('.mp4') || biz.imageUrl.includes('stream.mux.com') ? (
                  <video src={biz.imageUrl} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                ) : (
                  <img src={biz.imageUrl} alt={biz.name} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
            )}
            <div className="p-4">
              <p className="text-base font-bold text-gray-900">{biz.name}</p>
              {biz.rating > 0 && (
                <p className="text-sm text-gray-500 mt-0.5">★ {biz.rating}</p>
              )}
              {biz.description && (
                <p className="text-sm text-gray-600 mt-1.5">{biz.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CarouselModule({ module }: { module: ContentModule }) {
  const isRanked = module.type === 'ranked-list';
  const isFriends = module.type === 'friends-activity';
  const { selectBusinessByName } = useAppContext();

  return (
    <div className="py-6">
      <div className="px-5">
        <ModuleHeader module={module} />
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 pl-5 pr-3">
        {module.businesses.map((biz, i) => (
          <FeedBusinessCard
            key={`${biz.name}-${i}`}
            business={biz}
            rank={isRanked ? i + 1 : undefined}
            friendActivity={isFriends ? biz.friendActivity : undefined}
            onTap={() => selectBusinessByName(biz.name)}
          />
        ))}
      </div>
      <div className="px-5 mt-3">
        <button className="flex items-center gap-0.5 text-sm font-medium text-[#0099cc] hover:text-[#007aa3]">
          <span>See full list</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export function Feed() {
  const GRID_MODULE_ID = 'module-14'; // Previously Saved

  return (
    <div className="bg-white">
      <ActivityStream />

      {TORONTO_MODULES.map((module) => {
        if (module.id === GRID_MODULE_ID) {
          return <ImageGrid key={module.id} module={module} />;
        }
        if (module.type === 'single') {
          return <SingleCard key={module.id} module={module} />;
        }
        return (
          <div key={module.id} className="border-t border-gray-100">
            <CarouselModule module={module} />
          </div>
        );
      })}
    </div>
  );
}
