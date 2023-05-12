import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Scoreboard from "./Scoreboard";

describe("Scoreboard", () => {
  test("renders the scoreboard component", () => {
    render(<Scoreboard />);
    const scoreboardElement = screen.getByTestId("scoreboard");
    expect(scoreboardElement).toBeInTheDocument();
  });

  test("adds a new match with correct team names and initial scores", () => {
    render(<Scoreboard />);
    const homeTeamInput = screen.getByTestId("home-team-input");
    const awayTeamInput = screen.getByTestId("away-team-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(homeTeamInput, { target: { value: "Mexico" } });
    fireEvent.change(awayTeamInput, { target: { value: "Canada" } });
    fireEvent.click(addButton);

    const matchElement = screen.getByTestId("match");
    expect(matchElement).toBeInTheDocument();
    expect(matchElement.textContent).toContain("Mexico 0 - Canada 0");
  });

  test("updates the score correctly", () => {
    render(<Scoreboard />);
    const homeTeamInput = screen.getByTestId("home-team-input");
    const awayTeamInput = screen.getByTestId("away-team-input");
    const addButton = screen.getByTestId("add-button");
    const updateButton = screen.getByTestId("update-button");

    fireEvent.change(homeTeamInput, { target: { value: "Mexico" } });
    fireEvent.change(awayTeamInput, { target: { value: "Canada" } });
    fireEvent.click(addButton);

    const homeScoreInput = screen.getByTestId("home-score-input");
    const awayScoreInput = screen.getByTestId("away-score-input");

    fireEvent.change(homeScoreInput, { target: { value: "2" } });
    fireEvent.change(awayScoreInput, { target: { value: "1" } });
    fireEvent.click(updateButton);

    const matchElement = screen.getByTestId("match");
    expect(matchElement.textContent).toContain("Mexico 2 - Canada 1");
  });

  test("finishes the game and removes it from the scoreboard", () => {
    render(<Scoreboard />);
    const homeTeamInput = screen.getByTestId("home-team-input");
    const awayTeamInput = screen.getByTestId("away-team-input");
    const addButton = screen.getByTestId("add-button");
    const finishButton = screen.getByTestId("finish-button");

    fireEvent.change(homeTeamInput, { target: { value: "Mexico" } });
    fireEvent.change(awayTeamInput, { target: { value: "Canada" } });
    fireEvent.click(addButton);

    fireEvent.click(finishButton);

    const matchElement = screen.queryByTestId("match");
    expect(matchElement).not.toBeInTheDocument();
  });

  test("displays the summary of games in progress ordered by total score", () => {
    render(<Scoreboard />);
    const homeTeamInput1 = screen.getByTestId("home-team-input");
    const awayTeamInput1 = screen.getByTestId("away-team-input");
    const addButton1 = screen.getByTestId("add-button");

    fireEvent.change(homeTeamInput1, { target: { value: "Mexico" } });
    fireEvent.change(awayTeamInput1, { target: { value: "Canada" } });
    fireEvent.click(addButton1);

    const homeTeamInput2 = screen.getByTestId("home-team-input");
    const awayTeamInput2 = screen.getByTestId("away-team-input");
    const addButton2 = screen.getByTestId("add-button");

    fireEvent.change(homeTeamInput2, { target: { value: "Spain" } });
    fireEvent.change(awayTeamInput2, { target: { value: "Brazil" } });
    fireEvent.click(addButton2);

    const homeTeamInput3 = screen.getByTestId("home-team-input");
    const awayTeamInput3 = screen.getByTestId("away-team-input");
    const addButton3 = screen.getByTestId("add-button");

    fireEvent.change(homeTeamInput3, { target: { value: "Germany" } });
    fireEvent.change(awayTeamInput3, { target: { value: "France" } });
    fireEvent.click(addButton3);

    const homeTeamInput4 = screen.getByTestId("home-team-input");
    const awayTeamInput4 = screen.getByTestId("away-team-input");
    const addButton4 = screen.getByTestId("add-button");

    fireEvent.change(homeTeamInput4, { target: { value: "Uruguay" } });
    fireEvent.change(awayTeamInput4, { target: { value: "Italy" } });
    fireEvent.click(addButton4);

    const homeTeamInput5 = screen.getByTestId("home-team-input");
    const awayTeamInput5 = screen.getByTestId("away-team-input");
    const addButton5 = screen.getByTestId("add-button");

    fireEvent.change(homeTeamInput5, { target: { value: "Argentina" } });
    fireEvent.change(awayTeamInput5, { target: { value: "Australia" } });
    fireEvent.click(addButton5);

    const summaryElement = screen.getByTestId("summary");
    const summaryItems = summaryElement.querySelectorAll("li");

    expect(summaryItems[0].textContent).toContain("Uruguay 6 - Italy 6");
    expect(summaryItems[1].textContent).toContain("Spain 10 - Brazil 2");
    expect(summaryItems[2].textContent).toContain("Mexico 0 - Canada 0");
    expect(summaryItems[3].textContent).toContain("Argentina 3 - Australia 1");
    expect(summaryItems[4].textContent).toContain("Germany 2 - France 2");
  });
});
