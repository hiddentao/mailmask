import Document, { Main, Head, NextScript } from 'next/document'

import { getAppConfig } from '../src/frontend/appConfig'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    const ret = {
      ...initialProps,
      appConfig: getAppConfig(),
    }

    return ret
  }

  render () {
    const { appConfig } = this.props

    const { APP_MODE } = appConfig

    return (
      <html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no"
          />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          {/* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" /> */}
          <meta name="apple-mobile-web-app-title" content="Mailmask" />
          <meta name="application-name" content="Mailmask" />
          <meta name="msapplication-TileColor" content="#f7fff7" />
          <meta name="theme-color" content="#f7fff7" />
          <link rel='stylesheet' href='https://unpkg.com/@fortawesome/fontawesome-svg-core@1.2.28/styles.css' crossOrigin='anonymous'></link>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300,500,800,300,500i,800i|Open+Sans:300,400,700,300i,400i,700i" />
        </Head>
        <body>
          <Main />
          <script type="text/javascript" dangerouslySetInnerHTML={{
            __html: `
              window.appConfig = ${JSON.stringify(appConfig, null, 2)};
            `
          }}></script>
          <NextScript />
        </body>
      </html>
    )
  }
}
