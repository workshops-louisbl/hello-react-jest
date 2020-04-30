import React from 'react';
import { CardPreview } from "./CardPreview";
import { render, fireEvent, act } from "@testing-library/react";

import { destroyCard } from "../services/cardService";
jest.mock("../services/cardService.js");

function setup() {
  const term = "This is a test term";
  const definition = "This is the definition of a test term";
  const utils = render(<CardPreview term={term} definition={definition} />);

  return {
    term,
    definition,
    utils
  }
}
it("renders correctly", () => {
  const { utils } = setup();

  const fragment = utils.asFragment();

  expect(fragment).toMatchSnapshot();
});

it("shows term correctly", () => {
  const {term, utils} = setup();

  // assert
  expect(utils.getByText(term)).toBeInTheDocument();
})

it("has a button to show definition", () => {
  const {utils} = setup();

  expect(utils.getByText("show back")).toBeVisible()
})

it("shows definition when it flips the card", () => {
  const {term, definition, utils} = setup();

  const showButton = utils.getByRole("button", {name: "show back"});
  fireEvent.click(showButton);

  expect(utils.getByText(definition)).toBeInTheDocument();
  expect(utils.queryByText(term)).not.toBeInTheDocument();
})

it("flips the card back to the term", () => {
  const {term, definition, utils} = setup();

  const showBackButton = utils.getByRole("button", {name: "show back"});
  fireEvent.click(showBackButton);

  const showFrontButton = utils.getByRole("button", {name: "show front"});
  fireEvent.click(showFrontButton);

  expect(utils.getByText(term)).toBeInTheDocument();
  expect(utils.queryByText(definition)).not.toBeInTheDocument();
})

it("can delete the card", async () => {
  window.confirm = jest.fn(() => {
    return true;
  });
  destroyCard.mockResolvedValue();

  const idProps = "0";
  const onRemoveProps = jest.fn();

  const utils = render(<CardPreview id={idProps} onRemove={onRemoveProps} />);

  const deleteButton = utils.getByRole("button", {name: "delete"});

  await act(async () => {
    fireEvent.click(deleteButton);
  })

  expect(window.confirm).toBeCalled();
  expect(destroyCard).toBeCalled();
  expect(onRemoveProps).toBeCalledWith(idProps);
})

it("can edit the card", () => {
  const {term, definition, utils} = setup();

  const editButton = utils.getByRole("button", {name: "edit"});

  act(() => {
    fireEvent.click(editButton);
  })

  expect(editButton).not.toBeInTheDocument();
})
