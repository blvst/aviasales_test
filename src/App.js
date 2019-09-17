import React, { useEffect } from 'react';
import logo from './logo.svg';
import Filter from './components/Filter/Filter';
import Tabs from './components/Tabs/Tabs';
import Ticket from './components/Ticket/Ticket';
import Notification from './components/Notification/Notification';

import './variables.css';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeFilter } from './actions/filters';
import { changeSorting } from './actions/sort';
import { initSearch, getTickets } from './actions/search';
import { sortedFilteredTickets } from './selectors/Tickets';

function App(props) {
  const {
    searchIsFailed,
    tickets,
    activeSort,
    tabsList,
    filtersList,

    initSearch,
    getTickets,
    changeSorting,
    changeFilter,
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

const mapStateToProps = (state) => {
  return {
    searchIsFailed: state.searchFailed,
    activeSort: state.activeSort,
    filtersList: state.filtersList,
    tabsList: state.tabsList,
    tickets: sortedFilteredTickets(state),
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    changeSorting: bindActionCreators(changeSorting, dispatch),
    changeFilter: bindActionCreators(changeFilter, dispatch),
    initSearch: bindActionCreators(initSearch, dispatch),
    getTickets: bindActionCreators(getTickets, dispatch),
  }
};

export default connect(mapStateToProps, mapActionsToProps)(App);
