import React from 'react';
import PropTypes from 'prop-types';

function TicketFlyingTime(props) {
  const days = Math.floor(props.duration / 60 / 24);
  const hours = Math.floor(props.duration / 60) - days * 24;
  const minutes = props.duration % 60;

  return (
    <span>
      {days > 0 ? `${days}д ` : ''}
      {`${hours}ч `}
      {`${minutes}м`}
    </span>
  );
}

TicketFlyingTime.propTypes = {
  duration: PropTypes.number,
};

export default TicketFlyingTime;