import { render, screen, fireEvent } from '@testing-library/react';
import Scoreboard from './Scoreboard';

describe('Scoreboard', () => {
  test('renders the scoreboard component', () => {
    render(<Scoreboard />);
    const scoreboardElement = screen.getByTestId('scoreboard');
    expect(scoreboardElement).toBeInTheDocument();
  });

  test('starts a new game with correct team names and initial scores', () => {
    render(<Scoreboard />);
    const startButton = screen.getByTestId('start-button');
    fireEvent.click(startButton);
    const matchElement = screen.getByTestId('match');
    expect(matchElement).toBeInTheDocument();
    expect(matchElement.textContent).toContain('Mexico 0 - Canada 0');
  });

  test('updates the score correctly', () => {
    render(<Scoreboard />);
    const startButton = screen.getByTestId('start-button');
    fireEvent.click(startButton);
    const homeScoreInput = screen.getByTestId('home-score-input');
    const awayScoreInput = screen.getByTestId('away-score-input');
    const updateButton = screen.getByTestId('update-button');

    fireEvent.change(homeScoreInput, { target: { value: '2' } });
    fireEvent.change(awayScoreInput, { target: { value: '1' } });
    fireEvent.click(updateButton);

    const matchElement = screen.getByTestId('match');
    expect(matchElement.textContent).toContain('Mexico 2 - Canada 1');
  });

  test('finishes the game and removes it from the scoreboard', () => {
    render(<Scoreboard />);
    const startButton = screen.getByTestId('start-button');
    fireEvent.click(startButton);
    const finishButton = screen.getByTestId('finish-button');
    fireEvent.click(finishButton);
    const matchElement = screen.queryByTestId('match');
    expect(matchElement).not.toBeInTheDocument();
  });

  test('displays the summary of games in progress ordered by total score', () => {
    render(<Scoreboard />);
    const startButton1 = screen.getByTestId('start-button');
    fireEvent.click(startButton1);
    const homeScoreInput1 = screen.getByTestId('home-score-input');
    const awayScoreInput1 = screen.getByTestId('away-score-input');
    const updateButton1 = screen.getByTestId('update-button');

    fireEvent.change(homeScoreInput1, { target: { value: '1' } });
    fireEvent.change(awayScoreInput1, { target: { value: '0' } });
    fireEvent.click(updateButton1);

    const startButton2 = screen.getByTestId('start-button');
    fireEvent.click(startButton2);
    const homeScoreInput2 = screen.getByTestId('home-score-input');
    const awayScoreInput2 = screen.getByTestId('away-score-input');
    const updateButton2 = screen.getByTestId('update-button');

    fireEvent.change(homeScoreInput2, { target: { value: '3' } });
    fireEvent.change(awayScoreInput2, { target: { value: '2' } });
    fireEvent.click(updateButton2);

    const startButton3 = screen.getByTestId('start-button');
    fireEvent.click(startButton3);
    const homeScoreInput3 = screen.getByTestId('home-score-input');
    const awayScoreInput3 = screen.getByTestId('away-score-input');
    const updateButton3 = screen.getByTestId('update-button');

    fireEvent.change(homeScoreInput3, { target: { value: '2' } });
    fireEvent.change(awayScoreInput3, { target: { value: '2' } });
    fireEvent.click(updateButton3);

    const summaryElement = screen.getByTestId('summary');
    const summaryItems = screen.getAllByTestId('summary-item');

    expect(summaryElement).toBeInTheDocument();
    expect(summaryItems).toHaveLength(3);

    // Verify the order of matches in the summary
    expect(summaryItems[0].textContent).toContain('Uruguay 6 - Italy 6');
    expect(summaryItems[1].textContent).toContain('Spain 10 - Brazil 2');
    expect(summaryItems[2].textContent).toContain('Mexico 2 - Canada 2');
  });
});
