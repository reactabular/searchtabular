import { strategies } from '../src';

const { infix, prefix } = strategies;

describe('search.strategies.infix', function () {
  it('matches correctly', function () {
    const queryTerm = 'light';
    const text = 'enlighten';

    const predicate = infix(queryTerm);
    const expected = [
      {
        startIndex: 2,
        length: queryTerm.length
      }
    ];

    expect(predicate.evaluate(text)).toEqual(true);
    expect(predicate.matches(text)).toEqual(expected);
  });

  it('matches multiple correctly', function () {
    const queryTerm = 'oub';
    const text = 'double trouble';

    const predicate = infix(queryTerm);
    const expected = [
      {
        startIndex: 1,
        length: queryTerm.length
      },
      {
        startIndex: 9,
        length: queryTerm.length
      }
    ];

    expect(predicate.evaluate(text)).toEqual(true);
    expect(predicate.matches(text)).toEqual(expected);
  });

  it('matches arrays correctly', function () {
    const queryTerm = 'bl';
    const text = ['black', 'red', 'able'];

    const predicate = infix(queryTerm);
    const expected = [ // eslint-disable-line no-sparse-arrays
      [{
        startIndex: 0,
        length: queryTerm.length
      }],,
      [{
        startIndex: 1,
        length: queryTerm.length
      }]
    ];

    expect(predicate.evaluate(text)).toEqual(true);
    expect(predicate.matches(text)).toEqual(expected);
  });

  it('matches nested arrays correctly', function () {
    const queryTerm = 'bl';
    const text = ['orange', 'black', ['red', ['no', 'blabla', 'no']], 'able'];

    const predicate = infix(queryTerm);
    const expected = [
      undefined,
      [{
        startIndex: 0,
        length: queryTerm.length
      }],
      [
        undefined,
        [
          undefined,
          [
            {
              startIndex: 0,
              length: queryTerm.length
            },
            {
              startIndex: 3,
              length: queryTerm.length
            }
          ],
          undefined
        ]
      ],
      [{
        startIndex: 1,
        length: queryTerm.length
      }]
    ];

    expect(predicate.evaluate(text)).toEqual(true);
    expect(predicate.matches(text)).toEqual(expected);
  });

  it('does not match', function () {
    const queryTerm = 'light';
    const text = 'dark';

    const predicate = infix(queryTerm);

    expect(predicate.evaluate(text)).toEqual(false);
    expect(predicate.matches(text)).toEqual([]);
  });
});

describe('search.strategies.prefix', function () {
  it('matches correctly', function () {
    const queryTerm = 'lay';
    const text = 'layout';

    const predicate = prefix(queryTerm);
    const expected = [{
      startIndex: 0,
      length: queryTerm.length
    }];

    expect(predicate.evaluate(text)).toEqual(true);
    expect(predicate.matches(text)).toEqual(expected);
  });

  it('matches arrays correctly', function () {
    const queryTerm = 'bl';
    const text = ['black', 'red', 'able'];

    const predicate = prefix(queryTerm);
    const expected = [
      [{
        startIndex: 0,
        length: queryTerm.length
      }],
      undefined,
      undefined
    ];

    expect(predicate.evaluate(text)).toEqual(true);
    expect(predicate.matches(text)).toEqual(expected);
  });

  it('matches nested arrays correctly', function () {
    const queryTerm = 'bl';
    const text = ['orange', 'black', ['red', ['no', 'blabla', 'no']], 'able'];

    const predicate = prefix(queryTerm);
    const expected = [
      undefined,
      [{
        startIndex: 0,
        length: queryTerm.length
      }],
      [
        undefined,
        [
          undefined,
          [{
            startIndex: 0,
            length: queryTerm.length
          }],
          undefined
        ]
      ],
      undefined
    ];

    expect(predicate.evaluate(text)).toEqual(true);
    expect(predicate.matches(text)).toEqual(expected);
  });

  it('does not match', function () {
    const queryTerm = 'lay';
    const text = 'outlay';

    const predicate = prefix(queryTerm);

    expect(predicate.evaluate(text)).toEqual(false);
    expect(predicate.matches(text)).toEqual([]);
  });
});
