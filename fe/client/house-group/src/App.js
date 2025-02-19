import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HouseList from "./pages/HouseList";
import EditHouse from "./pages/EditHouse";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HouseList />} />
          <Route path="/edit-house/:id" element={<EditHouse />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
