import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Spectator = (props) => {
    const [players, setPlayers] = useState([]);
    const [roundScore, setRoundScore] = useState(0);
    let specID = props.specID;
    let navigate = useNavigate();
    
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
            props.setRound(response.data.currentRound);
            if (response.data.currentRound > 20) {
                navigate("/finalresults");
            }
        }
        catch(error) {
            console.log(error);
        }
    };
    
    let scores = [];
    let playerRanks = players;
    playerRanks.sort((a,b) => (a.score < b.score)? 1:-1);
    
    for (let i = 0; i < players.length; i++) {
        scores.push(<div class = "textbox" key = {i}><h3>{playerRanks[i].name}</h3><p>{playerRanks[i].score}</p></div>)
    }
    return (
        <div class = "main">
            
            <h2>Points on board</h2>
            <h1>{roundScore}</h1>
            <h2>Current Scores</h2>
            <h3>Round: {props.currentRound}/20</h3>
            <div class = "ordered">
                {scores}
            </div>
        </div>);
};

export default Spectator;