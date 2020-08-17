import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RouteView } from "./RouteView";

function App() {
  return (
    <div>
      <Router>
        <RouteView />
      </Router>
    </div>
  );
}

export default App;
