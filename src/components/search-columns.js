import React from 'react';
import PropTypes from 'prop-types';

const SearchColumns = ({ columns, query, onChange, classNames }) => {
  const onQueryChange = (event) => {
    onChange({
      ...query,
      [event.target.name]: event.target.value
    });
  };

  return (
    <tr>
      {columns.map((column, i) => (
        <th key={`${column.property || i}-column-filter`} className={classNames.filter}>
          {(column && column.property) && (!('filterable' in column) || column.filterable) ?
            <input
              onChange={onQueryChange}
              className={classNames.filterInput}
              name={column.property}
              placeholder={column.filterPlaceholder || ''}
              value={query[column.property] || ''}
            />
          : ''}
        </th>
      ))}
    </tr>
  );
};
SearchColumns.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  classNames: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  query: PropTypes.object
};

SearchColumns.defaultProps = {
  query: {},
  classNames: {
    filter: 'column-filter',
    filterInput: 'column-filter-input'
  }


};

export default SearchColumns;
