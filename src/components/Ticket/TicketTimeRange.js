import React from 'react';
import PropTypes from 'prop-types';

function TicketTimeRange(props) {
  const startTime = new Date(props.date);
  const finishTime = new Date(props.date);

  finishTime.setTime(startTime.getTime() + props.duration * 60000);

  const formatTime = (date) => {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${hours}:${minutes}`
  };

  return (
    <span>
      {formatTime(startTime)} - {formatTime(finishTime)}
    </span>
  );
}

TicketTimeRange.propTypes = {
  duration: PropTypes.number,
  date: PropTypes.string,
};

export default TicketTimeRange;