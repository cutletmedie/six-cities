import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {TileLayer, Map} from 'leaflet';
import {Location} from '../types/city.ts';

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: Location) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude
        },
        zoom: location.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}
