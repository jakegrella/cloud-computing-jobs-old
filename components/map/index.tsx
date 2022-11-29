import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { useStore } from "../../store";
import { useWindowDimensions } from "../../utils/hooks";
import { Card } from "../card";
import { ListItem } from "../list-item";
import styles from "./map.module.css";

let boundsChangedTimeout;

export function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const initMap = useStore((state) => state.initMap);
  const map = useStore((state) => state.map);
  const setMap = useStore((state) => state.setMap);
  const setMapBounds = useStore((state) => state.setMapBounds);
  const mapMarkers = useStore((state) => state.mapMarkers);
  const jobs = useStore((state) => state.jobs);

  const [activeMarker, setActiveMarker] = useState(undefined);

  const { width } = useWindowDimensions();

  function onMapLoad(e) {
    setMap(e);
  }

  function onBoundsChanged() {
    clearTimeout(boundsChangedTimeout);
    boundsChangedTimeout = setTimeout(() => {
      if (map) {
        setMapBounds(map.getBounds().toJSON());
      }
    }, 500);
  }

  function handleMapClick(e) {
    setActiveMarker(undefined);
  }

  function handleMarkerClick(e) {
    const job = jobs.find(
      (job) =>
        job.id.toString() === e.domEvent.srcElement.attributes.title.value
    );
    // set active
    setActiveMarker({ e, job });
  }

  return (
    isLoaded && (
      <GoogleMap
        mapContainerClassName={styles.map}
        center={initMap.center} // init
        zoom={initMap.zoom} // init
        onLoad={onMapLoad}
        onBoundsChanged={onBoundsChanged}
        onClick={handleMapClick}
      >
        {width < 768 && activeMarker && (
          <div className={styles.activeMarkerPreviewContainer}>
            <Card>
              <ListItem job={activeMarker.job} />
            </Card>
          </div>
        )}
        {mapMarkers &&
          mapMarkers.map((m) => {
            if (
              // check type of lat + lng, discrepancy between environments
              typeof m.center.lat === "string" &&
              typeof m.center.lng === "string"
            ) {
              return (
                <Marker
                  key={Math.random()}
                  position={{
                    lat: parseFloat(m.center.lat),
                    lng: parseFloat(m.center.lng),
                  }}
                  onClick={handleMarkerClick}
                  title={m.job.id.toString()}
                />
              );
            }
            return (
              <Marker
                key={Math.random()}
                position={{ lat: m.center.lat, lng: m.center.lng }}
                onClick={handleMarkerClick}
                title={m.job.id.toString()}
              />
            );
          })}
      </GoogleMap>
    )
  );
}
