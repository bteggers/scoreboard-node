import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
  //window.sessionStorage.setItem("hostID", hostID);
  //window.sessionStorage.setItem("specID", specID);
  
  useEffect(() => {
    console.log("Preparing to load")
    console.log(sessionStorage.getItem("specID"));
    console.log(sessionStorage.getItem("specID"));
    console.log(sessionStorage.getItem("hostID"));
    if (sessionStorage.getItem("specID") !== "") {
      setSpecID(sessionStorage.getItem("specID"));
      setHostID(sessionStorage.getItem("hostID"));
    }
  }, []);

  useEffect(() => {
      sessionStorage.setItem("hostID", hostID);
      sessionStorage.setItem("specID", specID);
      console.log("Recording info");
      console.log(sessionStorage.getItem("specID"));
      console.log(sessionStorage.getItem("hostID"));
  }, [specID]);
  
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
