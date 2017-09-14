import { matches, strategies } from '../src';

describe('search.matches', function () {
  it('matches infix by default', function () {
    const query = 'oba';
    const result = matches({
      value: 'foobar',
      query
    });
    const expected = [
      {
        startIndex: 2,
        length: query.length
      }
    ];

    expect(result).toEqual(expected);
  });

  it('matches arrays', function () {
    const query = 'oba';
    const result = matches({
      value: ['my', 'foobar'],
      query
    });
    const expected = [
      [],
      [{
        startIndex: 2,
        length: query.length
      }]
    ];

    expect(result).toEqual(expected);
  });

  it('matches case-insensitively by default', function () {
    const query = 'foo';
    const result = matches({
      value: 'FOOBAR',
      query
    });
    const expected = [
      {
        startIndex: 0,
        length: query.length
      }
    ];

    expect(result).toEqual(expected);
  });

  it('allows changing strategy', function () {
    const query = 'foo';
    const result = matches({
      value: 'foobar',
      query,
      strategy: strategies.prefix
    });
    const expected = [
      {
        startIndex: 0,
        length: query.length
      }
    ];

    expect(result).toEqual(expected);
  });

  it('allows changing transform', function () {
    const query = 'foo';
    const result = matches({
      value: 'FOOBAR',
      query,
      transform: a => a
    });
    const expected = [];

    expect(result).toEqual(expected);
  });

  it('does not crash without parameters', function () {
    const result = matches();

    expect(result).toEqual({});
  });

  it('does not crash with undefined value', function () {
    const result = matches({
      value: undefined,
      query: 'foo'
    });

    expect(result).toEqual([]);
  });
});
