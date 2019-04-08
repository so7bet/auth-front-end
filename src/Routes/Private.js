import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Base from '../Base';

const PrivateRoute = ({ component: Component, isAuthenticated, isAdmin, isAuthor, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated && isAdmin || isAuthor ? (
            <Base>
                <Component {...props}/>
            </Base>
        ) : (
            <Redirect to={{
                pathname: './login',
                state: {from: props.location}
            }}/>
        )
    )}/>

);

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
        isAdmin: state.Auth.isAdmin,
        isAuthor: state.Auth.isAuthor
    }
};

export default connect(mapStateToProps)(PrivateRoute);
