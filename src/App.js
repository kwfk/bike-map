import "./App.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lat, setLat] = useState(37.822);
  const [lng, setLng] = useState(-122.264);
  const [zoom, setZoom] = useState(12);

  const bikeProtectionLayers = (protection, color, dotted = false) => {
    return {
      id: `${protection}_bike_lanes`,
      type: "line",
      source: {
        type: "geojson",
        data: `${process.env.PUBLIC_URL}/data/${protection}.json`,
      },
      paint: {
        "line-color": color,
        "line-width": 2,
        "line-dasharray": dotted ? [2, 1] : [],
      },
    };
  };

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/kwfk/clb67mnf1001714qe9cf8owjo",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      map.current.addLayer(bikeProtectionLayers("no_protection", "#949494"));
      map.current.addLayer(bikeProtectionLayers("barely_protected", "#f99500"));
      map.current.addLayer(
        bikeProtectionLayers("partially_protected", "#00bb00", true)
      );
      map.current.addLayer(bikeProtectionLayers("fully_protected", "#00bb00"));
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="App">
      <div className="legend">
        <h4>Protection Level</h4>
        <div>
          <span id="fully-protected"></span>Fully Protected
        </div>
        <div>
          <span id="partially-protected"></span>Partially Protected
        </div>
        <div>
          <span id="barely-protected"></span>Barely Protected
        </div>
        <div>
          <span id="no-protection"></span>No Protection
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
