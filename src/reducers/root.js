import {
  CHANGE_FAILED_ATTEMPTS,
  CHANGE_FILTER,
  CHANGE_SEARCH_ID,
  CHANGE_SORTING,
  SET_SEARCH_FAILED,
  UPDATE_TICKETS
} from '../constants/actions';

const initialState = {
  failedAttempts: 0,
  searchId: null,
  searchFailed: false,

  activeSort: 1,
  tabsList: [
    {
      id: 1,
      label: 'Самый дешевый',
    },
    {
      id: 2,
      label: 'Самый быстрый',
    }
  ],

  filtersList: [
    {
      id: -1,
      label: 'Все',
      value: false,
    },
    {
      id: 0,
      label: 'Без пересадок',
      value: false,
    },
    {
      id: 1,
      label: '1 пересадка',
      value: false,
    },
    {
      id: 2,
      label: '2 пересадки',
      value: false,
    },
    {
      id: 3,
      label: '3 пересадки',
      value: false,
    },
  ],
  tickets: [],
  segments: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_FAILED:
      return {
        ...state,
        searchFailed: true,
      };

    case CHANGE_SEARCH_ID:
      return {
        ...state,
        searchId: action.payload,
      };

    case CHANGE_FAILED_ATTEMPTS:
      return {
        ...state,
        failedAttempts: action.payload,
      };

    case CHANGE_SORTING:
      return {
        ...state,
        activeSort: action.payload,
      };

    case CHANGE_FILTER:
      return {
        ...state,
        filtersList: state.filtersList.map((item) => {
          if (action.payload.id === -1 || action.payload.id === item.id) {
            return {
              ...item,
              value: action.payload.value,
            }
          }

          return item;
        }),
      };

    case UPDATE_TICKETS:
      return {
        ...state,
        tickets: action.payload.tickets,
        segments: action.payload.segments,
      };

    default:
      return state;
  }
};