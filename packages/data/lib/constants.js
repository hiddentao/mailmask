exports.LEGAL = [
  'TERMS_AND_CONDITIONS',
  'PRIVACY_POLICY',
  'MARKETING_EMAILS',
].reduce((m, v) => {
  m[v] = v
  return m
}, {})
