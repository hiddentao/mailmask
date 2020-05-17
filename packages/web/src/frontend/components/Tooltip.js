import React, { useState, useCallback } from 'react'
import { useTheme } from 'emotion-theming'
import styled from '@emotion/styled'
import { font } from 'emotion-styled-utils'
import Tippy from '@tippyjs/react/headless'

const Container = styled.div`
  background-color: ${({ theme }) => theme.tooltipBgColor};
  color: ${({ theme }) => theme.tooltipTextColor};
  padding: 1rem;
  border-radius: 5px;
  max-width: 200px;
  line-height: 1.3em;

  em {
    ${font('body', 'normal', 'italic')};
  }

  strong {
    ${font('body', 'bold')};
  }
`

const Tooltip = ({ content, children }) => {
  const theme = useTheme()
  const [ visible, setVisible ] = useState()
  const show = useCallback(() => setVisible(true), [])
  const hide = useCallback(() => setVisible(false), [])
  const flash = useCallback((timeMs = 2000) => {
    show()
    setTimeout(() => hide(), timeMs)
  }, [ hide, show ])

  const html = (typeof content === 'string') ? <span>{content}</span> : content

  return (
    children({
      flash,
      show,
      hide,
      tooltipElement: (
        <Tippy
          duration={200}
          visible={(html ? visible : false)}
          render={attrs => (
            <Container {...attrs} theme={theme}>
              {html}
            </Container>
          )}
        ><span /></Tippy>
      )
    })
  )
}

export default Tooltip
