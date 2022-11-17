import Script from "next/script";
import styles from "./map.module.css";

export function Map() {
  return (
    <div id="map" className={styles.map}>
      <Script
        src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"
        strategy="afterInteractive"
        onLoad={() => {
          mapkit.init({
            authorizationCallback: function (done) {
              fetch("http://localhost:3000/api/services/jwt", {
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

          // los angeles region
          const coordinate = new mapkit.Coordinate(34.05334, -118.24235);
          const span = new mapkit.CoordinateSpan(0.16, 0.16);
          const region = new mapkit.CoordinateRegion(coordinate, span);

          // init map
          const map = new mapkit.Map("map");
          console.log("map", map);

          // set region
          map.region = region;

          // add annotation
          const hollywoodSign = new mapkit.Coordinate(34.1340991, -118.321652);
          var hsAnnotation = new mapkit.MarkerAnnotation(hollywoodSign, {
            color: "#8076F0",
            title: "Hollywood Sign",
            glyphText: "●",
          });
          map.showItems([hsAnnotation]);

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
