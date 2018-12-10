import React from "react";
import Loadable from 'react-loadable'

import App from "./layouts/App";
import { Route, Switch, Router } from "react-router-dom";

import createBrowserHistory from 'history/createBrowserHistory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'reactstrap';
const history = createBrowserHistory()

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
    loader: () => import('./views/Main/SignIn'),
    loading: LoadingComponant
})

const SignUp = Loadable({
    loader: () => import('./views/Main/SignUp'),
    loading: LoadingComponant
})

const InUp = Loadable({
    loader: () => import('./views/Main/IncludeInUp'),
    loading: LoadingComponant
})

const Map = Loadable({
    loader: () => import('./views/Activity/Map'),
    loading: LoadingComponant
})

const Diary = Loadable({
    loader: () => import('./views/Activity/Diary'),
    loading: LoadingComponant
})

const Book = Loadable({
    loader: () => import('./views/Activity/Book'),
    loading: LoadingComponant
})

const Feed = Loadable({
    loader: () => import('./views/Activity/Feed'),
    loading: LoadingComponant
})

const Notice = Loadable({
    loader: () => import('./views/Activity/Notice'),
    loading: LoadingComponant
})

const Profile = Loadable({
    loader: () => import('./views/Main/Profile'),
    loading: LoadingComponant
})

const UpdatePWD = Loadable({
    loader: () => import('./views/Main/UpdatePWD'),
    loading: LoadingComponant
})

const UpdateIMG = Loadable({
    loader: () => import('./views/Main/UpdateIMG'),
    loading: LoadingComponant
})

const Routes = props => {
    return (
        <App>
            <Router history={history}>
                <Switch>
                    <Route exact path="/in" component={SignIn} />
                    <Route exact path="/up" component={SignUp} />
                    <Route exact path="/upin" component={InUp} />
                    <Route exact path="/diary" component={Diary} />
                    <Route exact path="/feed" component={Feed} />
                    <Route exact path="/bookmark" component={Book} />
                    <Route exact path="/notice" component={Notice} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/profile/pwd" component={UpdatePWD} />
                    <Route exact path="/profile/img" component={UpdateIMG} />
                    <Route exact path="/" component={Map} />
                </Switch>
            </Router>
        </App>
    );
};

export default Routes;