import { searchAPI } from '../api/api';
import {
  CHANGE_SEARCH_ID,
  CHANGE_FAILED_ATTEMPTS,
  SET_SEARCH_FAILED,
  UPDATE_TICKETS,
} from '../constants/actions';

const changeSearchId = (payload) => {
  return {
    type: CHANGE_SEARCH_ID,
    payload,
  };
};

const changeFailedAttempts = (payload) => {
  return {
    type: CHANGE_FAILED_ATTEMPTS,
    payload,
  };
};

const setSearchFailed = () => {
  return {
    type: SET_SEARCH_FAILED,
  };
};

const updateTickets = (tickets) => {
  return {
    type: UPDATE_TICKETS,
    payload: {
      tickets,
    },
  };
};

export const initSearch = () => dispatch => {
  return searchAPI.getSearchID()
    .then(response => dispatch(changeSearchId(response)))
    .catch(() => dispatch(setSearchFailed()));
};

export const getTickets = (searchId) => async (dispatch, getState) => {
  const { failedAttempts } = getState();

  if (failedAttempts >= 5) {
    return dispatch(setSearchFailed());
  }

  let response;
  try {
    response = await searchAPI.getTickets(searchId);

    if (!response) {
      throw new Error('Ошибка сервера');
    }

    return dispatch(updateTickets(response.tickets));
  } catch(e) {
    return dispatch(changeFailedAttempts(failedAttempts + 1));
  } finally {
    if (!response || !response.stop) {
      setTimeout(() => {
        getTickets(searchId)(dispatch, getState);
      }, 3000);
    }
  }
};
