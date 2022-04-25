import * as React from "react";
import { IMtnvotingProps } from "./IMtnvotingProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Route, Switch, HashRouter } from "react-router-dom";
import * as jQuery from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import * as pnp from "sp-pnp-js";
import {
  AdminApproved,
  AdminDashboard,
  AdminDeclined,
  AdminPending,
  AdminViewApproved,
  AdminViewPending,
  ErrorScreen,
  LandingPage2,
} from "./screens";
import "./global.scss";
import "./assets/icon.scss";
import LandingPage from "./screens/LandingPage";
import EmployeeRegistration from "./screens/EmployeeRegistration";

export default class Mtnvoting extends React.Component<IMtnvotingProps, {}> {
  public render(): React.ReactElement<IMtnvotingProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");
    return (
      <HashRouter>
        <Switch>
          <Route path="/admin" exact component={AdminDashboard} />
          <Route path="/admin/pending" exact component={AdminPending} />
          <Route path="/admin/pending/:id" exact component={AdminViewPending} />
          <Route path="/admin/approved" exact component={AdminApproved} />
          <Route
            path="/admin/approved/:id"
            exact
            component={AdminViewApproved}
          />
          <Route path="/admin/declined" exact component={AdminDeclined} />
          <Route path="/user/landingpage" exact component={LandingPage} />
          <Route path="/candidate/landingpage" exact component={LandingPage2} />
          <Route
            path="/employeeregistration"
            exact
            component={EmployeeRegistration}
          />
          <Route component={ErrorScreen} />
        </Switch>
      </HashRouter>
    );
  }
}
