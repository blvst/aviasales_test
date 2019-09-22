import React from 'react';
import Ticket from '../Ticket/Ticket';
import TicketPropTypes from '../Ticket/TicketPropTypes';
import PropTypes from 'prop-types';

function TicketList(props) {
  return props.tickets.map((ticket, index) => (
    <Ticket data={ticket} key={index} />
  ));
}

TicketList.propTypes = {
  tickets: PropTypes.arrayOf(TicketPropTypes)
};

export default TicketList;

