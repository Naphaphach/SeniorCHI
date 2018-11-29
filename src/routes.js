import React from "react";
import Loadable from 'react-loadable'

import App from "./layouts/App";
import { Route, Switch, Router } from "react-router-dom";

import createBrowserHistory from 'history/createBrowserHistory'

import { Alert } from 'reactstrap';

const history = createBrowserHistory()

const LoadingComponant = ({ isLoading, error }) => {
    if (isLoading) {
        return <img src="logo.png" class="className" style={{width:'270px', height:'270px', position:'absolute', left:'50%', top:'50%', margin:"-135px 0 0 -135px"}} alt='logo'/>;
    } else if (error) {
        return <Alert color="danger" style={{ margin: '25% 5%' }}>Sorry, unable to load the page ...</Alert>
    } else {
        return null
    }
}

const SignIn = Loadable({
    loader: () => import('./views/SignIn'),
    loading: LoadingComponant
})

const Routes = props => {
    return (
        <App>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={SignIn} />
                </Switch>
            </Router>
        </App>
    );
};

export default Routes;