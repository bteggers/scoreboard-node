import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Spectator = (props) => {
    const [players, setPlayers] = useState([]);
    const specID = props.specID;
    
    useEffect(() => {
        fetchPlayers();
    },[]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            fetchPlayers();
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    
    const fetchPlayers = async () => {
        console.log("Getting Players");
        try {
            const response = await axios.get("/api/game/"+specID+"/playerStates");
            console.log(response);
            setPlayers(response.data.players);
        }
        catch(error) {
            console.log(error);
        }
    };
    
    let scores = [];
    
    for (let i = 0; i < players.length; i++) {
        scores.push(<div class = "score" key = {i}><h3>{players[i].name}</h3><p>{players[i].score}</p></div>)
    }
    return (
        <div class = "main">
            <h2>Current Scores</h2>
            <div class = "ordered">
                {scores}
            </div>
        </div>);
};

export default Spectator;