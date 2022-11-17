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

          const map = new mapkit.Map("map");
          const mkMapView = document.getElementsByClassName("mk-map-view")[0];
          mkMapView.setAttribute("style", "border-radius:10px");
        }}
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
      />
    </div>
  );
}
