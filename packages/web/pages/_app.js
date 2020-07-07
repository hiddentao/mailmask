import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import { ThemeProvider } from 'emotion-theming'
import { loadFonts } from 'emotion-styled-utils'
import { toast } from 'react-toastify'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { trackPageChange, initSessionRecording, initErrorReporter } from '../src/frontend/analytics'
import GlobalStyles from '../src/frontend/components/GlobalStyles'
import { setupThemes } from '../src/frontend/theme'
import { GlobalProvider, GlobalConsumer } from '../src/frontend/contexts'

// cloud utilities
initErrorReporter()
initSessionRecording()

// when page changes
Router.events.on('routeChangeComplete', () => {
  trackPageChange()

  if (window.location.hash) {
    window.location = window.location // eslint-disable-line no-self-assign
  }
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

const Bootstrap = props => {
  const { Component, pageProps } = props

  return (
    <GlobalConsumer>
      {({ themeName }) => (
        <ThemeProvider theme={themes.get(themeName)}>
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
      )}
    </GlobalConsumer>
  )
}

export default class MyApp extends App {
  componentDidMount () {
    // if client-side then load custom fonts
    if (typeof window !== 'undefined' && !!window.document) {
      setTimeout(() => {
        loadFonts({
          body: {
            name: 'Open Sans',
            weights: {
              thin: 300,
              regular: 400,
              bold: 700,
            },
          },
          header: {
            name: 'Raleway',
            weights: {
              thin: 300,
              regular: 500,
              extraBold: 800,
            }
          }
        }, window.document).then(
          () => this.forceUpdate(),
          err => console.error(err)
        )
      }, 5000)
    }
  }

  componentDidCatch (error, info) {
    toast.error(`Sorry, there was unexpected page rendering error!`)
    console.error(error, info)
    this.setState({ error }) // trigger the error page
  }

  render () {
    return (
      <GlobalProvider>
        <Bootstrap {...this.props} />
      </GlobalProvider>
    )
  }
}
