import {
    EDIT_ITEM,
    GET_GAMES_REQUEST,
    GET_GAMES_SUCCESS,
    GET_GAMES_FAILURE
} from './actions';

const initialState = {
    games: [],
    shoppingCart: [],
    loading: false,
    error: null,
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_ITEM:
            const existingItemIndex = state.shoppingCart.findIndex(
                item => item.key === action.payload.key
            );

            if (existingItemIndex !== -1) {
                // Update existing item - create new array with updated object
                const updatedCart = state.shoppingCart.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                );
                return { ...state, shoppingCart: updatedCart };
            } else {
                // Add new item - create new array
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart, action.payload]
                };
            }
        case GET_GAMES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_GAMES_SUCCESS:
            return {
                ...state,
                loading: false,
                games: action.payload,
                error: null,
            };
        case GET_GAMES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default userReducer;
