import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RoutesApps from "./config/routes/Routes";
import { BrowserRouter as Router } from "react-router-dom"; // Correctly use BrowserRouter

function App() {
  return (
    <Router>
      <RoutesApps />
    </Router>
  );
}

export default App;
