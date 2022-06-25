import { useState } from "react";
import Home from "./components/Home";
import "./App.css";
import Searchbar from "./components/Searchbar";
import MonthSlider from "./components/Slider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Home />
      <MonthSlider />
      <Searchbar />
    </div>
  );
}

export default App;
