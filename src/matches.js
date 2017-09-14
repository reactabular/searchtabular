import { isArray } from 'lodash';
import strategies from './strategies';

const matches = ({
  value, query, strategy = strategies.infix, transform = v => v.toLowerCase()
} = {}) => {
  if (!query) {
    return {};
  }

  if (isArray(value)) {
    return value.map(v => matches({ value: v, query, strategy, transform }));
  }

  const val = value && value.toString ? value.toString() : '';

  return strategy(transform(query)).matches(transform(val));
};

export default matches;
