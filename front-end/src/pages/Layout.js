import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import ScoreboardLogoW from '../icons/scoreboard_w.svg';
import axios from 'axios';

const Layout = (props) => {
    let navigate = useNavigate();
    
    const handleExit = async () => {
        if (props.hostID !== "") {
            confirmAlert({
                title: 'Exit Game',
                message: 'Exiting will delete the current game. Are you sure?',
                buttons: [
                {
                    label: 'Cancel',
                    onClick: () => {}
                },
                {
                    label: 'Exit',
                    onClick: async () => {
                        console.log("Deleting...")
                        try {
                            const response = await axios.delete('/api/game/'+props.hostID);
                            console.log(response);
                        }
                        catch (error) {
                            console.log(error);
                        }
                        props.setHostID("");
                        props.setSpecID("");
                        props.setRound(1);
                        navigate("/")
                    }
                }]
                
            });
            
        } else {
            props.setHostID("");
            props.setSpecID("");
            props.setRound(1);
            navigate("/")
        }
    }
    
    let location = useLocation().pathname;
    if (props.currentRound > 20) {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="navbar-brand">
                        <img src={ScoreboardLogoW} alt="Scoreboard Logo" id="corner-logo"/>
                        <h2>{props.specID}</h2>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/scoreboard" className={location==="/scoreboard"?("nav-link active"):("nav-link")}>Scoreboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/finalresults" className={location==="/finalresults"?("nav-link active"):("nav-link")}>Final Results</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick = {handleExit}>Exit Game</a>
                            </li>
                        </ul>
                    </div>
                </nav>     <Outlet />
            </>
        )
    } else {
        if (location === "/host" || location === "/spectator" || location === "/scoreboard") {
            if(props.hostID === "") {
                return (
                    <>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="navbar-brand">
                                <img src={ScoreboardLogoW} alt="Scoreboard Logo" id="corner-logo"/>
                                <h2>{props.specID}</h2>
                            </div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/scoreboard" className={location==="/scoreboard"?("nav-link active"):("nav-link")}>Scoreboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/spectator" className={location==="/spectator"?("nav-link active"):("nav-link")}>Spectator</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick = {handleExit}>Exit Game</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>     <Outlet />
                    </>
                )
            } 
            else {
                return (
                    <>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="navbar-brand">
                                <img src={ScoreboardLogoW} alt="Scoreboard Logo" id="corner-logo"/>
                                <h2>{props.specID}</h2>
                            </div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/scoreboard" className={location==="/scoreboard"?("nav-link active"):("nav-link")}>Scoreboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/host" className={location==="/host"?("nav-link active"):("nav-link")}>Host</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/spectator" className={location==="/spectator"?("nav-link active"):("nav-link")}>Spectator</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick = {handleExit}>Exit Game</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>     <Outlet />
                    </>
                )
            }
        }
        else {
            return (
                <>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="navbar-brand">
                            <img src={ScoreboardLogoW} alt="Scoreboard Logo" id="corner-logo"/>
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/" className={location==="/"?("nav-link active"):("nav-link")}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className={location==="/about"?("nav-link active"):("nav-link")}>About</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>     <Outlet />
                </>
            )
        }
    }
};

export default Layout;