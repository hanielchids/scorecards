import React, { useState } from "react";

const Match = ({ match, onUpdateScore, onFinish }) => {
  const [homeScore, setHomeScore] = useState(match.homeScore);
  const [awayScore, setAwayScore] = useState(match.awayScore);

  const handleUpdateScore = () => {
    onUpdateScore(match, homeScore, awayScore);
  };

  return (
    <div data-testid="match">
      <span>
        {match.homeTeam} {homeScore} - {awayScore} {match.awayTeam}
      </span>
      <input
        data-testid="home-score-input"
        type="number"
        value={homeScore}
        onChange={(e) => setHomeScore(parseInt(e.target.value))}
      />
      <input
        data-testid="away-score-input"
        type="number"
        value={awayScore}
        onChange={(e) => setAwayScore(parseInt(e.target.value))}
      />
      <button data-testid="update-button" onClick={handleUpdateScore}>
        Update Score
      </button>
      <button data-testid="finish-button" onClick={() => onFinish(match)}>
        Finish Game
      </button>
    </div>
  );
};

const Scoreboard = () => {
  const [matches, setMatches] = useState([]);

  const startGame = (homeTeam, awayTeam) => {
    const match = {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
    };
    setMatches((prevMatches) => [...prevMatches, match]);
  };

  const updateScore = (matchToUpdate, homeScore, awayScore) => {
    const updatedMatches = matches.map((match) => {
      if (match === matchToUpdate) {
        return { ...match, homeScore, awayScore };
      }
      return match;
    });
    setMatches(updatedMatches);
  };

  const finishGame = (matchToFinish) => {
    const updatedMatches = matches.filter((match) => match !== matchToFinish);
    setMatches(updatedMatches);
  };

  const getSummary = () => {
    const sortedMatches = [...matches].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;
      if (totalScoreA === totalScoreB) {
        return matches.indexOf(b) - matches.indexOf(a);
      }
      return totalScoreB - totalScoreA;
    });
    return sortedMatches;
  };

  const handleAddRecord = (event) => {
    event.preventDefault();
    const homeTeam = event.target.elements.homeTeam.value;
    const awayTeam = event.target.elements.awayTeam.value;
    const match = {
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
    };
    setMatches((prevMatches) => [...prevMatches, match]);
    event.target.reset();
  };

  return (
    <div data-testid="scoreboard">
      <h2>Live Football World Cup Scoreboard</h2>
      <form onSubmit={handleAddRecord}>
        <input type="text" name="homeTeam" placeholder="Home Team" required />
        <input type="text" name="awayTeam" placeholder="Away Team" required />
        <button type="submit">Add Record</button>
      </form>
      {matches.map((match, index) => (
        <Match
          key={index}
          match={match}
          onUpdateScore={updateScore}
          onFinish={finishGame}
        />
      ))}
      <h3>Summary</h3>
      <ol data-testid="summary">
        {getSummary().map((match, index) => (
          <li key={index}>
            {match.homeTeam} {match.homeScore} - {match.awayScore}{" "}
            {match.awayTeam}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Scoreboard;
