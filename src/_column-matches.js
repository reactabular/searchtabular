import { isArray } from 'lodash';
import strategies from './strategies';

const defaultTransform = (v = '') => (isArray(v)
        ? v.map(v2 => defaultTransform(v2))
        : v && v.toLowerCase && v.toLowerCase();
const defaultCastingStrategy = v => (isArray(v) ? v : String(v));

const _columnMatches = ({
  query,
  castingStrategy = defaultCastingStrategy,
  column = {},
  row,
  strategy = strategies.infix,
  transform = defaultTransform
}) => {
  const property = column.property;
  if (!property) {
    return false;
  }
  const value = row[`_${property}`] || row[property];
  if (value == null) {
    return false;
  }
  // Pick resolved value by convention
  const resolvedValue = castingStrategy(value, column);

  return strategy(transform(query)).evaluate(transform(resolvedValue));
};

export default _columnMatches;
