import React from "react";
import renderer from "react-test-renderer";

import MoviesList from "./MoviesList";

describe("MoviesList component", () => {
  it("renders correctly", () => {
    const movies = [
      {
        id: 1,
        title: "test",
        vote_average: 4,
        release_date: "2020-09-09",
      },
    ];
    const tree = renderer
      .create(<MoviesList movies={movies} loadMore={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
