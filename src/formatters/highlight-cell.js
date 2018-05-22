import highlightValue from './highlight-value';

const highlightCell = (
  value,
  { rowData, property } = { rowData: { _highlights: {} } },
  classNames,
) => (
  highlightValue(
    value,
    rowData._highlights && rowData._highlights[property],
    classNames
  )
);

export default highlightCell;
