import React from 'react';
import PropTypes from 'prop-types';

const Options = ({
  columns,
  i18n,
  onChange = () => {},
  components = {
    select: null,
    props: {
      select: {}
    }
  },
  value,
  ...props
}) => {
  const componentBuilder = () => {
    if (!columns.length) {
      return null;
    }

    const opts = optionBuilder();

    return (
      components.select ?
        getCustomComponent(components.select, opts) :
        <select onChange={onChange} value={value} {...props}>{opts}</select>
    );
  };

  const getCustomComponent = (Custom, opts) => {
    const { select = {} } = components.props || {};

    return <Custom onChange={onChange} value={value} options={opts} {...props} {...select} />;
  };

  const optionBuilder = () => (
    getOptions(columns, i18n).map(({ name, value }) => // eslint-disable-line no-shadow, max-len
      (!components.select ? <option key={`${value}-option`} value={value}>{name}</option>
        : { key: `${value}-option`, value, name })
    )
  );

  return componentBuilder();
};
Options.propTypes = {
  columns: PropTypes.array,
  components: PropTypes.object,
  i18n: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.any
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
