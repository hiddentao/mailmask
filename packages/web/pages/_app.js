import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { loadFonts } from 'emotion-styled-utils'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import GlobalStyles from '../src/frontend/components/GlobalStyles'
import { setupThemes } from '../src/frontend/theme'

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
