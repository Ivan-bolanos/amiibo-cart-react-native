import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    getGames,
    editItem,
    EDIT_ITEM,
    GET_GAMES_REQUEST,
    GET_GAMES_SUCCESS,
    GET_GAMES_FAILURE,
} from '../../src/redux/actions';
import amiiboApi from '../../src/services/amiiboApi';

jest.mock('../../src/services/amiiboApi');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Redux Actions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('editItem', () => {
        it('should create an action to edit an item', () => {
            const item = {
                key: 1,
                name: 'Link',
                quantity: 2,
                price: 1500,
            };

            const expectedAction = {
                type: EDIT_ITEM,
                payload: item,
            };

            const store = mockStore({});
            store.dispatch(editItem(item));

            const actions = store.getActions();
            expect(actions[0]).toEqual(expectedAction);
        });
    });

    describe('getGames', () => {
        it('should dispatch GET_GAMES_SUCCESS when API call succeeds', async () => {
            const mockApiResponse = {
                success: true,
                data: [
                    {
                        name: 'Link',
                        character: 'Link',
                        gameSeries: 'The Legend of Zelda',
                        image: 'https://example.com/link.png',
                    },
                    {
                        name: 'Zelda',
                        character: 'Zelda',
                        gameSeries: 'The Legend of Zelda',
                        image: 'https://example.com/zelda.png',
                    },
                ],
            };

            amiiboApi.getZeldaAmiibos.mockResolvedValue(mockApiResponse);

            const expectedActions = [
                { type: GET_GAMES_REQUEST },
                {
                    type: GET_GAMES_SUCCESS,
                    payload: expect.arrayContaining([
                        expect.objectContaining({
                            name: 'Link',
                            key: expect.any(Number),
                            price: expect.any(Number),
                            quantity: 0,
                        }),
                    ]),
                },
            ];

            const store = mockStore({});
            await store.dispatch(getGames());

            const actions = store.getActions();
            expect(actions).toHaveLength(2);
            expect(actions[0]).toEqual(expectedActions[0]);
            expect(actions[1].type).toEqual(GET_GAMES_SUCCESS);
            expect(actions[1].payload).toHaveLength(2);
            expect(actions[1].payload[0]).toHaveProperty('key');
            expect(actions[1].payload[0]).toHaveProperty('price');
            expect(actions[1].payload[0]).toHaveProperty('quantity', 0);
        });

        it('should dispatch GET_GAMES_FAILURE when API call fails', async () => {
            const errorMessage = 'Network error';
            const mockApiResponse = {
                success: false,
                error: errorMessage,
            };

            amiiboApi.getZeldaAmiibos.mockResolvedValue(mockApiResponse);

            const expectedActions = [
                { type: GET_GAMES_REQUEST },
                {
                    type: GET_GAMES_FAILURE,
                    payload: errorMessage,
                },
            ];

            const store = mockStore({});
            await store.dispatch(getGames());

            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
        });

        it('should add unique keys and initialize quantity to 0', async () => {
            const mockApiResponse = {
                success: true,
                data: [
                    { name: 'Link' },
                    { name: 'Zelda' },
                    { name: 'Ganondorf' },
                ],
            };

            amiiboApi.getZeldaAmiibos.mockResolvedValue(mockApiResponse);

            const store = mockStore({});
            await store.dispatch(getGames());

            const actions = store.getActions();
            const successAction = actions.find(a => a.type === GET_GAMES_SUCCESS);

            expect(successAction.payload[0].key).toBe(0);
            expect(successAction.payload[1].key).toBe(1);
            expect(successAction.payload[2].key).toBe(2);
            expect(successAction.payload.every(item => item.quantity === 0)).toBe(true);
        });
    });
});