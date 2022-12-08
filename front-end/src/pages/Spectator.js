import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Spectator = (props) => {
    const [players, setPlayers] = useState([]);
    const [roundScore, setRoundScore] = useState(0);
    let specID = props.specID;
    
    useEffect(() => {
        fetchPlayers();
        fetchScore();
    },[props.specID]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            fetchPlayers();
            fetchScore();
        }, 3000);
        return () => clearInterval(interval);
    }, [specID]);
    
    
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
    
    const fetchScore = async () => {
        console.log("Getting Scores");
        try {
            const response = await axios.get("/api/game/"+specID+"/roundScore");
            console.log(response);
            setRoundScore(response.data.roundScore);
        }
        catch(error) {
            console.log(error);
        }
    };
    
    let scores = [];
    
    for (let i = 0; i < players.length; i++) {
        scores.push(<div class = "textbox" key = {i}><h3>{players[i].name}</h3><p>{players[i].score}</p></div>)
    }
    return (
        <div class = "main">
            <h2>Points on board</h2>
            <h1>{roundScore}</h1>
            <h2>Current Scores</h2>
            <div class = "ordered">
                {scores}
            </div>
        </div>);
};

export default Spectator;