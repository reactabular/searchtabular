import React from 'react';
import SearchOptions from './options';

const Field = ({
  query,
  column = 'all',
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
      if(!columns.length) return null;

      const {filter = {}} = components.props || {};
      return <Custom onChange={onQueryChange} value={query[column] || ''} {...filter}/>
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
  column: React.PropTypes.string,
  columns: React.PropTypes.array,
  components: React.PropTypes.object,
  query: React.PropTypes.object,
  i18n: React.PropTypes.shape({
    all: React.PropTypes.string
  }),
  onChange: React.PropTypes.func,
  onColumnChange: React.PropTypes.func
};
Field.defaultProps = {
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
