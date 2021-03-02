import * as types from '../actions/types';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case types.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case types.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false,
            }
        case types.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case types.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
            }
        case types.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirect: action.path
            }
        default:
            return state;
    }

}

export default reducer;