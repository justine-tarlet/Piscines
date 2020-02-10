import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import "./App.css";
import * as lieux_piscines from "./data/lieux_piscines.json";

function App() {
const [viewport, setViewport] = useState({
  latitude:48.573181,
  longitude: 7.753988,
  width: 'auto',
  height: '100vh',
  zoom: 10
});
 
const [selectedPiscine, setSelectedPiscine] = useState(null);

useEffect(() => {
  const listener = e => {
    if(e.key === "Escape") {
      setSelectedPiscine(null);
    }
  };
  window.addEventListener("keydown", listener);
  return () => {
    window.removeEventListener("keydown", listener);
  };
}, [] );

  return (
    <div>
  <ReactMapGL { ...viewport} 
  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
  mapStyle="mapbox://styles/justinetarlet/ck5wfadx80stf1itb9u6tpgmf" // Enables to style the map
  onViewportChange={viewport => {
    setViewport(viewport);  // Enables to zoom and drag the map
  }}
  >

    { lieux_piscines.features.map(piscine => (
      <Marker key={piscine.properties.point_geo} 
      latitude={piscine.geometry.coordinates[1]}
      longitude={piscine.geometry.coordinates[0]
      }>
       <button className="marker-btn" onClick={e =>{
         e.preventDefault();
         setSelectedPiscine(piscine);
       }}>
         <img src="/pool.svg" alt="piscine-strasbourg" />
       </button>
        </Marker>
    ))}

    {selectedPiscine ? (
      <Popup latitude={selectedPiscine.geometry.coordinates[1]} 
      longitude={selectedPiscine.geometry.coordinates[0]}
      onClose={() => {
        setSelectedPiscine (null);
      }} >
        <div>
          <h2>{selectedPiscine.properties.name}</h2>
          <p>{selectedPiscine.properties.address}
          </p>
          <img className="popup-image" src={selectedPiscine.properties.imageurl} />

        </div>
        
      </Popup>
    ): null }



  </ReactMapGL>
  </div>
  );
}

export default App;
