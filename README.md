# optimal-date-range

Returns periods of time in target time range

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

You can restrict maximal granularity and define custom date formats in the next way:

```js

let getRanges = require("optimal-date-range");

return getRange("2018-01-01", "2019-12-15", { formats: {day: "DD/MM/YY"}, maxGranularity: 'quarter' });

/*
Returns object

{ quarter:
   [ '2018-01-01T00:00:00+02:00',
     '2018-04-01T00:00:00+03:00',
     '2018-07-01T00:00:00+03:00',
     '2018-10-01T00:00:00+03:00',
     '2019-01-01T00:00:00+02:00',
     '2019-04-01T00:00:00+03:00',
     '2019-07-01T00:00:00+03:00' ],
  month: [ '2019-10-01T00:00:00+03:00', '2019-11-01T00:00:00+02:00' ],
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
