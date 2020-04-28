let previousPage = (typeof window !== 'undefined' ? window.location.pathname : '')

export const trackPageChange = () => {
  const currentPage = window.location.pathname

  if (currentPage !== previousPage) {
    // matomo spa tracking (see https://developer.matomo.org/guides/spa-tracking)
    window._paq.push([ 'setReferrerUrl', previousPage ])
    previousPage = currentPage
    window._paq.push([ 'setCustomUrl', previousPage ])
    window._paq.push([ 'setDocumentTitle', window.document.title ])
    window._paq.push([ 'deleteCustomVariables', 'page' ])
    window._paq.push([ 'setGenerationTimeMs', 0 ])
    window._paq.push([ 'trackPageView' ])
    // make Matomo aware of newly added content
    const doc = window.document
    window._paq.push([ 'MediaAnalytics::scanForMedia', doc ])
    window._paq.push([ 'FormAnalytics::scanForForms', doc ])
    window._paq.push([ 'trackContentImpressionsWithinNode', doc ])
    window._paq.push([ 'enableLinkTracking' ])
  }
}

export const trackEvent = (category, action, ...args) => {
  window._paq.push([ 'trackEvent', category, action, ...args ])
}


export const trackUser = id => {
  window._paq.push([ 'setUserId', id ])
}
