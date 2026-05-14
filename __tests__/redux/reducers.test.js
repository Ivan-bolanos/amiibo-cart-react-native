import userReducer from '../../src/redux/reducers';
import {
    EDIT_ITEM,
    GET_GAMES_REQUEST,
    GET_GAMES_SUCCESS,
    GET_GAMES_FAILURE,
} from '../../src/redux/actions';

describe('userReducer', () => {
    const initialState = {
        games: [],
        shoppingCart: [],
        loading: false,
        error: null,
    };

    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    describe('EDIT_ITEM', () => {
        it('should add a new item to the shopping cart', () => {
            const newItem = {
                key: 1,
                name: 'Link Amiibo',
                quantity: 1,
                price: 1500,
            };

            const action = {
                type: EDIT_ITEM,
                payload: newItem,
            };

            const newState = userReducer(initialState, action);

            expect(newState.shoppingCart).toHaveLength(1);
            expect(newState.shoppingCart[0]).toEqual(newItem);
            // Verify immutability
            expect(newState).not.toBe(initialState);
            expect(newState.shoppingCart).not.toBe(initialState.shoppingCart);
        });

        it('should update an existing item in the shopping cart', () => {
            const existingItem = {
                key: 1,
                name: 'Link Amiibo',
                quantity: 1,
                price: 1500,
            };

            const stateWithItem = {
                ...initialState,
                shoppingCart: [existingItem],
            };

            const updatedItem = {
                ...existingItem,
                quantity: 3,
            };

            const action = {
                type: EDIT_ITEM,
                payload: updatedItem,
            };

            const newState = userReducer(stateWithItem, action);

            expect(newState.shoppingCart).toHaveLength(1);
            expect(newState.shoppingCart[0].quantity).toBe(3);
            // Verify immutability
            expect(newState.shoppingCart[0]).not.toBe(existingItem);
        });

        it('should handle removing item (quantity 0)', () => {
            const existingItem = {
                key: 1,
                name: 'Link Amiibo',
                quantity: 2,
                price: 1500,
            };

            const stateWithItem = {
                ...initialState,
                shoppingCart: [existingItem],
            };

            const removedItem = {
                ...existingItem,
                quantity: 0,
            };

            const action = {
                type: EDIT_ITEM,
                payload: removedItem,
            };

            const newState = userReducer(stateWithItem, action);

            expect(newState.shoppingCart).toHaveLength(1);
            expect(newState.shoppingCart[0].quantity).toBe(0);
        });

        it('should not mutate the original state', () => {
            const originalState = {
                games: [],
                shoppingCart: [{
                    key: 1,
                    name: 'Original',
                    quantity: 1,
                    price: 1000,
                }],
                loading: false,
                error: null,
            };

            const stateCopy = JSON.parse(JSON.stringify(originalState));

            const action = {
                type: EDIT_ITEM,
                payload: {
                    key: 1,
                    name: 'Original',
                    quantity: 5,
                    price: 1000,
                },
            };

            userReducer(originalState, action);

            expect(originalState).toEqual(stateCopy);
        });
    });

    describe('GET_GAMES actions', () => {
        it('should handle GET_GAMES_REQUEST', () => {
            const action = { type: GET_GAMES_REQUEST };
            const newState = userReducer(initialState, action);

            expect(newState.loading).toBe(true);
            expect(newState.error).toBe(null);
        });

        it('should handle GET_GAMES_SUCCESS', () => {
            const games = [
                { key: 0, name: 'Link', price: 1500, quantity: 0 },
                { key: 1, name: 'Zelda', price: 1600, quantity: 0 },
            ];

            const action = {
                type: GET_GAMES_SUCCESS,
                payload: games,
            };

            const loadingState = {
                ...initialState,
                loading: true,
            };

            const newState = userReducer(loadingState, action);

            expect(newState.loading).toBe(false);
            expect(newState.error).toBe(null);
            expect(newState.games).toEqual(games);
            expect(newState.games).toHaveLength(2);
        });

        it('should handle GET_GAMES_FAILURE', () => {
            const errorMessage = 'Network error';

            const action = {
                type: GET_GAMES_FAILURE,
                payload: errorMessage,
            };

            const loadingState = {
                ...initialState,
                loading: true,
            };

            const newState = userReducer(loadingState, action);

            expect(newState.loading).toBe(false);
            expect(newState.error).toBe(errorMessage);
            expect(newState.games).toEqual([]);
        });
    });
});