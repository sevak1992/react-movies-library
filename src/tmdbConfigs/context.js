import React from "react";
import { useAsync } from "react-use";
import Alert from "@material-ui/lab/Alert";

import { getConfigs } from "apis/tmdb";
import LoadingIndicator from "components/common/LoadingIndicator";
import { messages } from "../constants";

const TmdbContext = React.createContext(null);

export const withConfigs = (Component) => (props) => {
  const { value: configs, loading, error } = useAsync(async () => {
    return (await getConfigs())?.data || null;
  }, []);

  return loading ? (
    <LoadingIndicator isFullScrean />
  ) : error ? (
    <Alert variant="outlined" severity="error">
      {messages.ERRORS.SOMETHING_WENT_WRONG}
    </Alert>
  ) : (
    <TmdbContext.Consumer>
      {() => <Component {...props} configs={configs} />}
    </TmdbContext.Consumer>
  );
};

export default TmdbContext;
