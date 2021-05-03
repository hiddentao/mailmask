const { _ } = require('@mailmask/utils')
const GithubSlugger = require('github-slugger')
const matter = require('gray-matter')

const slugger = new GithubSlugger()

const srcPosts = [
  require('./1.md').default,
  require('./2.md').default,
  require('./3.md').default,
  require('./4.md').default,
  require('./5.md').default,
].map(post => {
  const { content, data: { summary, title, date } } = matter(post)
  return {
    content,
    summary: `${summary}...` || _.trunc(content, 300),
    title,
    date: new Date(date).getTime(),
    slug: slugger.slug(title)
  }
})

// sort in reverse chronological order
srcPosts.sort((a, b) => (a.date > b.date ? -1 : 1))

export default srcPosts
