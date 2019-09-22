import { createSelector } from 'reselect';

export const getTickets = (state) => state.tickets;
export const getFilters = (state) => state.filtersList;
export const getActiveSort = (state) => state.activeSort;

export const filteredTickets = createSelector(
  [ getTickets, getFilters ],
  (tickets, filters) => {
    let checkedFilters = filters
      .filter(item => item.value)
      .map(item => item.id);

    if (!checkedFilters.length || checkedFilters.length === filters.length) {
      return tickets;
    }

    return tickets.filter(ticket => {
      /*
      * Проходимся по сегментам
      * Для каждого сегмента проверяем сравниваем длину
      * со списком искомых фильтров.
      * Получаем массив из двух элементов, если хоть один из которых false
      * то этот тикет нам не подходит
      */
      return !(
        ticket.segments.map((segment) => (
          checkedFilters.some(filter => filter === segment.stops.length)
        )).some(item => item === false)
      );
    });
  },
);


export const sortedFilteredTickets = createSelector(
  [
    filteredTickets,
    getActiveSort,
  ],
  (tickets, activeSort) => {
    return [...tickets].sort((a, b) => {
      if (activeSort === 1) {
        return a.price - b.price;
      }

      const aDuration = a.segments.reduce((acc, current) => { return acc + current.duration }, 0);
      const bDuration = b.segments.reduce((acc, current) => { return acc + current.duration }, 0);

      return aDuration - bDuration;
    }).slice(0, 5)
  }
);
