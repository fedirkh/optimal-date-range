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

function saveDate(granularity, unit, formatFn, dates, d) {
    if (!dates[granularity]) dates[granularity] = [];
    dates[granularity].push(formatFn(d));
    d.add(1, unit);
}

const saveYear = saveDate.bind(null, GRANULARITY.year, 'y');
const saveQuarter = saveDate.bind(null, GRANULARITY.quarter, 'Q');
const saveMonth = saveDate.bind(null, GRANULARITY.month, 'M');
const saveDay = saveDate.bind(null, GRANULARITY.day, 'd');

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
            saveYear(formatYear, dates, d);
            continue;
        }

        if (isGranularityAcceptable(restrictedGranularity, GRANULARITY.quarter) && isQuarterStart(d) && isFullQuarterIncluded(d, to)) {
            saveQuarter(formatQuarter, dates, d);
            continue;
        }

        if (isGranularityAcceptable(restrictedGranularity, GRANULARITY.month) && isMonthStart(d) && isFullMonthIncluded(d, to)) {
            saveMonth(formatMonth, dates, d);
            continue;
        }

        if (isGranularityAcceptable(restrictedGranularity, GRANULARITY.day)) {
            saveDay(formatDay, dates, d);
            continue;
        }

        if (!isGranularityAcceptable(restrictedGranularity, GRANULARITY.day)) {
            if (restrictedGranularity.month !== true) {
                saveMonth(formatMonth, dates, d);
                continue;
            } else if (restrictedGranularity.quarter !== true) {
                saveQuarter(formatQuarter, dates, d);
                continue;
            } else if (restrictedGranularity.year !== true) {
                saveYear(formatYear, dates, d);
                continue;
            }
        }
    }
    return dates;
}

module.exports = getRange;
