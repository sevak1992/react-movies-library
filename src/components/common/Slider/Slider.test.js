import React from "react";
import renderer from "react-test-renderer";

import Slider from "./Slider";

describe("Slider component", () => {
  it("renders correctly with empty items", () => {
    const tree = renderer.create(<Slider items={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
