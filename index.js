"use strict";

const moment = require("moment");

const GRANULARITY = {
    day: "day",
    year: "year",
    month: "month",
    quarter: "quarter"
};

const FORMATS = {
    day: "YYYY-MM-DD",
    month: "YYYY-MM",
    quarter: "YYYY-Qo",
    year: "YYYY",
};

let formatDate = (format, date)=>(new moment(date).format(format));

let isGranularityAcceptable = (restrictedGranularity, granularity)=> {
    return restrictedGranularity[granularity] !== true
};

let isYearStart = date=>(date.month() === 0 && date.date() === 1);
let isFullYearIncluded = (startDate, lastDate)=>(+moment(+startDate).add(1, "y") <= +lastDate);

let isQuarterStart = date=>(date.quarter() !== moment(+date).subtract(1, "d").quarter());
let isFullQuarterIncluded = (startDate, lastDate)=>+moment(+startDate).add(1, "Q") <= +lastDate;

let isMonthStart = date=>date.date() === 1;
let isFullMonthIncluded = (startDate, lastDate)=>+moment(+startDate).add(1, "M") <= +lastDate;

function getRange(dateFrom, dateTo, config = {}) {
    let restrictedGranularity = config.restrictedGranularity || {};
    let formats = { ...FORMATS, ...(config.formats || {})};

    let formatDay = formatDate.bind(null, formats.day);
    let formatMonth = formatDate.bind(null, formats.month);
    let formatQuarter = formatDate.bind(null, formats.quarter);
    let formatYear = formatDate.bind(null, formats.year);

    let dates = {};
    let d = moment(dateFrom);
    let to = moment(dateTo);

    while (+d <= +to) {
        if (isGranularityAcceptable(restrictedGranularity, GRANULARITY.year) && isYearStart(d) && isFullYearIncluded(d, to)) {
            if (!dates[GRANULARITY.year]) dates[GRANULARITY.year] = [];
            dates[GRANULARITY.year].push(formatYear(d));
            d.add(1, 'y');
            continue;
        }

        if (isGranularityAcceptable(restrictedGranularity, GRANULARITY.quarter) && isQuarterStart(d) && isFullQuarterIncluded(d, to)) {
            if (!dates[GRANULARITY.quarter]) dates[GRANULARITY.quarter] = [];
            dates[GRANULARITY.quarter].push(formatQuarter(d));
            d.add(1, 'Q');
            continue;
        }

        if (isGranularityAcceptable(restrictedGranularity, GRANULARITY.month) && isMonthStart(d) && isFullMonthIncluded(d, to)) {
            if (!dates[GRANULARITY.month]) dates[GRANULARITY.month] = [];
            dates[GRANULARITY.month].push(formatMonth(d));
            d.add(1, 'M');
            continue;
        }

        if (!dates[GRANULARITY.day]) dates[GRANULARITY.day] = [];
        dates[GRANULARITY.day].push(formatDay(d));
        d.add(1, 'd');
    }
    return dates;
}

module.exports = getRange;
