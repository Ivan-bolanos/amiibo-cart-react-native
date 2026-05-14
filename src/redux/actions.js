import util from '../utils/Util';
import amiiboApi from '../services/amiiboApi';

export const EDIT_ITEM = 'EDIT_ITEM';
export const GET_GAMES_REQUEST = 'GET_GAMES_REQUEST';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';
export const GET_GAMES_FAILURE = 'GET_GAMES_FAILURE';

export const getGames = () => {
    return async dispatch => {
        dispatch({ type: GET_GAMES_REQUEST });

        const response = await amiiboApi.getZeldaAmiibos();

        if (response.success) {
            const processedGames = response.data.map((amiibo, index) => ({
                ...amiibo,
                key: index,
                price: util.getNumberRandomRound10(),
                quantity: 0,
            }));

            dispatch({
                type: GET_GAMES_SUCCESS,
                payload: processedGames,
            });
        } else {
            dispatch({
                type: GET_GAMES_FAILURE,
                payload: response.error,
            });
        }
    };
};

export const editItem = item => dispatch =>
    dispatch({
        type: EDIT_ITEM,
        payload: item,
    });

