import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import PiggyBank from '../icons/piggy-bank_w.svg';
import Roll from "../components/Roll.js";
import BankScore from "../components/BankScore.js";

const Host = (props) => {
    const [players,setPlayers] = useState([]);
    const [roundScore,setRoundScore] = useState(0);
    const [update,setUpdate] = useState(0);
    const [round, setRound] = useState(0);
    const hostID = props.hostID;
    const [rollNumber, setRollNumber] = useState(1);
    
    useEffect(() => {
        fetchScore();
        fetchPlayers();
    },[]);
    
    useEffect(() => {
        fetchScore();
        fetchPlayers();
    },[update, props.hostID]);
    
    const fetchPlayers = async () => {
        console.log("Getting Players");
        try {
            const response = await axios.get("/api/game/"+hostID+"/playerstates");
            console.log(response);
            setPlayers(response.data.players);
        }
        catch(error) {
            console.log(error);
        }
    };
    
    const fetchScore = async () => {
        console.log("Getting Players");
        try {
            const response = await axios.get("/api/game/"+hostID+"/roundscore");
            console.log(response);
            setRoundScore(response.data.roundScore);
            setRollNumber(response.data.rollCount);
            setRound(response.data.currentRound);
        }
        catch(error) {
            console.log(error);
        }
    };
    
    const rollNum = (num) => {
        if (num === "x2") {
            if (rollNumber <= 3) {
                return;
            }
            setRoundScoreWrapper(roundScore*2);
        }
        else if(num === 7) {
            if (rollNumber <= 3) {
                setRoundScoreWrapper(roundScore + 70);
            }
            else {
                resetRound();
                return;
            }
        }
        else {
            setRoundScoreWrapper(roundScore + num);
        }
        setRollNumberWrapper(rollNumber+1);
    }
    
    const setRoundScoreWrapper = async (newScore) => {
        setRoundScore(newScore);
        try {
            const response = await axios.put("/api/game/"+hostID+"/roundscore/"+newScore);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    
    const setRollNumberWrapper = async (newCount) => {
        setRollNumber(newCount);
        try {
            const response = await axios.put("/api/game/"+hostID+"/rollcount/"+newCount);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    
    const resetRound = async () => {
        setRoundScore(0);
        setRollNumber(1);
        try {
            const response = await axios.put("/api/game/"+hostID+"/resetround");
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
        setUpdate(update+1);
    }
    
    const setPlayerScore = async (playerNum) => {
        try {
            const response = await axios.put('/api/game/'+hostID+'/bank/'+playerNum);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
        setUpdate(update+1);
    }
    
       
    let rollButtons = [];
    for(let i = 2; i <= 12; i++) {
        rollButtons.push(<Roll value = {i} rollNum = {rollNum} />)
    }
    let playerButtons = [];
    for(let i = 0; i < players.length; i++) {
        playerButtons.push(<BankScore player = {i} isIn = {players[i].stillIn} name = {players[i].name} score = {players[i].score} setPlayerScore = {setPlayerScore}/>)
    }
    
    return (<div className = "main split">
            <div className = "side">
                <h2>Current Points</h2>
                <h1>{roundScore}</h1>
                <h2>Roll: {rollNumber}</h2>
                <div className = "button-range">
                    {rollButtons}
                    <Roll value = {"x2"} rollNum = {rollNum} />
                </div>
            </div>
            <div className = "side">
                <h2>Round: {round}</h2>
                <h2>Bank</h2>
                <div className = "button-range ordered">
                    {playerButtons}
                </div>
            </div>
                
            </div>);
};

export default Host;