import React from 'react';
import PropTypes from 'prop-types';
import SearchOptions from './options';

const Field = ({
  query,
  column,
  columns,
  components,
  i18n,
  onChange,
  onColumnChange,
  ...props
}) => {
  const onOptionsChange = ({ target: { value } }) => {
    onChange({
      [value]: query[value]
    });
    onColumnChange(value);
  };
  const onQueryChange = ({ target: { value } }) => (
    onChange({
      [column]: value
    })
  );
  const filterInput = (Custom = 'input') => {
    if (!columns.length) return null;

    const { filter = {} } = components.props || {};
    return <Custom onChange={onQueryChange} value={query[column] || ''} {...filter} />;
  };

  return (
    <div {...props}>
      <SearchOptions
        value={column}
        onChange={onOptionsChange}
        columns={columns}
        i18n={i18n}
        components={components}
      />
      {filterInput(components.filter || 'input')}
    </div>
  );
};
Field.propTypes = {
  column: PropTypes.string,
  columns: PropTypes.array,
  components: PropTypes.object,
  query: PropTypes.object,
  i18n: PropTypes.shape({
    all: PropTypes.string
  }),
  onChange: PropTypes.func,
  onColumnChange: PropTypes.func
};
Field.defaultProps = {
  column: 'all',
  columns: [],
  components: {
    filter: null,
    select: null,
    props: {
      filter: {},
      select: {}
    }
  },
  query: {},
  i18n: {
    all: 'All'
  },
  onChange: () => {},
  onColumnChange: () => {}
};

export default Field;
