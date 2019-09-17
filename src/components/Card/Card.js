import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

function Card(props) {
  return (
    <div className="card">
      {props.children}
    </div>
  );
}

Card.ptopTypes = {
  children: PropTypes.node,
};

export default Card;