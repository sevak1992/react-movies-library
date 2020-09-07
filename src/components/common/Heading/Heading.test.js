import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";

import Heading from "./Heading";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Heading component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Heading text="test 1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders with a text prop", () => {
    act(() => {
      render(<Heading text="test 1" />, container);
    });
    expect(container.textContent).toBe("test 1");

    act(() => {
      render(<Heading text="test 2" />, container);
    });
    expect(container.textContent).toBe("test 2");
  });
});
