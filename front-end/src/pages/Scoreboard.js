import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Scoreboard = (props) => {
    const [history, setHistory] = useState([]);
    const [players, setPlayers] = useState([]);
    const specID = props.specID;
    
    useEffect(() => {
        fetchHistory();
    },[]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            fetchHistory();
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    
    const fetchHistory = async () => {
        try {
            const response = await axios.get("/api/game/"+specID+"/scoreHistory");
            console.log(response);
            setPlayers(response.data.players);
            setHistory(response.data.scoreHistory);
        }
        catch(error) {
            console.log(error);
        }
    };

    
    let slot = 0
    
    let table = [];
    let row = [];
    row.push(<th className = "name" key = {slot++}></th>);
    for (var j = 0; j < players.length; j++) {
        row.push(<th className = "name" key = {slot++}>{players[j].name}</th>)
    }
    table.push(<tr key = "0">{row}</tr>);
    
    
    let previousScores = Array(players.length).fill(0);
    for (var i = 0; i < history.length; i++) {
        let scoreChange = [];
        let currentScores = history[i];
        for (var k = 0; k < players.length; k++) {
            scoreChange.push(currentScores[k]-previousScores[k]);
        }
        
        row = [];
        row.push(<th key = {slot++}>{i+1}</th>);
        for (var j = 0; j < players.length; j++) {
            if (scoreChange[j]>0) {
                row.push(<td className = "p" key = {slot++}>{"+"+scoreChange[j]}</td>);
            } else {
                row.push(<td className = "o" key = {slot++}>{scoreChange[j]}</td>);
            }
        }
        table.push(<tr key = {(i+1)+"d"}>{row}</tr>);
        
        row = [];
        row.push(<th key = {slot++}></th>);
        for (var j = 0; j < players.length; j++) {
            row.push(<td key = {slot++}>{currentScores[j]}</td>);
        }
        table.push(<tr key = {i+1}>{row}</tr>);
        previousScores = currentScores;
    }
    
    
    return (
        <div className = "main">
            <table>
                {table}
            </table>
        </div>
    );
};

export default Scoreboard;