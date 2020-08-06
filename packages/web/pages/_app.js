import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import { ThemeProvider } from 'emotion-theming'
import { setFonts } from 'emotion-styled-utils'
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
    tablet: '800px',
    desktop: '950px',
  },
  height: {
    tall: '800px',
  }
})

if (typeof window !== 'undefined' && !!window.document) {
  setFonts({
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
  })
}

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
