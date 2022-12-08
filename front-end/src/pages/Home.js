import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import ScoreboardLogo from '../icons/scoreboard.svg';
import PiggyBank from '../icons/piggy-bank_w.svg';
import Raven from '../icons/raven_w.svg';
import Cards from '../icons/cards_w.svg';
import Enter from '../icons/enter_w.svg';
import Meeple from '../icons/pawns_w.svg';

const Home = (props) => {
    const [input,setInput] = useState("");
    const [roomTextMessage, setRoomTextMessage] = useState("Type Room Code");
    const navigate = useNavigate();
    
    
    
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.get("/api/game/"+input.toLowerCase()+"/playerstates");
            props.setSpecID(input.toLowerCase());
            navigate("/spectator");
        }
        catch (error) {
            setInput("");
            setRoomTextMessage("Invalid Code")
            console.log(error);
        }
    }
    
    const handleChange = (event) => {
        setInput(event.target.value);
     }
    
    return (
        <div className = "main">
            <img src={ScoreboardLogo}  alt="logo"/>
            <h2>Start Game!</h2>
            <div className = "button-range">
                <Link to="/newgame" className="nav-link">
                    <div className = "button">
                        <img src={PiggyBank} alt="Bank"/>
                        <h3>Bank</h3>
                    </div>
                </Link>
            
                <div className = "button">
                    <img src={Raven} alt="Rook"/>
                    <h3>Rook</h3>
                </div>
            
                <div className = "button">
                    <img src={Cards} alt="Cards"/>
                    <h3>Nertz</h3>
                </div>
            
                <div className = "button">
                    <img src={Meeple} alt="Meeple"/>
                    <h3>Other</h3>
                </div>
            </div>
            
            <h2>Join Game!</h2>
            <form onSubmit = {handleSubmit} onChange={handleChange}>
                <input type="text" name="room" value = {input} className = "input-field" placeholder = {roomTextMessage}/>
                <input type="image" src = {Enter} className = "formsubmit" width = "20"/>
            </form>
        </div>
    )
};

export default Home;