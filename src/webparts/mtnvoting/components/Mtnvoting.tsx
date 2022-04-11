import * as React from 'react';
import styles from './Mtnvoting.module.scss';
import { IMtnvotingProps } from './IMtnvotingProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Route, Switch, HashRouter } from 'react-router-dom';
import * as jQuery from 'jquery';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import * as pnp from 'sp-pnp-js';
import { AdminDashboard, ErrorScreen } from './screens';

export default class Mtnvoting extends React.Component<IMtnvotingProps, {}> {
  public render(): React.ReactElement<IMtnvotingProps> {
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
