import React from 'react';
import Card from '../Card/Card';
import TicketFlyingTime from './TicketFlyingTime';
import TicketFlyingRange from './TicketTimeRange';

import './Ticket.css';

function Ticket(props) {
  const getCounterEnding = (number) => {
    let result = '';
    if (number % 10 === 0 || number % 10 > 4) {
      result = 'пересадок';
    } else if(number % 10 === 1) {
      result = 'пересадка';
    } else {
      result = 'пересадки';
    }

    return result;
  };

  const imgPath = `//pics.avs.io/99/36/${props.data.carrier}.png`;

  return (
    <Card>
      <div className="ticket">
        <div className="ticket__header">
          <strong className="ticket__price">
            {props.data.price} Р
          </strong>
          <img src={imgPath} className="ticket__carrier" alt=""/>
        </div>

        <div className="ticket__body">
          {props.data.segments.map((segment, index) => (
            <React.Fragment key={index}>
              <div className="ticket-cell">
                <span className="ticket-cell__title">
                  {segment.origin} – {segment.destination}
                </span>
                <span className="ticket-cell__content">
                  <TicketFlyingRange date={segment.date} duration={segment.duration} />
                </span>
              </div>
              <div className="ticket-cell">
                <span className="ticket-cell__title">
                  В пути
                </span>
                <span className="ticket-cell__content">
                  <TicketFlyingTime duration={segment.duration} />
                </span>
              </div>
              <div className="ticket-cell">
                <span className="ticket-cell__title">
                  {segment.stops.length || 'без'} {getCounterEnding(segment.stops.length)}
                </span>
                <span className="ticket-cell__content">
                  {segment.stops.join(', ')}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Card>
  );
}

Ticket.propTypes = {
};

export default Ticket;