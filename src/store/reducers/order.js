import * as types from '../actions/types';


const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case types.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case types.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case types.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id,
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }

        case types.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }

        case types.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }

        case types.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }

        case types.FETCH_ORDER_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;