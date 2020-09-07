import React from "react";
import renderer from "react-test-renderer";

import LoadingIndicator from "./LoadingIndicator";

describe("LoadingIndicator component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LoadingIndicator />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders correctly with isFullScrean prop", () => {
    const tree = renderer.create(<LoadingIndicator isFullScrean />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
