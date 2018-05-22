/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { highlightValue } from '../src';

describe('search.highlightValue', function () {
  it('does not highlight if there is no match at all', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightValue(value, [])
      )
    );
    const searchResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'search-result'
    );

    expect(searchResult.children[0].innerHTML).toEqual(value);
  });

  it('highlights matching portion', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightValue(value, [{ startIndex: 0, length: 2 }])
      )
    );
    const highlightResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightResult.innerHTML).toEqual(value.slice(0, 2));
  });

  it('highlights from the middle', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightValue(value, [{ startIndex: 2, length: 4 }])
      )
    );
    const highlightResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightResult.innerHTML).toEqual(value.slice(2));
  });

  it('highlights whole if there is a full match', function () {
    const value = 'foobar';
    const classNames = {
      searchResult: 'foo',
      highlight: 'bar'
    };
    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightValue(value, [{ startIndex: 0, length: value.length }], classNames)
      )
    );
    const highlightResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightResult.innerHTML).toEqual(value);
  });

  it('does not crash without highlights', function () {
    const value = 'foobar';
    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightValue(value)
      )
    );
    const resultElement = TestUtils.findRenderedDOMComponentWithTag(
      result, 'span'
    );

    expect(resultElement.innerHTML).toEqual(value);
  });

  it('highlights part of an array', function () {
    const value = ['my', 'foobar', 'value'];
    const highlights = [
      [],
      [{ startIndex: 1, length: 3 }],
      []
    ];

    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightValue(value, highlights)
      )
    );

    const highlightResult = TestUtils.findRenderedDOMComponentWithClass(
      result, 'highlight'
    );

    expect(highlightResult.innerHTML).toEqual('oob');
  });

  it('highlights with an array but no result', function () {
    const value = ['my', 'foobar', 'value'];
    const highlights = [
      [],
      [],
      []
    ];

    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightValue(value, highlights)
      )
    );

    const highlightResult = TestUtils.scryRenderedDOMComponentsWithClass(
      result, 'highlight'
    );

    expect(highlightResult.length).toEqual(0);
  });

  it('highlights part of an array', function () {
    const value = ['mobay', 'foobar', 'valobaue'];
    const highlights = [
      [{ startIndex: 1, length: 3 }],
      [{ startIndex: 2, length: 3 }],
      [{ startIndex: 3, length: 3 }]
    ];

    const result = TestUtils.renderIntoDocument(
      React.createElement(
        Wrapper,
        {},
        highlightValue(value, highlights)
      )
    );

    const highlightResult = TestUtils.scryRenderedDOMComponentsWithClass(
      result, 'highlight'
    );

    expect(highlightResult.length).toEqual(3);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return React.createElement('div', {}, this.props.children);
  }
}
