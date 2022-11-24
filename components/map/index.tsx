import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useStore } from "../../store";
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

  return (
    isLoaded && (
      <GoogleMap
        mapContainerClassName={styles.map}
        center={initMap.center} // init
        zoom={initMap.zoom} // init
        onLoad={onMapLoad}
        onBoundsChanged={onBoundsChanged}
      >
        {mapMarkers &&
          mapMarkers.map((m) => {
            console.log("m", m);
            return <Marker key={Math.random()} position={m.center} />;
          })}
      </GoogleMap>
    )
  );
}
