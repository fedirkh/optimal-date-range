# optimal-date-range

Returns periods of time in target date range.

You can simply count time between 2 dates in human acceptable format.

## Example

```js
let getRange = require("optimal-date-range");

return getRange("2018-01-01", "2019-12-15");

/*
Returns object

{ year: [ '2018' ],
  quarter: [ '2019-1st', '2019-2nd', '2019-3rd' ],
  month: [ '2019-10', '2019-11' ],
  day:
   [ '2019-12-01',
     '2019-12-02',
     '2019-12-03',
     '2019-12-04',
     '2019-12-05',
     '2019-12-06',
     '2019-12-07',
     '2019-12-08',
     '2019-12-09',
     '2019-12-10',
     '2019-12-11',
     '2019-12-12',
     '2019-12-13',
     '2019-12-14',
     '2019-12-15' ] }
*/
```

You can restrict year/month/quarter granularity and define custom date formats in the next way:

```js

let getRanges = require("optimal-date-range");

return getRange(
    "2018-01-01",
     "2019-12-15",
    { formats: {day: "DD/MM/YY"}, restrictedGranularity: {quarter: true} }
);

/*
Returns object

{ year: [ '2018' ],
  month:
   [ '2019-01',
     '2019-02',
     '2019-03',
     '2019-04',
     '2019-05',
     '2019-06',
     '2019-07',
     '2019-08',
     '2019-09',
     '2019-10',
     '2019-11' ],
  day:
   [ '01/12/19',
     '02/12/19',
     '03/12/19',
     '04/12/19',
     '05/12/19',
     '06/12/19',
     '07/12/19',
     '08/12/19',
     '09/12/19',
     '10/12/19',
     '11/12/19',
     '12/12/19',
     '13/12/19',
     '14/12/19',
     '15/12/19' ] }
*/
```
You can get range only in specific granularity by restricting all others.

```js

let getRanges = require("optimal-date-range");

let dateFrom = "2003-01-01";
let dateTo = "2019-05-07";

return getRanges(dateFrom, dateTo, {restrictedGranularity: {month: true, day: true, quarter: true}});

/*
Returns object

{
    year: ["2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
     "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]
}
*/
```
In this case, as you can see, 2019 year included as well, because there's dates in this year.