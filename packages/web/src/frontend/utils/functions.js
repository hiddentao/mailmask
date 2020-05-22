export const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export const renderChildWithArgs = (c, a) => (typeof c === 'function' ? c(a) : c)

