import React from "react";
import Loadable from 'react-loadable'

import App from "./layouts/App";
import { Route, Switch, Router } from "react-router-dom";

import createBrowserHistory from 'history/createBrowserHistory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'reactstrap';
import SignIn from './views/SignIn'

const history = createBrowserHistory()
/*
const LoadingComponant = ({ isLoading, error }) => {
    if (isLoading) {
        return <Alert color="info" style={{ margin: '25% 5%' }}><FontAwesomeIcon icon="spinner" spin /> Loading... </Alert>;
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
*/
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