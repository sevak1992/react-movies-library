import React from "react";
import renderer from "react-test-renderer";

import MovieBigImage from "./MovieBigImage";

describe("MovieBigImage component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<MovieBigImage src="testSrc" title="test" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
