import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Spectator from "./pages/Spectator.js";
import Scoreboard from "./pages/Scoreboard.js";
import Host from "./pages/Host.js";
import NewGame from "./pages/NewGame.js";
import NoPage from "./pages/NoPage.js";

export default function App() {
  
  const [hostID, setHostID] = useState("");
  const [specID, setSpecID] = useState("");
  
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout hostID = {hostID} specID = {specID} setHostID = {setHostID} setSpecID = {setSpecID}/>}>
          <Route index element={<Home setSpecID = {setSpecID}/>} />
          <Route path="NewGame" element={<NewGame setHostID = {setHostID} setSpecID = {setSpecID}/>} />
          <Route path="Host" element={<Host hostID = {hostID}/>} />
          <Route path="Spectator" element={<Spectator specID = {specID}/>} />
          <Route path="Scoreboard" element={<Scoreboard specID = {specID}/>} />
          <Route path="About" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <div className="footer">
      <p>Made by Bryce Eggers, link to <a href="https://github.com/bteggers/scoreboard-node.git">Github</a></p>
    </div>
    </div>
  );
}
