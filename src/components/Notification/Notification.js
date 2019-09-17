import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './Notification.css';

function Notification(props) {
  const classNames = ClassNames({
    notification: true,
    notification__error: props.color === 'error',
    'notification__is-active': props.active === true,
  });


  return (
    <div className={classNames}>
      {props.children}
    </div>
  );
}

Notification.ptopTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  active: PropTypes.bool,
};

export default Notification;