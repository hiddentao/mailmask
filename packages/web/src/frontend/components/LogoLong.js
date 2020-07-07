/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import LogoLongSvg from '../images/svg/logo_light_horizontal.svg'


const LogoLong = ({ className }) => {
  return (
    <LogoLongSvg className={className} css={css`
      transition: none;
      width: 192px;
      height: auto;

      & path:first-of-type {
        display: none;
      }

      & * {
        transition: none;
      }
    `}/>
  )
}

export default LogoLong
