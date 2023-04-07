import { useEffect, useRef } from "react";
import { useStore } from "../../store";
import { ILocation } from "../../types";
import styles from "./map.module.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

let boundsChangedTimeout: NodeJS.Timeout;

interface MapProps {
  center: { lat: number; lng: number };
  locations: ILocation[];
  zoom: number;
}

export function Map({ center, locations, zoom }: MapProps) {
  const [mapBounds, setMapBounds] = useStore((state) => [
    state.mapBounds,
    state.setMapBounds,
  ]);

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapContainer = useRef(null);
  const map = useRef(null);

  // init map
  useEffect(() => {
    // if window object not found component is rendered on server or dom not initialized,
    // so return early
    if (typeof window === "undefined" || mapContainer === null || map.current)
      return;

    // create a map instance
    map.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      center: [center.lng, center.lat],
      container: mapContainer.current,
      logoPosition: "bottom-right",
      style: "mapbox://styles/cloudcomputingjobs/clg6snar7000s01nwccpl0b8y",
      zoom,
    });
  }, []);

  // on interaction
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    // update bounds when map is zoomed, dragged, etc (moved)
    map.current.on("moveend", (e) => {
      clearTimeout(boundsChangedTimeout);
      boundsChangedTimeout = setTimeout(() => {
        const bounds: mapboxgl.LngLatBounds = map.current.getBounds();
        setMapBounds(bounds);
      }, 500);
    });

    locations.map((location) => {
      // marker
      // todo: remove markers off screen
      const marker = new mapboxgl.Marker({
        color: "#0171e3",
      })
        .setLngLat([location.longitude, location.latitude])
        .setPopup(
          new mapboxgl.Popup({
            className: styles.popup,
            closeButton: false,
            offset: [0, -15],
          })
            .setHTML(`<p>${location.company.name}</p>`)
            .setMaxWidth("300px")
        )
        .addTo(map.current);

      return marker;
    });
  });

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100%", borderRadius: "5px" }}
    />
  );
}
