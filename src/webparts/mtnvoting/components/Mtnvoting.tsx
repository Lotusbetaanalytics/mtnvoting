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
  AdminRevoked,
  Administrator,
  ErrorScreen,
  AdminViewDeclined,
  AdminConfig,
  LandingPage,
  EmployeeRegistration,
  CandidateDashboard,
  CandidateRegister,
  CandidateViewRequest,
  AdminRegion,
  AdminLocation,
  AdminReason,
  // AdminReport,
  AdminViewRevoked,
  // AdminResult,
} from "./screens";
import "./global.scss";
import "./assets/icon.scss";

import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";

export default class Mtnvoting extends React.Component<IMtnvotingProps, {}> {
  public render(): React.ReactElement<IMtnvotingProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");
    this.props.context.spHttpClient
      .get(
        `https://lotusbetaanalytics.sharepoint.com/sites/business_solutions/_api/lists/GetByTitle('CURRENT HCM STAFF LIST-test')/items?$skiptoken=Paged=TRUE`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          console.log(responseJSON);
        });
      });

    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/registration" exact component={EmployeeRegistration} />

          <Route path="/admin" exact component={AdminDashboard} />
          <Route path="/admin/add" exact component={Administrator} />
          {/* <Route path="/admin/reports" exact component={AdminReport} /> */}
          {/* <Route path="/admin/reports/:title" exact component={AdminResult} /> */}
          <Route path="/admin/reason" exact component={AdminReason} />
          <Route path="/admin/region" exact component={AdminRegion} />
          <Route path="/admin/location" exact component={AdminLocation} />
          <Route path="/admin/pending" exact component={AdminPending} />
          <Route path="/admin/pending/:id" exact component={AdminViewPending} />
          <Route path="/admin/approved" exact component={AdminApproved} />
          <Route
            path="/admin/approved/:id"
            exact
            component={AdminViewApproved}
          />
          <Route path="/admin/declined" exact component={AdminDeclined} />
          <Route
            path="/admin/declined/:id"
            exact
            component={AdminViewDeclined}
          />
          <Route path="/admin/revoked" exact component={AdminRevoked} />
          <Route path="/admin/revoked/:id" exact component={AdminViewRevoked} />
          <Route path="/admin/config" exact component={AdminConfig} />
          {/* <Route path="/candidate" exact component={CandidateDashboard} /> */}
          {/* <Route
            path="/candidate/register"
            exact
            component={CandidateRegister}
          /> */}
          {/* <Route path="/candidate/edit" exact component={CandidateEdit} /> */}
          {/* <Route
            path="/candidate/view"
            exact
            component={CandidateViewRequest}
          /> */}
          <Route component={ErrorScreen} />
        </Switch>
      </HashRouter>
    );
  }
}
