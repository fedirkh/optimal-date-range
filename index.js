"use strict";

let moment = require("moment");

let config = {
    GRANULARITY:{
        DAY: "day",
        YEAR: "year",
        MONTH: "month",
        HALF_YEAR: "half_year"
    }
};

function createTimeBuckets(date){
    let d = new moment(date);
    let halfYearPart = d.quarter() < 3 ? 1 : 2;
    return {
        [config.GRANULARITY.DAY]: d.format("YYYY-MM-DD"),
        [config.GRANULARITY.MONTH]: d.format("YYYY-MM"),
        [config.GRANULARITY.HALF_YEAR]: d.format("YYYY") + `-${halfYearPart}-half-year`,
        [config.GRANULARITY.YEAR]: d.format("YYYY")
    };
}

function getTargetPeriods(dateFrom, dateTo, maxGranularity = config.GRANULARITY.YEAR) {
    let dates = {};
    let d = moment(dateFrom);
    let to = moment(dateTo);
    while (+d <= +to) {
        let increment = [1, "d"];
        let bucket = config.GRANULARITY.DAY;
        if (d.date() === 1){
            if (maxGranularity === config.GRANULARITY.YEAR && d.month() === 0 && +moment(+d).add(1, "y") < +dateTo) {
                bucket = config.GRANULARITY.YEAR;
                increment = [1, "y"];
            } else if(~[config.GRANULARITY.YEAR, config.GRANULARITY.HALF_YEAR].indexOf(maxGranularity) && (d.month() === 0 || d.month() === 6) && +moment(+d).add(6, "M") < +dateTo){
                bucket = config.GRANULARITY.HALF_YEAR;
                increment = [6, "M"];
            } else if(~[config.GRANULARITY.YEAR, config.GRANULARITY.HALF_YEAR, config.GRANULARITY.MONTH].indexOf(maxGranularity) && +moment(+d).add(1, "M") < +dateTo){
                bucket = config.GRANULARITY.MONTH;
                increment = [1, "M"];
            }
        }
        if (!dates[bucket]) dates[bucket] = [];
        dates[bucket].push(createTimeBuckets(d)[bucket]);
        d.add(increment[0], increment[1]);
    }
    return dates;
}

module.exports = getTargetPeriods;
