import React, { useState } from "react";
import { useAsync } from "react-use";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import { getGenres } from "apis/tmdb";
import GenreFilter from "./GenreFilter";
import YearsSlider from "./YearsSlider";

// TODO: move into constants (e.g. constants/config)
const YEARS_NUM = 20;

const YEARS = [new Date().getFullYear()];
for (let i = 0; i < YEARS_NUM; i += 1) {
  YEARS.unshift(YEARS[0] - 1);
}
const FIRST_YEAR = YEARS[0];
const LAST_YEAR = YEARS[YEARS.length - 1];

function FilterBar() {
  const { value: genres, loading } = useAsync(
    async () => (await getGenres())?.data?.genres || []
  );

  // TODO: store filters in global store
  const [checkedGenresList, setCheckedGenresList] = useState([]);
  const [yearsRange, setYearsRange] = useState([FIRST_YEAR, LAST_YEAR]);

  return (
    <Box>
      <Paper elevation={3}>
        {!loading && (
          <GenreFilter
            genres={genres}
            checkedGenres={checkedGenresList}
            onChange={setCheckedGenresList}
          />
        )}
        <YearsSlider
          yearsRange={yearsRange}
          updateRange={setYearsRange}
          firstYear={FIRST_YEAR}
          lastYear={LAST_YEAR}
        />
      </Paper>
    </Box>
  );
}

export default FilterBar;
