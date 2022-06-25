import { useState } from "react";
import Home from "./components/Home";
import "./App.css";
import Searchbar from "./components/SearchBar/Searchbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Home />
      <Searchbar />
    </div>
  );
}

export default App;
