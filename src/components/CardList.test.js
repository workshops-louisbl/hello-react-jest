import React from 'react'
import { render } from "@testing-library/react"
import { CardList } from "./CardList"

it("lists cards", () => {
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
  ]

  const utils = render(<CardList cards={cards} />);

  cards.forEach(card => {
    expect(utils.getByText(card.term)).toBeInTheDocument();
  })
})
