import * as types from './types';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, orderData) => {

    return {
        type: types.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData,
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: types.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: types.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())

        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: types.PURCHASE_INIT
    }
}


export const fetchOrdersStart = () => {
    return {
        type: types.FETCH_ORDER_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: types.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: types.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + queryParams)
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error))
            })
    }
}