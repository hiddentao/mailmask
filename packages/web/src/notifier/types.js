module.exports = [
  'LOGIN',
  'SIGNED_UP'
].reduce((m, v) => {
  m[v] = v
  return m
}, {})
