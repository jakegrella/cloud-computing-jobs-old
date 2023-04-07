import {
  GoogleMap,
  GoogleMapProps,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Card, ListItem } from "../../components";
import { useStore } from "../../store";
import { ILocation } from "../../types";
import styles from "./map.module.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

let boundsChangedTimeout: NodeJS.Timeout;
interface IMapProps extends GoogleMapProps {
  locations?: ILocation[];
  showMarkerInfoOverlay?: boolean;
}

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
}

export function Map({ center, zoom }: MapProps) {
  // this is where the map instance will be stored after initialization
  const [map, setMap] = useState<mapboxgl.Map>();

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/cloudcomputingjobs/clg6snar7000s01nwccpl0b8y",
      center: [center.lng, center.lat],
      zoom,
    });

    // const marker = new mapboxgl.Marker({})
    //   .setLngLat([-74.5, 40])
    //   .addTo(mapboxMap);

    // save the map object to React.useState
    setMap(mapboxMap);

    const popup = new mapboxgl.Popup({
      offset: [0, 0],
      className: styles.popup,
    })
      .setLngLat([-74.5, 40])
      .setHTML("<h1>Hello World!</h1>")
      .setMaxWidth("300px")
      .addTo(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return (
    <div
      ref={mapNode}
      style={{ width: "100%", height: "100%", borderRadius: "5px" }}
    />
  );
}

export function OldMap({
  center,
  zoom,
  locations,
  showMarkerInfoOverlay = false,
}: IMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap, setMapBounds] = useStore((state) => [
    state.map,
    state.setMap,
    state.setMapBounds,
  ]);

  const [activeMarkerLocation, setActiveMarkerLocation] =
    useState<ILocation>(undefined);

  function onBoundsChanged() {
    clearTimeout(boundsChangedTimeout);
    boundsChangedTimeout = setTimeout(() => {
      if (map) {
        setMapBounds(map.getBounds().toJSON());
        setActiveMarkerLocation(undefined);
      }
    }, 500);
  }

  function handleMarkerClick(e) {
    setActiveMarkerLocation(
      locations.find(
        (location) =>
          location.longitude === e.latLng.lng() &&
          location.latitude === e.latLng.lat()
      )
    );
  }

  return (
    <div className={styles.mapContainer}>
      {isLoaded && (
        <GoogleMap
          center={center} // init
          zoom={zoom} // init
          onLoad={(e) => setMap(e)}
          onBoundsChanged={onBoundsChanged}
          onClick={() => setActiveMarkerLocation(undefined)} // acting as onBlur for marker
          clickableIcons={false}
        >
          {showMarkerInfoOverlay && activeMarkerLocation && (
            <div className={styles.activeMarkerPreviewContainer}>
              <Card unpadded>
                <ListItem
                  key={activeMarkerLocation.id}
                  company={activeMarkerLocation.company}
                  job={activeMarkerLocation.jobs}
                  location={activeMarkerLocation}
                />
              </Card>
            </div>
          )}

          {!!locations.length &&
            locations.map((location) => (
              <MarkerF
                key={location.id}
                position={{
                  lat: location.latitude,
                  lng: location.longitude,
                }}
                title={location.id.toString()}
                onClick={showMarkerInfoOverlay && handleMarkerClick}
                clickable={showMarkerInfoOverlay ? true : false}
                icon={{
                  path: "M0 4C-2.25 4-4 2.25-4 0-4-2.25-2.25-4 0-4 2.25-4 4-2.25 4 0 4 2.25 2.25 4 0 4Z",
                  fillColor: location.jobs?.length ? "#0190FF" : "gray",
                  fillOpacity: 1,
                  scale: 1.25,
                  strokeColor: location.jobs?.length ? "#0190FF" : "gray",
                  strokeWeight: 2,
                }}
              />
            ))}
        </GoogleMap>
      )}
    </div>
  );
}
