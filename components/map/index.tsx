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
  cardClassName?: string;
  locations?: ILocation[];
  showMarkerInfoOverlay?: boolean;
}

export function Map({
  center,
  zoom,
  cardClassName,
  // mapContainerClassName,
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

  const [activeMarkerItems, setActiveMarkerItems] = useState([]);

  function onBoundsChanged() {
    clearTimeout(boundsChangedTimeout);
    boundsChangedTimeout = setTimeout(() => {
      if (map) {
        setMapBounds(map.getBounds().toJSON());
      }
    }, 500);
  }

  function handleMarkerClick(e) {
    const itemsAtSelectedMarker = [];

    locations.forEach((location) => {
      if (
        location.longitude === e.latLng.lng() &&
        location.latitude === e.latLng.lat()
      ) {
        itemsAtSelectedMarker.push(...location.jobs);
      }
    });

    setActiveMarkerItems(itemsAtSelectedMarker);
  }

  return (
    <Card unpadded className={cardClassName}>
      {isLoaded && (
        <GoogleMap
          mapContainerClassName={styles.map}
          center={center} // init
          zoom={zoom} // init
          onLoad={(e) => setMap(e)}
          onBoundsChanged={onBoundsChanged}
          onClick={() => setActiveMarkerItems([])} // acting as onBlur for marker
          clickableIcons={false}
        >
          {showMarkerInfoOverlay && activeMarkerItems.length && (
            <div className={styles.activeMarkerPreviewContainer}>
              <Card unpadded>
                {activeMarkerItems.map((job) => (
                  <ListItem key={job.id} job={job} />
                ))}
              </Card>
            </div>
          )}

          {locations.length
            ? locations.map((location) => (
                <MarkerF
                  key={location.id}
                  position={{ lat: location.latitude, lng: location.longitude }}
                  title={location.id.toString()}
                  onClick={
                    showMarkerInfoOverlay ? handleMarkerClick : undefined
                  }
                  clickable={showMarkerInfoOverlay ? true : false}
                />
              ))
            : undefined}
        </GoogleMap>
      )}
    </Card>
  );
}
// end map fns
