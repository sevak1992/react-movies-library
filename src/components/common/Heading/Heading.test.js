import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
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

describe("Heading compomnent", () => {
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
