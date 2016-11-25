## searchtabular

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
