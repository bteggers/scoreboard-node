import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const NewGame = (props) => {
    
    const [players, setPlayers] = useState([]);
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    
    const handleNewPlayer = (event) => {
        if (input !== "") {
            let currentPlayers = players;
            currentPlayers.push(input);
            setPlayers(currentPlayers);
            setInput("");
            console.log(players);
            event.preventDefault();
        }
    }
    
    const handleChange = (event) => {
        setInput(event.target.value);
     }
     
    const handleGameStart = async (event) => {
        try {
            console.log("Game Start");
            const response = await axios.post("/api/game",{players: players, maxround: 20});
            console.log(response);
            props.setHostID(response.data.hostID);
            props.setSpecID(response.data.specID);
            navigate("/host")
        } catch(error) {
            console.log(error);
        }
        
    }
    
    return (
        <div className = "main">
            {players.map((playerName) => 
                <p>{playerName}</p>
            )}
            <form onSubmit = {handleNewPlayer} onChange={handleChange} id = "nameForm">
                
                <input type="text" name="name" value = {input} className = "input-field" placeholder = "Name"/>
                
                <input type="submit" value="Add" className = "textsubmit"/>
            </form>
            <div>
                <h3 onClick = {handleGameStart} className = "textsubmit">Start Game!</h3>
            </div>
        </div>);
    
};

export default NewGame;