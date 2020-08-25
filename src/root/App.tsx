import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RouteView } from "./RouteView";
import { searchContext } from "../contexts/SearchContext/SearchContext";
import { useSearch } from "../hooks/useSearch";
import { Header } from "../components/global/Header/Header";
function App() {
  const searchResults = useSearch();

  return (
    <div>
      <searchContext.Provider value={searchResults}>
        <Router>
          <Header />
          <RouteView />
        </Router>
      </searchContext.Provider>
    </div>
  );
}

export default App;
