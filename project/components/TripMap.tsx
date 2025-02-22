"use client";

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface TripMapProps {
  places: {
    title: string;
    location: { lat: number; lng: number };
  }[];
}

export function TripMap({ places }: TripMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 40.912905, lng: 38.389017 }, // Giresun merkez koordinatları
          zoom: 12,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#e9f5eb" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#b3e6c1" }]
            }
          ]
        });

        // Rotayı çizmek için DirectionsService kullanalım
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map,
          suppressMarkers: true
        });

        // Marker'ları ekleyelim
        places.forEach((place, index) => {
          new google.maps.Marker({
            position: place.location,
            map,
            label: `${index + 1}`,
            title: place.title,
          });
        });

        // Rota için waypoint'leri oluşturalım
        if (places.length > 1) {
          const origin = places[0].location;
          const destination = places[places.length - 1].location;
          const waypoints = places.slice(1, -1).map(place => ({
            location: place.location,
            stopover: true
          }));

          directionsService.route(
            {
              origin,
              destination,
              waypoints,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === "OK" && result) {
                directionsRenderer.setDirections(result);
              }
            }
          );
        }
      }
    });
  }, [places]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg" />;
} 