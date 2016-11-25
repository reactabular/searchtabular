import React from 'react';
import SearchOptions from './options';

const Field = ({
  query,
  column = 'all',
  columns,
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

  return (
    <div {...props}>
      <SearchOptions
        value={column}
        onChange={onOptionsChange}
        columns={columns}
        i18n={i18n}
      />
      {columns.length ?
        <input type="input" onChange={onQueryChange} value={query[column] || ''} /> :
        null
      }
    </div>
  );
};
Field.propTypes = {
  column: React.PropTypes.string,
  columns: React.PropTypes.array,
  query: React.PropTypes.object,
  i18n: React.PropTypes.shape({
    all: React.PropTypes.string
  }),
  onChange: React.PropTypes.func,
  onColumnChange: React.PropTypes.func
};
Field.defaultProps = {
  columns: [],
  query: {},
  i18n: {
    all: 'All'
  },
  onChange: () => {},
  onColumnChange: () => {}
};

export default Field;
