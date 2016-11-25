[![build status](https://secure.travis-ci.org/reactabular/searchtabular.svg)](http://travis-ci.org/reactabular/searchtabular) [![bitHound Score](https://www.bithound.io/github/reactabular/searchtabular/badges/score.svg)](https://www.bithound.io/github/reactabular/searchtabular) [![codecov](https://codecov.io/gh/reactabular/searchtabular/branch/master/graph/badge.svg)](https://codecov.io/gh/reactabular/searchtabular)

# Searchtabular - Search utilities

Searchtabular comes with search helpers. It consists of search algorithms that can be applied to the rows. Just like with sorting, you have to apply it to the rows just before rendering. A column is considered searchable in case it has a unique `property` defined.

## How to Use?

The general workflow goes as follows:

1. Set up a `Search` control that outputs a query in `{<column>: <query>}` format. If `<column>` is `all`, then the search will work against all columns. Otherwise it will respect the exact columns set. You'll most likely want to use either `reactabular-search-field` or `reactabular-search-columns` (or both) for this purpose or provide an implementation of your own if you are not using Reactabular.
2. Before rendering the rows, perform `search.multipleColumns({ columns, query })(rows)`. This will filter the rows based on the passed `rows`, `columns` definition, and `query`. A lazy way to do this is to filter at `render()` although you can do it elsewhere too to optimize rendering.
3. Pass the filtered rows to `Table`.

## API

The search API consists of three parts. Out of these `search.multipleColumns` and `search.matches` are the most useful ones for normal usage. If the default search strategies aren't enough, it's possible to implement more as long as you follow the same interface.

### Search

**`search.multipleColumns({ castingStrategy: <castingStrategy>, columns: [<object>], query: {<column>: <query>}, strategy: <strategy>, transform: <transform> })([<rows to query>]) => [<filtered rows>]`**

This is the highest level search function available. It expects `rows` and `columns` in the same format the `Table` uses. `query` object describes column specific search queries.

It uses `infix` strategy underneath although it is possible to change it. By default it matches in a case **insensitive** manner. If you want case sensitive behavior, pass `a => a`(identity function) as `transform`.

It will cast everything but arrays to a string by default. If you want a custom casting behavior, pass a custom function to `castingStrategy`.

**`search.singleColumn({ castingStrategy: <castingStrategy>, columns: [<object>], searchColumn: <string>, query: <string>, strategy: <strategy>, transform: <transform> })([<rows to query>]) => [<filtered rows>]`**

This is a more specialized version of `search.multipleColumns`. You can use it to search a specific column through `searchColumn` and `query`.

### Matchers

**`search._columnMatches({ query: <string>, castingStrategy: <castingStrategy>, column: <object>, row: <object>, strategy: <strategy>, transform: <transform> }) => <boolean>`**

This is a function that can be used to figure out all column specific matches. It is meant only for **internal usage** of the library.

When dealing with strings:

**`search.matches({ value: <string>, query: <string>, strategy: <strategy>, transform: <transform> }) => [{ startIndex: <number>, length: <number> }]`**

Returns an array with the matches.

When dealing with arrays:

**`search.matches({ value: <string>, query: [<string|[...]>], strategy: <strategy>, transform: <transform> }) => [[{ startIndex: <number>, length: <number> }], ...]`**

Returns a sparse array with the same shape as the original query. If there was a match for an item, it will have the same shape as the string version above, otherwise the array will have a hole in that location.

This function returns matches against the given value and query. This is particularly useful with highlighting.

### Strategies

**`search.strategies.infix(queryTerm: <string>) => { evaluate(searchText: <string>) => <string>, matches(searchText) => [{ startIndex: <number>, length: <number> }]`**

Search uses `infix` strategy by default. This means it will match even if the result is in the middle of a `searchText`.

The strategies operate in two passes - evaluation and matching. The evaluation pass allows us to implement perform fast boolean check on whether or not a search will match. Matching gives exact results.

**`search.strategies.prefix(queryTerm: <string>) => { evaluate(searchText: <string>) => <string>, matches(searchText) => [{ startIndex: <number>, length: <number> }]`**

`prefix` strategy matches from the start.

## Highlighting Search Results

To make it possible to highlight search results per column, there's a specific `highlightCell` formatter.

## How to Use?

To use it, you'll first you have to annotate your rows using `highlighter`. It attaches a structure like this there:

```javascript
_highlights: {
  demo: [{ startIndex: 0, length: 4 }]
}
```

**Example:**

```jsx
/*
import React from 'react';
import { compose } from 'redux';
import {
  Table, Search, resolve
} from 'reactabular';
import * as search from 'searchtabular';
*/

class HighlightTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchColumn: 'all',
      query: {},
      columns: [
        {
          header: {
            label: 'Name'
          },
          children: [
            {
              property: 'name.first',
              header: {
                label: 'First Name'
              },
              cell: {
                formatters: [search.highlightCell]
              }
            },
            {
              property: 'name.last',
              header: {
                label: 'Last Name'
              },
              cell: {
                formatters: [search.highlightCell]
              }
            }
          ]
        },
        {
          property: 'age',
          header: {
            label: 'Age'
          },
          cell: {
            formatters: [search.highlightCell]
          }
        }
      ],
      rows: [
        {
          id: 100,
          name: {
            first: 'Adam',
            last: 'West'
          },
          age: 10
        },
        {
          id: 101,
          name: {
            first: 'Brian',
            last: 'Eno'
          },
          age: 43
        },
        {
          id: 103,
          name: {
            first: 'Jake',
            last: 'Dalton'
          },
          age: 33
        },
        {
          id: 104,
          name: {
            first: 'Jill',
            last: 'Jackson'
          },
          age: 63
        }
      ]
    };
  }
  render() {
    const { searchColumn, columns, rows, query } = this.state;
    const resolvedColumns = resolve.columnChildren({ columns });
    const resolvedRows = resolve.resolve({
      columns: resolvedColumns,
      method: resolve.nested
    })(rows);
    const searchedRows = compose(
      search.highlighter({
        columns: resolvedColumns,
        matches: search.matches,
        query
      }),
      search.multipleColumns({
        columns: resolvedColumns,
        query
      }),
    )(resolvedRows);

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            column={searchColumn}
            query={query}
            columns={resolvedColumns}
            rows={resolvedRows}
            onColumnChange={searchColumn => this.setState({ searchColumn })}
            onChange={query => this.setState({ query })}
          />
        </div>
        <Table.Provider columns={resolvedColumns}>
          <Table.Header
            headerRows={resolve.headerRows({ columns })}
          />

          <Table.Body rows={searchedRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

<HighlightTable />
```

## Components

`searchtabular` provides a couple of convenience components listed below.

### Searching Columns

`searchtabular.Columns` is a single component you can inject within a table header to allow searching per column. It expects `columns` and `onChange` handler. The latter is used to update the search query based on the search protocol.

## How to Use?

Consider the example below.

**Example:**

```jsx
/*
import React from 'react';
import { Table, resolve } from 'reactabular';
import * as search from 'searchtabular';
*/

class SearchColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {}, // Search query
      columns: [
        {
          header: {
            label: 'Name'
          },
          children: [
            {
              property: 'name.first',
              header: {
                label: 'First Name'
              }
            },
            {
              property: 'name.last',
              header: {
                label: 'Last Name'
              }
            }
          ]
        },
        {
          property: 'age',
          header: {
            label: 'Age'
          }
        }
      ],
      rows: [
        {
          id: 100,
          name: {
            first: 'Adam',
            last: 'West'
          },
          age: 10
        },
        {
          id: 101,
          name: {
            first: 'Brian',
            last: 'Eno'
          },
          age: 43
        },
        {
          id: 103,
          name: {
            first: 'Jake',
            last: 'Dalton'
          },
          age: 33
        },
        {
          id: 104,
          name: {
            first: 'Jill',
            last: 'Jackson'
          },
          age: 63
        }
      ]
    };
  }
  render() {
    const { columns, query, rows } = this.state;
    const resolvedColumns = resolve.columnChildren({ columns });
    const resolvedRows = resolve.resolve({
      columns: resolvedColumns,
      method: resolve.nested
    })(rows);
    const searchedRows = search.multipleColumns({
      columns: resolvedColumns,
      query
    })(resolvedRows);

    return (
      <Table.Provider columns={resolvedColumns}>
        <Table.Header
          headerRows={resolve.headerRows({ columns })}
        >
          <search.Columns
            query={query}
            columns={resolvedColumns}
            onChange={query => this.setState({ query })}
          />
        </Table.Header>

        <Table.Body rows={searchedRows} rowKey="id" />
      </Table.Provider>
    );
  }
}

<SearchColumnsTable />
```

## License

MIT. See LICENSE for details.
