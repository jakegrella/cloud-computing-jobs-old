import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useStore } from "../../store";
import styles from "./map.module.css";

export function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const map = useStore((state) => state.map);
  const setMap = useStore((state) => state.setMap);
  const mapMarkers = useStore((state) => state.mapMarkers);

  function onMapLoad(e) {
    console.log("map loaded");

    setMap({
      center: { lat: e.center.lat(), lng: e.center.lng() },
      zoom: e.zoom,
    });
  }

  return (
    isLoaded && (
      <GoogleMap
        mapContainerClassName={styles.map}
        center={map.center} // init
        zoom={map.zoom} // init
        onLoad={onMapLoad}
        // onUnmount={onUnmount}
        // onCenterChanged={getJobs}
        // onBoundsChanged={getJobs}
        // options={{}}
      >
        {mapMarkers &&
          mapMarkers.map((m) => (
            <Marker key={Math.random()} position={m.center} />
          ))}
      </GoogleMap>
    )
  );
}
