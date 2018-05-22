/* eslint-disable react/prop-types */
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Field } from '../src';

describe('search.Field', function () {
  it('does not have all option with a single column', function () {
    const columns = [
      {
        property: 'first',
        header: {
          label: 'First'
        }
      }
    ];

    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Field columns={columns} />
      </Wrapper>
    );

    const options = TestUtils.scryRenderedDOMComponentsWithTag(
      search, 'option'
    );

    expect(options.length).toEqual(1);
    expect(options[0].value).toEqual(columns[0].property);
    expect(options[0].textContent).toEqual(columns[0].header.label);
  });

  it('has a dropdown that contains columns which have both property and header', function () {
    const columns = [
      {
        property: 'first',
        header: {
          label: 'First'
        }
      },
      {
        property: 'second'
      },
      {
        header: {
          label: 'Third'
        }
      }
    ];

    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Field columns={columns} />
      </Wrapper>
    );

    const options = TestUtils.scryRenderedDOMComponentsWithTag(
      search, 'option'
    );

    expect(options.length).toEqual(2);
    expect(options[0].value).toEqual('all');
    expect(options[1].value).toEqual(columns[0].property);
    expect(options[1].textContent).toEqual(columns[0].header.label);
  });

  it('accepts column', function () {
    const expectedColumn = 'column';
    const columns = [
      {
        property: expectedColumn,
        header: {
          label: 'First'
        }
      }
    ];

    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Field columns={columns} column={expectedColumn} />
      </Wrapper>
    );
    const select = TestUtils.findRenderedDOMComponentWithTag(
      search, 'select'
    );

    expect(select.value).toEqual(expectedColumn);
  });

  it('yields results', function () {
    const columns = [
      {
        property: 'first',
        header: 'First'
      }
    ];
    const value = 'demo';
    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Field columns={columns} />
      </Wrapper>
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(search, 'input');
    input.value = value;

    TestUtils.Simulate.change(input);
  });

  it('yields zero results', function () {
    const columns = [
      {
        property: 'first',
        header: 'First'
      }
    ];
    const value = 'demo';
    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Field columns={columns} />
      </Wrapper>
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(search, 'input');
    input.value = value + value;

    TestUtils.Simulate.change(input);
  });

  it('supports i18n', function () {
    const columns = [
      {
        property: 'first',
        header: {
          label: 'First'
        }
      },
      {
        property: 'second'
      },
      {
        header: {
          label: 'Third'
        }
      }
    ];
    const expected = 'Kaikki';
    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Field columns={columns} i18n={{ all: expected }} />
      </Wrapper>
    );
    const option = TestUtils.scryRenderedDOMComponentsWithTag(search, 'option')[0];

    expect(option.text).toEqual(expected);
  });

  it('supports custom filter input components', function () {
    const columns = [
      {
        property: 'first',
        header: {
          label: 'First'
        }
      },
      {
        property: 'second'
      },
      {
        header: {
          label: 'Third'
        }
      }
    ];
    const value = 'test value';
    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Field columns={columns} components={{ filter: CustomField }} />
      </Wrapper>
    );
    const input = TestUtils.scryRenderedDOMComponentsWithTag(search, 'textfield');
    input.value = value;

    expect(input.length).toBe(1);
    expect(input.value).toBe(value);
  });

  it('supports custom select column filtering components', function () {
    const columns = [
      {
        property: 'first',
        header: {
          label: 'First'
        }
      },
      {
        property: 'second'
      },
      {
        header: {
          label: 'Third'
        }
      }
    ];
    const search = TestUtils.renderIntoDocument(
      <Wrapper>
        <Field columns={columns} components={{ filter: CustomField, select: CustomSelect }} />
      </Wrapper>
    );
    const options = TestUtils.scryRenderedDOMComponentsWithTag(search, 'li');
    const input = TestUtils.findRenderedDOMComponentWithClass(search, 'controlled-field');
    input.value = columns[0].property;

    TestUtils.Simulate.change(input);
    expect(input.value).toBe(columns[0].property);
    expect(options.length).toEqual(2);
    expect(options[0].textContent).toBe('All');
    expect(options[1].getAttribute('data-value')).toEqual(columns[0].property);
    expect(options[1].textContent).toEqual(columns[0].header.label);
  });
});

class Wrapper extends React.Component { // eslint-disable-line max-len, react/prefer-stateless-function
  render() {
    return <div>{this.props.children}</div>;
  }
}

const CustomField = (props, classNames = {}) => <textfield className={classNames.customField || 'CustomField'} {...props} />;
const CustomSelect = ({ options, onChange, classNames = {} }) => (
  <div>
    <input className={classNames.controllField || 'controlled-field'} type="text" onChange={onChange} defaultValue="all" />
    <ul>
      { options.map(({ key, name, value }) => (
        <li key={key} data-value={value}>{name}</li>)
      ) }
    </ul>
  </div>
);
