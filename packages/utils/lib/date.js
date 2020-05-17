const datefns = require('date-fns')

exports.formatDate = (...args) => datefns.format(...args)

exports.formatISO = (...args) => datefns.formatISO(...args)

exports.addDays = (...args) => datefns.addDays(...args)

exports.getCurrentPeriod = () => datefns.format(new Date(), 'yyyy-MM')
