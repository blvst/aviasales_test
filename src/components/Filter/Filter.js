import React from 'react';
import Card from '../Card/Card';
import FilterList from './FilterList';

import FilterPropTypes from './FilterPropTypes'

import './Filter.css';

function Filter(props) {
  return (
    <Card>
      <div className="filter">
        <h2 className="filter__title">
          Количество пересадок
        </h2>
        <FilterList {...props} />
      </div>
    </Card>
  );
}

Filter.propTypes = {
  ...FilterPropTypes,
};

function isPropsUpdated(prevProps, nextProps) {
  const changes = prevProps.elements
    .filter((element, index) => element.value !== nextProps.elements[index].value);

  return !changes.length;
}

export default React.memo(Filter, isPropsUpdated);
