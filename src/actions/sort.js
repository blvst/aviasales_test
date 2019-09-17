import { CHANGE_SORTING } from '../constants/actions';

export const changeSorting = (payload) => {
  return {
    type: CHANGE_SORTING,
    payload,
  };
};