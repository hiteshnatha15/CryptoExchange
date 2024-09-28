import React from "react";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import ExchangePage from "./pages/ExchangePage";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exchange" element={<ExchangePage />} />
      </Routes>
      
    </div>
  );
};

export default App;
