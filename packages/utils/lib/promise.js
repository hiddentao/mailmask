exports.swallowPromise = async a => {
  let r
  try {
    r = await a
  } catch (err) {
    console.error(err)
  }

  return r
}
