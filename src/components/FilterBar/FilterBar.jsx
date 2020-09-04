import React from "react";
import { useAsync } from "react-use";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import { addGenresFilter, addYearFilter } from "actions";
import { getGenres } from "apis/tmdb";
import { config } from "../../constants";
import GenreFilter from "./GenreFilter";
import YearsSlider from "./YearsSlider";

const LAST_YEAR = new Date().getFullYear();
const FIRST_YEAR = LAST_YEAR - config.YEARS_NUM;

function FilterBar() {
  const dispatch = useDispatch();
  const { value: genres, loading } = useAsync(
    async () => (await getGenres())?.data?.genres || []
  );

  const filter = useSelector((state) => state.filter);

  const setYearsRange = (range) => dispatch(addYearFilter(range));
  const setCheckedGenresList = (genreList) =>
    dispatch(addGenresFilter(genreList));

  return (
    <Box>
      <Paper elevation={3}>
        {!loading && (
          <GenreFilter
            genres={genres}
            checkedGenres={filter.genres}
            onChange={setCheckedGenresList}
          />
        )}
        <YearsSlider
          yearsRange={filter.yearsRange ?? [FIRST_YEAR, LAST_YEAR]}
          updateRange={setYearsRange}
          firstYear={FIRST_YEAR}
          lastYear={LAST_YEAR}
        />
      </Paper>
    </Box>
  );
}

export default FilterBar;
