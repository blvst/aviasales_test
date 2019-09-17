import React from 'react';
import FilterPropTypes from './FilterPropTypes';
import Checkbox from '../Checkbox/Checkbox';

function FilterList(props) {
  const handleClick = (evt, elem) => {
    evt.preventDefault();

    props.onChange({
      id: elem.id,
      value: !elem.value,
    })
  };

  return (
    <div className="filter-list">
      {props.elements.map((elem) => (
        <div className="filter-list__item" key={elem.id} onClick={(evt) => handleClick(evt, elem)}>
          <Checkbox value={elem.value} id={elem.id} onChange={(evt) => props.onChange(evt)}>
            {elem.label}
          </Checkbox>
        </div>
      ))}
    </div>
  );
}

FilterList.propTypes = {
  ...FilterPropTypes,
};

export default FilterList;