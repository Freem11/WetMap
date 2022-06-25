import { useState } from "react";
import Home from "./components/Home";
import Map from "./components/Map";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Home />
      <Map />
    </div>
  );
}

export default App;
