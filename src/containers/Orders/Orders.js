import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import widthErrorHandler from "../../hoc/WidthErrorHandler/WidthErrorHandler";
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

    const {token, userId, onfetchOrders} = props

    //ComponentDidMount
    useEffect(() => {
        onfetchOrders(token, userId);
    }, [token, userId, onfetchOrders])

    const orders = props.orders.map(order => {
        return <Order key={order.id}
                      ingredients={order.ingredients}
                      price={+order.price}/>
    })

    return (
        <div>
            {props.loading ? <Spinner/> : orders}
        </div>
    )
}

const mapPropsToState = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToState = dispatch => {
    return {
        onfetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}


export default connect(mapPropsToState, mapDispatchToState)(widthErrorHandler(Orders, axios));