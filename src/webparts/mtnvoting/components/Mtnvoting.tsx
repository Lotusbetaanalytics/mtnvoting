import * as React from 'react';
import { IMtnvotingProps } from './IMtnvotingProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Route, Switch, HashRouter } from 'react-router-dom';
import * as jQuery from 'jquery';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import * as pnp from 'sp-pnp-js';
import { AdminDashboard, ErrorScreen } from './screens';
import "./global.scss"


export default class Mtnvoting extends React.Component<IMtnvotingProps, {}> {
  public render(): React.ReactElement<IMtnvotingProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none"); jQuery(".SPCanvas-canvas").prop("style", "max-width: none"); jQuery(".CanvasZone").prop("style", "max-width: none");
    return (
      <HashRouter>
        <Switch>
          <Route path="/admin" exact component={AdminDashboard} />
          <Route component={ErrorScreen} />
        </Switch>
      </HashRouter>
    );
  }
}
