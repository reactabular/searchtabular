/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { highlightCell } from '../src';

describe('search.highlightCell', function () {
  it('digs data from _highlights of the row', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightCell(value, {
          rowData: {
            _highlights: {
              demo: [{ startIndex: 0, length: value.length }]
            }

          },
          property: 'demo',
          _classNames: {
            searchResult: 'foo',
            highlight: 'bar'
          }
        })
      )
    );
    const highlightedResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightedResult.innerHTML).toEqual(value);
  });

  it('digs data from _highlights of the row with arrays', function () {
    const value = ['my', 'foobar', 'value'];
    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightCell(value, {
          rowData: {
            _highlights: {
              demo: [
                [],
                [{ startIndex: 2, length: 3 }],
                []
              ]
            }
          },
          property: 'demo'
        })
      )
    );
    const highlightedResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightedResult.innerHTML).toEqual('oba');
  });

  it('does not crash if only value is provided', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightCell(value)
      )
    );
    const resultElement = TestUtils.findRenderedDOMComponentWithTag(
      result, 'span'
    );

    expect(resultElement.innerHTML).toEqual(value);
  });

  it('does not crash without _highlights', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightCell(value, { rowData: {} })
      )
    );
    const resultElement = TestUtils.findRenderedDOMComponentWithTag(
      result, 'span'
    );

    expect(resultElement.innerHTML).toEqual(value);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return React.createElement('div', {}, this.props.children);
  }
}
