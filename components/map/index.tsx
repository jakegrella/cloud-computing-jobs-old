import {
  GoogleMap,
  GoogleMapProps,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";
import { Card, ListItem } from "../../components";
import { useStore } from "../../store";
import styles from "./map.module.css";
import { ILocation } from "../../types";

let boundsChangedTimeout: NodeJS.Timeout;
interface IMapProps extends GoogleMapProps {
  locations?: ILocation[];
  showMarkerInfoOverlay?: boolean;
}

export function Map({
  center,
  zoom,
  locations,
  showMarkerInfoOverlay = false,
}: IMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
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
