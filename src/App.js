import React, { useEffect } from 'react';
import logo from './logo.svg';
import Filter from './components/Filter/Filter';
import Tabs from './components/Tabs/Tabs';
import Ticket from './components/Ticket/Ticket';

import './variables.css';
import './App.css';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { changeFilter } from "./actions/filters";
import { changeSorting } from "./actions/sort";
import { initSearch, getTickets } from "./actions/search";
import Notification from "./components/Notification/Notification";


function App(props) {
  const {
    searchIsFailed,
    tickets,
    activeSort,
    tabsList,
    filtersList,
    changeSorting,
    changeFilter,
    initSearch,
    getTickets,
  } = props;


  const handleChangeFilter = (evt) => {
    changeFilter(evt);
  };


  useEffect(() => {
    initSearch()
      .then((action) => getTickets(action.payload.searchId));
  }, []);

  return (
    <div className="app">
      <div className="app__container">
        <header className="app__header">
          <img src={logo} alt="aviasales" className="app__logo" />
        </header>

        <main className="app__inner">
          <aside className="app__widgets">
            <Filter elements={filtersList} onChange={(evt) => handleChangeFilter(evt)} />
          </aside>
          <div className="app__content">
            <Tabs elements={tabsList} value={activeSort} onChange={(evt) => changeSorting(evt)} />
            {tickets.map((ticket, index) => (
              <Ticket data={ticket} key={index} />
            ))}
          </div>
        </main>
        <Notification active={searchIsFailed} color="error">
          Возникла ошибка при поиске. Пожалуйста, попробуйте еще раз.
        </Notification>
      </div>
    </div>
  );
}


const filterTickets = (state) => {
  const tickets = [...state.tickets];
  const segments = [...state.segments];

  let filters = state.filtersList.filter(filter => filter.value);
  if (filters.length === 0 || filters.length === state.filtersList.length) {
    return tickets;
  }

  filters = filters.map(item => item.id);

  return tickets.filter((ticket, index) => {
    const there = filters.some(filter => segments[index][0] === filter);
    if (!there) return false;

    return filters.some(filter => segments[index][1] === filter);
  });
};

const ticketsGetter = (state) => {
  const tickets = filterTickets(state);

  return tickets
    .sort((a, b) => {
      if (state.activeSort === 1) {
        return a.price - b.price;
      }

      const aDuration = a.segments.reduce((acc, current) => { return acc + current }, 0);
      const bDuration = b.segments.reduce((acc, current) => { return acc + current }, 0);

      return aDuration - bDuration;
    }).slice(0, 5);
};

const putStateToProps = (state) => {
  return {
    searchIsFailed: state.searchFailed,
    activeSort: state.activeSort,
    filtersList: state.filtersList,
    tabsList: state.tabsList,
    tickets: ticketsGetter(state),
  }
};

const putActionsToProps = (dispatch) => {
  return {
    changeSorting: bindActionCreators(changeSorting, dispatch),
    changeFilter: bindActionCreators(changeFilter, dispatch),
    initSearch: bindActionCreators(initSearch, dispatch),
    getTickets: bindActionCreators(getTickets, dispatch),
  }
};

export default connect(putStateToProps, putActionsToProps)(App);
