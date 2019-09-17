import React from 'react';
import PropTypes from "prop-types";
import ClassNames from "classnames";

import './Tabs.css';

function Tabs(props) {
  const handleClick = (evt, id) => {
    evt.preventDefault();

    props.onChange(id);
  };

  return (
    <div className="tabs">
      {props.elements.map(elem => {
        const classNames = ClassNames({
          'tabs__control': true,
          'tabs__control_is-active': elem.id === props.value,
        });

        return (
          <button className={classNames} onClick={(evt) => handleClick(evt, elem.id)} key={elem.id}>
            {elem.label}
          </button>
        )
      })}
    </div>
  );
}

Tabs.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })
  ),
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default Tabs;