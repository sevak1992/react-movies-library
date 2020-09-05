import React, { useState, useEffect } from "react";
import { useAsync } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import {
  addGenresFilter,
  addYearFilter,
  changeSorting,
  resetFilter,
} from "actions";
import LoadingIndicator from "components/common/LoadingIndicator";
import { getGenres } from "apis/tmdb";
import { config, messages } from "../../constants";
import GenreFilter from "./GenreFilter";
import YearsSlider from "./YearsSlider";
import Sorting from "./Sorting";

const LAST_YEAR = new Date().getFullYear();
const FIRST_YEAR = LAST_YEAR - config.YEARS_NUM;

function FilterAndSortingBar() {
  const dispatch = useDispatch();
  const { value: genres, loading, error: genresError } = useAsync(
    async () => (await getGenres())?.data?.genres || []
  );

  const filter = useSelector((state) => state.filter);
  const { sorting } = useSelector((state) => state.sorting);

  const [checkedGenres, setCheckedGenres] = useState(filter.genres ?? []);
  const [yearsRange, setYearsRange] = useState(
    filter.yearsRange ?? [FIRST_YEAR, LAST_YEAR]
  );

  useEffect(() => {
    setCheckedGenres(filter.genres);
    setYearsRange(filter.yearsRange);
  }, [filter]);

  const onFilter = () => {
    dispatch(addYearFilter(yearsRange));
    dispatch(addGenresFilter(checkedGenres));
  };

  const onResetFilter = () => {
    dispatch(resetFilter());
  };

  const onChangeSorting = (event) => {
    dispatch(changeSorting(event.target.value));
  };

  return (
    <Box>
      <Paper elevation={3}>
        <Sorting selectedSorting={sorting} onChange={onChangeSorting} />
        {loading ? (
          <LoadingIndicator />
        ) : genresError ? (
          <Alert variant="outlined" severity="error">
            {messages.ERRORS.SOMETHING_WENT_WRONG}
          </Alert>
        ) : (
          <GenreFilter
            genres={genres}
            checkedGenres={checkedGenres}
            onChange={setCheckedGenres}
          />
        )}
        <YearsSlider
          yearsRange={yearsRange ?? [FIRST_YEAR, LAST_YEAR]}
          updateRange={setYearsRange}
          firstYear={FIRST_YEAR}
          lastYear={LAST_YEAR}
        />

        <Box pb={2} display="flex" justifyContent="center">
          <Button variant="outlined" color="primary" onClick={onFilter}>
            {messages.FILTERS_AND_SORTING.FILTER_BTN}
          </Button>
        </Box>

        <Box pb={2} display="flex" justifyContent="center">
          <Button variant="outlined" color="secondary" onClick={onResetFilter}>
            {messages.FILTERS_AND_SORTING.RESET_FILTER_BTN}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default FilterAndSortingBar;
