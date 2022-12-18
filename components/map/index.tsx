import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { Card, ListItem } from "../../components";
import { useWindowDimensions } from "../../utils/hooks";
import { useStore } from "../../store";
import styles from "./map.module.css";

let boundsChangedTimeout: NodeJS.Timeout;

export function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const { width } = useWindowDimensions();
  const [homePageView, initMap, map, setMap, setMapBounds, mapMarkers, jobs] =
    useStore((state) => [
      state.homePageView,
      state.initMap,
      state.map,
      state.setMap,
      state.setMapBounds,
      state.mapMarkers,
      state.jobs,
    ]);
  const [activeMarkerJobs, setActiveMarkerJobs] = useState([]);

  function onBoundsChanged() {
    clearTimeout(boundsChangedTimeout);
    boundsChangedTimeout = setTimeout(() => {
      if (map) {
        setMapBounds(map.getBounds().toJSON());
      }
    }, 500);
  }

  function handleMarkerClick(e) {
    const jobsAtSelectedMarker = [];

    jobs.forEach((job) => {
      if (
        job.locations.some(
          (location) =>
            location.longitude === e.latLng.lng() &&
            location.latitude === e.latLng.lat()
        )
      ) {
        jobsAtSelectedMarker.push(job);
      }
    });

    setActiveMarkerJobs(jobsAtSelectedMarker);
  }

  return (
    isLoaded && (
      <GoogleMap
        mapContainerClassName={styles.map}
        center={initMap.center} // init
        zoom={initMap.zoom} // init
        onLoad={(e) => setMap(e)}
        onBoundsChanged={onBoundsChanged}
        onClick={() => setActiveMarkerJobs([])}
      >
        {width < 768 && activeMarkerJobs.length && homePageView === "map" && (
          <div className={styles.activeMarkerPreviewContainer}>
            <Card unpadded>
              {activeMarkerJobs.map((job) => (
                <ListItem key={job.id} job={job} />
              ))}
            </Card>
          </div>
        )}

        {mapMarkers?.map((m) => {
          if (
            // check type of lat + lng, discrepancy between environments
            typeof m.center.lat === "string" &&
            typeof m.center.lng === "string"
          ) {
            return (
              <Marker
                key={m.id}
                position={{
                  lat: parseFloat(m.center.lat),
                  lng: parseFloat(m.center.lng),
                }}
                title={m.job.id.toString()}
                onClick={handleMarkerClick}
              />
            );
          }
          return (
            <Marker
              key={m.id}
              position={{ lat: m.center.lat, lng: m.center.lng }}
              title={m.job.id.toString()}
              onClick={handleMarkerClick}
            />
          );
        })}
      </GoogleMap>
    )
  );
}
