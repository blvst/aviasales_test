import { searchAPI } from '../api/api';
import {
  CHANGE_SEARCH_ID,
  CHANGE_FAILED_ATTEMPTS,
  SET_SEARCH_FAILED,
  UPDATE_TICKETS,
} from "../constants/actions";

export const initSearch = () => async dispatch => {
  try {
    const response = await searchAPI.getSearchID();

    return dispatch({
      type: CHANGE_SEARCH_ID,
      payload: response,
    });
  } catch (e) {
    return dispatch({
      type: SET_SEARCH_FAILED,
    });
  }
};

export const getTickets = (searchId) => async (dispatch, getState) => {
  let result;
  let response;
  const { failedAttempts } = getState();

  try {
    response = await searchAPI.getTickets(searchId);

    if (!response) {
      throw new Error('Ошибка сервера');
    }

    const segments = [];
    response.tickets.forEach((ticket, index) => {
      ticket.segments.forEach((segment) => {
        segments[index] = segments[index] || [];
        segments[index].push(segment.stops.length);
      });
    });

    result = {
      type: UPDATE_TICKETS,
      payload: {
        tickets: response.tickets,
        segments,
      },
    }

  } catch (e) {
    if (failedAttempts >= 5) {
      result = {
        type: SET_SEARCH_FAILED,
      }
    } else {
      result = {
        type: CHANGE_FAILED_ATTEMPTS,
        payload: failedAttempts + 1,
      }
    }
  } finally {
    if ((!response && failedAttempts < 5) || response.stop !== true) {
      setTimeout(() => {
        getTickets(searchId)(dispatch, getState);
      }, 3000);
    }
  }

  return dispatch(result);
};