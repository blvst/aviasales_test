import { CHANGE_FILTER } from "../constants/actions";

export const changeFilter = (payload) => {
  return {
    type: CHANGE_FILTER,
    payload,
  }
};