"use strict";

let moment = require("moment");
let getPeriods = require("../index.js");

describe("get periods", function () {
    it("should return expected periods with max granularity = year", function (done) {
        let dateFrom = "2017-05-21";
        let dateTo = "2019-06-13";

        let expectedData = {
            day: [
                '2017-05-21',
                    '2017-05-22',
                    '2017-05-23',
                    '2017-05-24',
                    '2017-05-25',
                    '2017-05-26',
                    '2017-05-27',
                    '2017-05-28',
                    '2017-05-29',
                    '2017-05-30',
                    '2017-05-31',
                    '2019-06-01',
                    '2019-06-02',
                    '2019-06-03',
                    '2019-06-04',
                    '2019-06-05',
                    '2019-06-06',
                    '2019-06-07',
                    '2019-06-08',
                    '2019-06-09',
                    '2019-06-10',
                    '2019-06-11',
                    '2019-06-12',
                    '2019-06-13'
                ],
            month: [ '2017-06', '2019-04', '2019-05' ],
            quarter: [ '2017-3rd', '2017-4th', '2019-1st' ],
            year: [ '2018' ]
        };

        getPeriods(dateFrom, dateTo).should.be.eql(expectedData);
        done();
    });
    it("should return expected periods with max granularity = quarter and formated day", function (done) {
        let dateFrom = "2017-05-21";
        let dateTo = moment("2019-06-13");

        let expectedData = {
            day: [
                '2017-05-21',
                    '2017-05-22',
                    '2017-05-23',
                    '2017-05-24',
                    '2017-05-25',
                    '2017-05-26',
                    '2017-05-27',
                    '2017-05-28',
                    '2017-05-29',
                    '2017-05-30',
                    '2017-05-31',
                    '2019-06-01',
                    '2019-06-02',
                    '2019-06-03',
                    '2019-06-04',
                    '2019-06-05',
                    '2019-06-06',
                    '2019-06-07',
                    '2019-06-08',
                    '2019-06-09',
                    '2019-06-10',
                    '2019-06-11',
                    '2019-06-12',
                    '2019-06-13'
                ],
            month: [ '2017-06', '2019-04', '2019-05' ],
            quarter: [
                '2017-3rd',
                    '2017-4th',
                    '2018-1st',
                    '2018-2nd',
                    '2018-3rd',
                    '2018-4th',
                    '2019-1st'
                ]
        };

        getPeriods(dateFrom, dateTo, {maxGranularity: "quarter", format: { day: "dd/MM/YY" }}).should.be.eql(expectedData);
        done();
    });
});
