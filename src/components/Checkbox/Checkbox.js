import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.css';

function Checkbox(props) {
  return (
    <label className="checkbox">
      <input
        name={props.id}
        type="checkbox"
        checked={props.value}
        className="checkbox__field"
        onChange={(evt) => props.onChange({
          id: props.id,
          value: evt.target.checked,
        })}
      />
      <i className="checkbox__view" />
      <span className="checkbox__label">
        {props.children}
      </span>
    </label>
  );
}

Checkbox.propTypes = {
  id: PropTypes.number,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

function isPropsUpdated(prevProps, nextProps) {
  return prevProps.value === nextProps.value;
}

export default React.memo(Checkbox, isPropsUpdated);
