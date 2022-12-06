import React from 'react';
import ScoreboardLogo from '../icons/scoreboard.svg';

const About = () => {
  return (
        <div className = "main text">
            <img src={ScoreboardLogo}  alt="logo"/>
            <h2>How to play Bank</h2>
            <p>Bank is a fairly simple dice game. Players take turns rolling the dice, and the host records the result of the roll on the scoreboard site. For
            most numbers, the result is simply added to the round total, but if doubles are rolled, the round total is also doubled! Players can choose to "bank"
            at any time in between rolls, adding the round score to their individual score. They are out of the round, though, and can no longer bank points. 
            If a 7 is rolled, however, the round ends, and anyone who failed to bank gets zero points for the round! For the first 3 rolls of the round, doubles are disabled 
            and 7 give 70 points instead of ending the round.</p>
            <h2>What even is this?</h2>
            <p>My family really loves to play games, but there are some games that are fairly tedious to keep score during. (If I had a nickel ever
            time we used a sharpie on a paper plate, I'd be rich) This site is an attempt to digitalize a scoresheet for some of our favorite games:</p>
            <ul>
                <li>Bank</li>
                <li>Rook</li>
                <li>And Nertz</li>
                <li>(I also plan on including a generic score sheet later)</li>
            </ul>
            <p> The general idea is that someone will act as the host, and will start the game and input the scores as they go. Everyone else can 
            access the game with a code generated by the host, and they can log into a view only spectator page so they can see the current scores. Everyone
            will also have access to the scoreboard page, which mimics a traditional pen and paper score sheet.</p>
            <p>Currently, only Bank is designed, so that is the only active link, although the other one's should be fairly similar.</p>
        </div>
    );
};

export default About;