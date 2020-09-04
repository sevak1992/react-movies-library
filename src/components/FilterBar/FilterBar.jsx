import React, { useState, useEffect } from "react";
import { useAsync } from "react-use";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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

  return (
    <Box>
      <Paper elevation={3}>
        {!loading && (
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
            Filter
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default FilterBar;
