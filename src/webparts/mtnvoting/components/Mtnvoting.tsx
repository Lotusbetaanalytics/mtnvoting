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
  Voting,
  LandingPage,
  EmployeeRegistration,
  AdminRegion,
  AdminLocation,
} from "./screens";
import "./global.scss";
import "./assets/icon.scss";

import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import { sp } from "@pnp/sp";

export default class Mtnvoting extends React.Component<
  IMtnvotingProps,
  {
    checkStatus: Boolean;
    finding: Boolean;
  }
> {
  constructor(props: IMtnvotingProps) {
    super(props);
    this.state = {
      checkStatus: false,
      finding: false,
    };
  }

  componentDidMount(): void {
    sp.profiles.myProperties.get().then(({ Email }) => {
      this.props.context.spHttpClient
        .get(
          `https://lotusbetaanalytics.sharepoint.com/sites/business_solutions/_api/lists/GetByTitle('CURRENT HCM STAFF LIST-test')/items?$filter=field_8 eq '${Email}'`,
          SPHttpClient.configurations.v1
        )
        .then((response: SPHttpClientResponse) => {
          response.json().then((responseJSON: any) => {
            console.log(responseJSON);
            if (!responseJSON.length) {
              console.log("found");
              this.setState({
                checkStatus: true,
                finding: true,
              });
            }
          });
        });
    });
  }

  public render(): React.ReactElement<IMtnvotingProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");

    return (
      <Context.Provider
        value={{
          spHttpClient: this.props.context.spHttpClient,
        }}
      >
        <HashRouter>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route
              path="/registration"
              exact
              component={EmployeeRegistration}
            />
            <Route path="/vote" exact component={Voting} />
            <Route path="/admin" exact component={AdminDashboard} />
            <Route path="/admin/add" exact component={Administrator} />
            <Route path="/admin/region" exact component={AdminRegion} />
            <Route path="/admin/location" exact component={AdminLocation} />
            <Route path="/admin/pending" exact component={AdminPending} />
            <Route
              path="/admin/pending/:id"
              exact
              component={AdminViewPending}
            />
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
            <Route path="/admin/config" exact component={AdminConfig} />

            <Route component={ErrorScreen} />
          </Switch>
        </HashRouter>
      </Context.Provider>
    );
  }
}

export const Context = React.createContext({
  spHttpClient: null,
});
