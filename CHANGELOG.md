1.9.0 / 2018-05-22
==================

  * Feature  - Extract class names from highlightCell, searchColumns. #17

1.8.0 / 2018-04-19
==================

  * Feature - Allow disabling specific search columns by setting `filterable: false` at a column. #16

1.7.0 / 2017-10-02
==================

  * Chore - Support React 16. #15

1.6.0 / 2017-09-14
==================

  * Fix - Handle arrays correctly within the highlight formatters. #14

1.5.1 / 2017-06-03
==================

  * Chore - Mention *searchtabular-antd*.

1.5.0 / 2017-05-03
==================

  * Refactor - React 15.5 upgrades, fixed deprecations, Jest upgrade. #11

1.4.0 / 2017-02-21
==================

  * Feature - Allow searching against arrays. #10

1.3.3 / 2017-02-18
==================

  * Bug fix - Add a guard against `undefined` value at `highlightCell`. #8

1.3.2 / 2016-12-20
==================

  * Docs - Use `input` over `textfield` at the readme example.

1.3.1 / 2016-12-20
==================

  * Docs - Tune Reactabular example so that it actually runs.

1.3.0 / 2016-12-20
==================

  * Feature - Allow `Field` component customization. #1
  * Feature - Pass `column` to `castingStrategy` as its second parameter. #2

1.2.0 / 2016-11-25
==================

  * Feature - Integrate `reactabular-search-columns`. See README for an example.
  * Feature - Integrate `reactabular-search-field`. See README for an example.

1.1.0 / 2016-11-25
==================

  * Feature - Integrate highlighting functionality from `reactabular-highlight`. See README for the exact API.

1.0.0 / 2016-11-25
==================

  * Initial re-release under a different name.

---

## reactabular-search

6.1.1 / 2016-10-27
==================

  * Bug fix - Return `false` if `property` is not defined. #228

6.0.0 / 2016-10-14
==================

  * Breaking - `search.multipleColumns` and `search.singleColumn` now accept a `castingStrategy` parameter to define how to cast properties when searching. By default, everything by arrays is cast to a string.
  * Feature - `search.matches` now traverses arrays and returns results in the same shape.

1.0.0 / 2016-07-25
==================

  * Initial release.
