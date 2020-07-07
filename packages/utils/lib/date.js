const datefns = require('date-fns')

exports.formatDate = (...args) => datefns.format(...args)

exports.thisMonthPeriodStr = () => exports.formatDate(new Date(), 'MMM yyyy')

exports.formatISO = (...args) => datefns.formatISO(...args)

exports.addDays = (...args) => datefns.addDays(...args)

exports.getCurrentPeriod = () => datefns.format(new Date(), 'yyyy-MM')
