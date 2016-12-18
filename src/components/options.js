import React from 'react';

const Options = ({
  columns,
  i18n,
  onChange = () => {},
  components,
  value,
  ...props
}) => (
  columns.length ? <select onChange={onChange} value={value} {...props}>{
    getOptions(columns, i18n).map(({ name, value }) => // eslint-disable-line no-shadow, max-len
      <option key={`${value}-option`} value={value}>{name}</option>
    )
  }</select> : null
);
Options.propTypes = {
  columns: React.PropTypes.array,
  components: React.PropTypes.object,
  i18n: React.PropTypes.object,
  onChange: React.PropTypes.func,
  value: React.PropTypes.any
};

const getOptions = (columns, i18n) => (
  (columns.length > 1 ? [{
    value: 'all',
    name: i18n.all
  }] : []).concat(columns.map((column) => {
    if (
      (column.property) &&
      (column.header && column.header.label)
    ) {
      return {
        value: column.property,
        name: column.header.label
      };
    }

    return null;
  }).filter(column => column))
);

export default Options;
