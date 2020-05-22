export const redirectToPage = ({ res }, page) => {
  res.writeHead(301, {
    Location: page
  })
  res.end()
}

