'use client';

import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Business } from '@/types';
import { MarkerPin } from './MarkerPin';
import { getCategoryEmoji } from '@/lib/api-clients/google-places';
import { getFilterColor } from '@/lib/filter-color-map';

interface MapMarkersProps {
  places: Business[];
  activeFilterIds: string[];
  filterCategoryMap: Map<string, string>;
  onMarkerClick: (business: Business) => void;
}

export function MapMarkers({
  places,
  activeFilterIds,
  filterCategoryMap,
  onMarkerClick,
}: MapMarkersProps) {
  const hasActiveFilters = activeFilterIds.length > 0;

  return (
    <>
      {places.map((place) => {
        const matchesFilter = hasActiveFilters
          ? activeFilterIds.some((filterId) => {
              const category = filterCategoryMap.get(filterId);
              if (!category) return false;
              if (category === 'open-now') return place.isOpenNow;
              return (
                place.categories.includes(category) ||
                place.primaryCategory === category
              );
            })
          : true;

        const emoji = getCategoryEmoji(place.primaryCategory);
        const color = getFilterColor(place.primaryCategory).marker;

        return (
          <AdvancedMarker
            key={place.id}
            position={place.location}
            onClick={() => onMarkerClick(place)}
            style={{
              opacity: hasActiveFilters && !matchesFilter ? 0.3 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            <MarkerPin
              emoji={emoji}
              color={color}
              isActive={matchesFilter && hasActiveFilters}
              pulse={false}
            />
          </AdvancedMarker>
        );
      })}
    </>
  );
}
