import Script from "next/script";
import styles from "./map.module.css";

export function Map({ mapInfo = undefined }) {
  return (
    <div id="map" className={styles.map}>
      <Script
        src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"
        strategy="afterInteractive" // default
        onReady={() => {
          // TODO: check if already initialized
          mapkit.init({
            authorizationCallback: function (done) {
              fetch("/api/services/jwt", {
                method: "get",
                headers: new Headers({
                  Authorization: "Bearer " + process.env.API_SECRET_KEY,
                }),
              })
                .then((response) => response.json())
                .then((result) => {
                  done(result.token);
                });
            },
          });

          // init map
          const map = new mapkit.Map("map");

          if (mapInfo) {
            // add annotation
            const x = new mapkit.Coordinate(
              mapInfo.latitude,
              mapInfo.longitude
            );
            var xAnnotation = new mapkit.MarkerAnnotation(x, {
              color: "#8076F0",
              title: mapInfo.company,
              glyphText: "●",
            });
            map.showItems([xAnnotation]);
          } else {
            // los angeles region
            const coordinate = new mapkit.Coordinate(34.05334, -118.24235);
            const span = new mapkit.CoordinateSpan(0.16, 0.16);
            const region = new mapkit.CoordinateRegion(coordinate, span);

            // set region
            map.region = region;
          }

          const mkMapView = document.getElementsByClassName("mk-map-view")[0];
          mkMapView.setAttribute("style", "border-radius:10px");

          map.addEventListener("region-change-end", (e) => {
            console.log("region change end", e);
          });
        }}
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
      />
    </div>
  );
}
