import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";

import Dashboard from "./pages/Dashboard";
import BullVsBear from "./pages/BullVsBear";
import Stocks from "./pages/Stocks";
import News from "./pages/News";
import About from "./pages/About";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="bull-vs-bear" element={<BullVsBear />} />
          <Route path="stocks" element={<Stocks />} />
          <Route path="news" element={<News />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
