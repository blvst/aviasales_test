import { createSelector } from 'reselect';

export const getTickets = (state) => state.tickets;
export const getSegments = (state) => state.segments;
export const getFilters = (state) => state.filtersList;
export const getActiveSort = (state) => state.activeSort;

export const filteredTickets = createSelector(
  [ getTickets, getSegments, getFilters ],
  (tickets, segments, filters) => {
    let checkedFilters = filters
      .filter(item => item.value)
      .map(item => item.id);

    if (!checkedFilters.length || checkedFilters.length === filters.length) {
      return tickets;
    }

   return tickets.filter((ticket, index) => {
      const there = checkedFilters.some(filter => segments[index][0] === filter);
      if (!there) return false;

      return checkedFilters.some(filter => segments[index][1] === filter);
    });
  },
);


export const sortedFilteredTickets = createSelector(
  [
    filteredTickets,
    getActiveSort,
  ],
  (tickets, activeSort) => {
    return tickets.sort((a, b) => {
      if (activeSort === 1) {
        return a.price - b.price;
      }

      const aDuration = a.segments.reduce((acc, current) => { return acc + current.duration }, 0);
      const bDuration = b.segments.reduce((acc, current) => { return acc + current.duration }, 0);

      return aDuration - bDuration;
    }).slice(0, 5)
  }
);