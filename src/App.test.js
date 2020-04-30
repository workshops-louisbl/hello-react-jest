import React from 'react'
import { render, act } from "@testing-library/react"
import App from "./App"
import { getCards } from "./services/cardService";

jest.mock("./services/cardService.js");


it("lists cards from API", async () => {
  const cards = [
    {
      id: 0,
      term: "term 1",
      definition: "definition 1"
    },
    {
      id: 1,
      term: "term 2",
      definition: "definition 2"
    }
  ];
  getCards.mockResolvedValue(cards)

  let utils;
  await act(async () => {
    utils = render(<App />);
  })

  expect(getCards).toBeCalled()

  cards.forEach(card => {
    expect(utils.getByText(card.term)).toBeInTheDocument();
  })
})
