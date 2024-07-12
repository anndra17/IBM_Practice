// src/App.js
import React from "react";
import Counter from "./components/Counter";
import "./styles/App.css";
import MapBase from "./components/MapBase";

function App() {
  return (
    <div className="App">
      <MapBase />
      <Counter />
    </div>
  );
}

export default App;