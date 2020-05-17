module.exports = [
  'LOGIN',
  'SIGNUP',
  'SIGNED_UP'
].reduce((m, v) => {
  m[v] = v
  return m
}, {})
