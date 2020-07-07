import React from 'react'
import styled from '@emotion/styled'

import { GlobalConsumer } from '../contexts'
import SvgImage from './SvgImage'

const MAP = {
  light: {
    normal: 'contentPointLight',
    alt1: 'contentPointLightAlt1',
  },
  dark: {
    normal: 'contentPointDark',
    alt1: 'contentPointDarkAlt1',
  }
}


const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
`

const ContentPointImage = ({ className, type = 'normal' }) => {
  return (
    <GlobalConsumer>
      {({ themeName }) => (
        <Container className={className}>
          <SvgImage src={MAP[themeName][type]} />
        </Container>
      )}
    </GlobalConsumer>
  )
}

export default ContentPointImage
