/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import LogoSvg from '../images/svg/logo_light_horizontal.svg'


const Logo = ({ className }) => {
  return (
    <LogoSvg className={className} css={css`
      transition: none;
      width: 192px;
      height: auto;

      & path:first-child {
        display: none;
      }

      & * {
        transition: none;
      }
    `}/>
  )
}

export default Logo
