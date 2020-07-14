/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react'
import styled from '@emotion/styled'
import { useTheme } from 'emotion-theming'
import { flex } from 'emotion-styled-utils'
import DefaultModal, { ModalProvider as DefaultModalProvider } from 'styled-react-modal'

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  ${flex({ direction: 'column', justify: 'flex-start', align: 'center' })};
  background-color: ${({ theme }) => theme.modal.overlay.bgColor};
`

const StyledModal = DefaultModal.styled`
  background-color: ${({ theme }) => theme.modal.bgColor};
  color: ${({ theme }) => theme.modal.textColor};
  width: ${props => props.width || '80%'};
  max-width: 80%;
  height: ${props => props.height || 'auto'};
  padding: 1rem;
  border-radius: 10px;
  margin-top: 50px;

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    width: ${props => props.width || '400px'};
    height: ${props => props.height || 'auto'};
  }
`

export const ModalProvider = ({ children }) => (
  <DefaultModalProvider backgroundComponent={ModalBackground}>
    {children}
  </DefaultModalProvider>
)

export const Modal = ({ width, height, ...props }) => {
  const theme = useTheme()
  return (
    <StyledModal
      {...props}
      theme={theme}
      width={width}
      height={height}
    />
  )
}
