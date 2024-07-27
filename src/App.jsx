// src/App.js
import React from "react";
import PlayerController from "./components/PlayerController";
import "./styles/App.css";
import MapBase from "./components/MapBase";
import StatusDisplay from "./components/StatusDisplay";

function App() {
  return (
    <div className="App">

      <MapBase/>
      <PlayerController />

    </div>
  );
}

export default App;