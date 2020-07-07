const makeConstants = a => a.reduce((m, v) => {
  m[v] = v
  return m
}, {})

exports.SUB = {
  PLAN: makeConstants([
    'BASIC',
    'PREMIUM',
  ]),
  SCHEDULE: makeConstants([
    'MONTHLY',
    'YEARLY',
  ]),
  PAYMENT_STATUS: makeConstants([
    'PAID',
    'FAILED',
  ]),
  STATUS: makeConstants([
    'SELECTED',
    'ACTIVE',
    'PAYMENT_FAILED',
    'CANCELLED',
  ]),
  BANDWIDTH: {
    BASIC: 10,
    PREMIUM: 600,
  },
  PRICE: {
    BASIC: 0,
    PREMIUM: 3,
  },
  /* Product IDs are from https://vendors.paddle.com/subscriptions/plans */
  PRODUCT_ID: {
    PREMIUM: {
      MONTHLY: '592334',
      YEARLY: '593041',
    },
  }
}

exports.LEGAL = makeConstants([
  'TERMS_AND_CONDITIONS',
  'PRIVACY_POLICY',
  'MARKETING_EMAILS',
])


exports.isPaidSub = sub => (sub.plan !== exports.SUB.STATUS.BASIC)

exports.isActiveSub = sub =>
  (sub.status === exports.SUB.STATUS.SELECTED || sub.status === exports.SUB.STATUS.CANCELLED)

exports.makeConstants = makeConstants
