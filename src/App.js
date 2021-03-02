import React, {useEffect} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const App = (props) => {

    const {onTryAutoSignup, isAuthenticated} = props;

    useEffect(() => {
        // console.log('useEffect')
        onTryAutoSignup();
    }, [onTryAutoSignup, isAuthenticated])

    let routes = (
        <Switch>
            <Route path='/auth' component={Auth}/>
            <Route path='/' component={BurgerBuilder}/>
            <Redirect to='/'/>
        </Switch>
    )

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path='/checkout' component={Checkout}/>
                <Route path='/orders' component={Orders}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/auth' component={Auth}/>
                <Route path='/' component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <div>
            <Layout>
                {routes}
            </Layout>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
