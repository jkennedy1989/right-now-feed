'use client';

import { TORONTO_MODULES, ContentModule } from '@/data/toronto-content';
import { FeedBusinessCard } from './FeedBusinessCard';
import { ChevronRight, Award, Users } from 'lucide-react';

function ModuleHeader({ module }: { module: ContentModule }) {
  const isAward = module.type === 'award-list';
  const isCeleb = module.type === 'celebrity-list';
  const isFriends = module.type === 'friends-activity';
  const isSaved = module.type === 'previously-saved';

  return (
    <div className="mb-2">
      <div className="flex items-center gap-1.5">
        {module.emoji && <span className="text-base">{module.emoji}</span>}
        <h3 className="text-sm font-bold text-gray-900">{module.title}</h3>
        {isAward && <Award size={14} className="text-yellow-600" />}
      </div>
      <div className="flex items-center gap-1.5 mt-0.5">
        {module.description && (
          <p className="text-xs text-gray-500">{module.description}</p>
        )}
      </div>
      {module.author && (
        <div className="flex items-center gap-1 mt-1">
          {(isCeleb || isFriends) && <Users size={10} className="text-gray-400" />}
          <span className="text-[10px] text-gray-400 font-medium">
            {isSaved ? 'Your collection' : `by ${module.author}`}
          </span>
        </div>
      )}
    </div>
  );
}

function SingleCard({ module }: { module: ContentModule }) {
  return (
    <div className="px-4 py-3">
      <ModuleHeader module={module} />
      <div className="space-y-3">
        {module.businesses.map((biz) => (
          <div key={biz.name} className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            {biz.imageUrl && (
              <div className="h-[140px] w-full bg-gray-100">
                <img src={biz.imageUrl} alt={biz.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
            <div className="p-3">
              <p className="text-sm font-bold text-gray-900">{biz.name}</p>
              {biz.rating > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">★ {biz.rating}</p>
              )}
              {biz.description && (
                <p className="text-xs text-gray-600 mt-1">{biz.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CarouselModule({ module }: { module: ContentModule }) {
  const isRanked = module.type === 'ranked-list';
  const isFriends = module.type === 'friends-activity';
  const isSaved = module.type === 'previously-saved';

  return (
    <div className="py-3">
      <div className="px-4">
        <ModuleHeader module={module} />
      </div>
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1 pl-4 pr-2">
        {module.businesses.map((biz, i) => (
          <FeedBusinessCard
            key={`${biz.name}-${i}`}
            business={biz}
            rank={isRanked ? i + 1 : undefined}
            friendActivity={isFriends ? biz.friendActivity : undefined}
          />
        ))}
      </div>
      <div className="px-4 mt-2">
        <button className="flex items-center gap-0.5 text-xs font-medium text-brand-600 hover:text-brand-700">
          <span>See full list</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function Feed() {
  return (
    <div className="bg-gray-50">
      {TORONTO_MODULES.map((module) => {
        if (module.type === 'single') {
          return <SingleCard key={module.id} module={module} />;
        }
        return (
          <div key={module.id} className="border-b border-gray-100 last:border-b-0">
            <CarouselModule module={module} />
          </div>
        );
      })}
    </div>
  );
}
