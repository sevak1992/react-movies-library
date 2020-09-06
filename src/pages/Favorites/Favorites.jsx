import React from "react";
import { AuthUserContext } from "auth/session";

import FavoritesContent from "components/FavoritesContent";

function Favorites() {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => <FavoritesContent authUser={authUser} />}
    </AuthUserContext.Consumer>
  );
}

export default Favorites;
