import LogRocket from 'logrocket'

import { isProduction } from './appConfig'

export const initSessionRecording = () => {
  if (isProduction()) {
    LogRocket.init('xiw3fx/mailmask')
  }
}


let logRocketUid
export const setLogRocketUid = uid => {
  if (isProduction() && logRocketUid !== uid) {
    logRocketUid = uid
    LogRocket.identify(uid)
  }
}


const _paq = () => {
  if (typeof window !== 'undefined') {
    return window._paq || []
  } else {
    return []
  }
}

let previousPage = (typeof window !== 'undefined' ? window.location.pathname : '')

export const trackPageChange = () => {
  const currentPage = window.location.pathname

  if (currentPage !== previousPage) {
    // matomo spa tracking (see https://developer.matomo.org/guides/spa-tracking)
    _paq().push([ 'setReferrerUrl', previousPage ])
    previousPage = currentPage
    _paq().push([ 'setCustomUrl', previousPage ])
    _paq().push([ 'setDocumentTitle', window.document.title ])
    _paq().push([ 'deleteCustomVariables', 'page' ])
    _paq().push([ 'setGenerationTimeMs', 0 ])
    _paq().push([ 'trackPageView' ])
    // make Matomo aware of newly added content
    const doc = window.document
    _paq().push([ 'MediaAnalytics::scanForMedia', doc ])
    _paq().push([ 'FormAnalytics::scanForForms', doc ])
    _paq().push([ 'trackContentImpressionsWithinNode', doc ])
    _paq().push([ 'enableLinkTracking' ])
  }
}

export const trackEvent = (category, action, ...args) => {
  _paq().push([ 'trackEvent', category, action, ...args ])
}


export const trackUser = id => {
  _paq().push([ 'setUserId', id ])
  setLogRocketUid(id)
}


