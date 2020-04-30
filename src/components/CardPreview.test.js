import React from 'react';
import { CardPreview } from "./CardPreview";
import { render, fireEvent } from "@testing-library/react";

it("shows term correctly", () => {
  // arrange
  const term = "This a test term";

  // act
  const utils = render(<CardPreview term={term} />);

  // assert
  expect(utils.getByText(term)).toBeInTheDocument();
})

it("has a button to show definition", () => {
  const utils = render(<CardPreview />);

  expect(utils.getByText("show back")).toBeVisible()
})

it("shows definition when it flips the card", () => {
  const term = "This is a test term";
  const definition = "This is the definition of a test term";

  const utils = render(<CardPreview term={term} definition={definition} />);

  const showButton = utils.getByRole("button", {name: "show back"});
  fireEvent.click(showButton);

  expect(utils.getByText(definition)).toBeInTheDocument();
  expect(utils.queryByText(term)).not.toBeInTheDocument();
})
