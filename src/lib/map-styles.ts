type MapStyle = {
  elementType?: string;
  featureType?: string;
  stylers: Record<string, string>[];
};

export const DARK_MINIMAL_STYLES: MapStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#1a1a2e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a9a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a2e' }] },

  { featureType: 'poi', stylers: [{ visibility: 'off' }] },

  { featureType: 'transit', stylers: [{ visibility: 'off' }] },

  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2a3e' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'simplified' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3a3a4e' }] },
  { featureType: 'road.local', elementType: 'labels', stylers: [{ visibility: 'off' }] },

  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] },

  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#1e1e30' }] },

  { featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.neighborhood', elementType: 'labels.text.fill', stylers: [{ visibility: 'on' }, { color: '#6a6a7a' }] },
];
