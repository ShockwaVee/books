import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { RouteUrl } from "../enums/RouteUrl";
import { BookFinder } from "../components/BookFinder/BookFinder";
import { BookInfo } from "../components/BookInfo/BookInfo";

export const RouteView: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path={RouteUrl.Home} component={BookFinder} />
      <Route exact path={RouteUrl.Book} component={BookInfo} />
    </Switch>
  );
};
