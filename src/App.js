import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import "./App.css";
import MemeberConversation from "./components/MemeberConversation";
import { useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/members/:id" element={<MemeberConversation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
