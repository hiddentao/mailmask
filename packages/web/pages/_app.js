import LogRocket from 'logrocket'
import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import { ThemeProvider } from 'emotion-theming'
import { loadFonts } from 'emotion-styled-utils'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { trackPageChange } from '../src/frontend/analytics'
import { isProduction } from '../src/frontend/appConfig'
import GlobalStyles from '../src/frontend/components/GlobalStyles'
import { setupThemes } from '../src/frontend/theme'

// session recording
if (isProduction()) {
  LogRocket.init('xiw3fx/mailmask')
}

// when page changes
Router.events.on('routeChangeComplete', () => {
  trackPageChange()
  // always scroll to top on route change
  window.scrollTo(0, 0)
})

const themes = setupThemes({
  width: {
    mobile: '950px',
    desktop: '1280px',
  },
  height: {
    tall: '800px',
  }
})

export default class MyApp extends App {
  componentDidMount () {
    // if client-side then load custom fonts
    if (typeof window !== 'undefined' && !!window.document) {
      loadFonts({
        body: {
          name: 'Roboto',
          weights: {
            thin: 100,
            regular: 400,
            bold: 700,
          },
        },
        header: {
          name: 'Poiret One',
          weights: {
            regular: 400,
          }
        }
      }, window.document).then(
        () => this.forceUpdate(),
        err => console.error(err)
      )
    }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={themes.get('light')}>
        <GlobalStyles />
        <ToastContainer
          autoClose={3000}
          closeButton={false}
          draggable={false}
          hideProgressBar={true}
          pauseOnFocusLoss={false}
          newestOnTop={true}
          closeOnClick={true}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
