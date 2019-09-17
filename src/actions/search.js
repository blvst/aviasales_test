import { searchAPI } from '../api/api';
import {
  CHANGE_SEARCH_ID,
  CHANGE_FAILED_ATTEMPTS,
  SET_SEARCH_FAILED,
  UPDATE_TICKETS,
} from "../constants/actions";


function changeSearchId(payload) {
  return {
    type: CHANGE_SEARCH_ID,
    payload,
  }
}

function changeFailedAttempts(payload) {
  return {
    type: CHANGE_FAILED_ATTEMPTS,
    payload,
  }
}

function setSearchFailed() {
  return {
    type: SET_SEARCH_FAILED,
  }
}

function updateTickets(tickets) {
  const segments = [];
  tickets.forEach((ticket, index) => {
    segments[index] = ticket.segments
      .map((segment) => (segment.stops.length));
  });

  return {
    type: UPDATE_TICKETS,
    payload: {
      tickets,
      segments,
    },
  }
}

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

    return dispatch(updateTickets(response.tickets))
  } catch(e) {
    return dispatch(changeFailedAttempts(failedAttempts + 1))
  } finally {
    if (!response || !response.stop) {
      setTimeout(() => {
        getTickets(searchId)(dispatch, getState);
      }, 3000);
    }
  }
};