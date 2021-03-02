import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'

import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import widthErrorHandler from "../../../hoc/WidthErrorHandler/WidthErrorHandler";
import Spinner from '../../../components/UI/Spinner/Spinner';

class Orders extends React.Component {

    componentDidMount() {
        this.props.onfetchOrders(this.props.token, this.props.userId);
    }

    render() {
        const orders =  this.props.orders.map(order => {
            return <Order key={order.id}
                          ingredients={order.ingredients}
                          price={+order.price}/>
        })

        return (
            <div>
                {this.props.loading ? <Spinner/> : orders}
            </div>
        )
    }
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