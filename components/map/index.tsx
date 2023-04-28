import { useEffect, useRef, useState } from "react";
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

function locationArraysEqual(a: ILocation[], b: ILocation[]) {
  if (!a.length && !b.length) return true; // empty arrays =  no locations
  if (a.length !== b.length) return false;

  // create new arrays of sorted location ids
  const aIds = a.map((i) => i.id).sort();
  const bIds = b.map((i) => i.id).sort();

  // compare values
  return aIds.every((val, idx) => val === bIds[idx]);
}

export function Map({ center, locations, zoom }: MapProps) {
  const [homeMap, setMapBounds] = useStore((state) => [
    state.homeMap,
    state.setMapBounds,
  ]);

  const [storedLocations, setStoredLocations] = useState<ILocation[]>([]);
  const [markers, setMarkers] = useState<
    { id: ILocation["id"]; marker: mapboxgl.Marker }[]
  >([]);

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map>(null);

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

  // update center on search
  useEffect(() => {
    map.current.setCenter({ lng: homeMap.center.lng, lat: homeMap.center.lat });
  }, [homeMap]);

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
  });

  useEffect(() => {
    const locationsChanged = !locationArraysEqual(locations, storedLocations);
    // if mappable locations have changed
    if (locationsChanged) {
      let alreadyMarked = [];
      let toAdd = [];
      let toRemove = [];

      // determine which locations are already marked
      locations.forEach((location) => {
        if (markers.some((marker) => marker.id === location.id)) {
          alreadyMarked.push(location.id);
        }
      });

      // determine which locations are yet to be marked
      locations.forEach((location) => {
        if (!alreadyMarked.some((id) => id === location.id)) {
          toAdd.push(location);
        }
      });

      // determine which marked locations need to be removed
      storedLocations.forEach((location) => {
        if (!alreadyMarked.some((id) => id === location.id)) {
          toRemove.push(location.id);
        }
      });

      if (toRemove.length) {
        toRemove.forEach((id) => {
          const markerToRemove = markers.find((marker) => marker.id === id);
          const markerToRemoveIdx = markers.findIndex(
            (marker) => marker.id === id
          );

          if (markerToRemove) {
            // remove marker from map
            markerToRemove.marker.remove();
          }

          if (markerToRemoveIdx) {
            // remove marker from state
            setMarkers(markers.splice(markerToRemoveIdx, 1));
          }
        });
      }

      const localMarkers = [...alreadyMarked, ...toAdd].map((location) => {
        // create marker
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

        // add id to marker info to allow identification
        return { id: location.id, marker };
      });

      // update markers in state
      setMarkers(localMarkers);
    }

    // set new locations to stored locations
    setStoredLocations(locations);
  }, [locations]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100%", borderRadius: "5px" }}
    />
  );
}
