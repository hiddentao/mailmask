import React from 'react'

import contentPointLight from '../images/svg/content_point_light.svg'
import contentPointLightAlt1 from '../images/svg/content_point_light_alt1.svg'
import contentPointDark from '../images/svg/content_point_dark.svg'
import contentPointDarkAlt1 from '../images/svg/content_point_dark_alt1.svg'
import splash1 from '../images/svg/splash1.svg'
import splash2 from '../images/svg/splash2.svg'
import splash3 from '../images/svg/splash3.svg'
import eye from '../images/svg/eye.svg'
import coding from '../images/svg/coding.svg'
import attachmentEmail from '../images/svg/attachment_email.svg'
import ninjaMask from '../images/svg/ninja_mask.svg'
import stopHand from '../images/svg/stop_hand.svg'
import textbox from '../images/svg/textbox.svg'

const SVG = {
  contentPointLight,
  contentPointLightAlt1,
  contentPointDark,
  contentPointDarkAlt1,
  splash1,
  splash2,
  splash3,
  eye,
  coding,
  attachmentEmail,
  ninjaMask,
  stopHand,
  textbox,
}

const SvgImageComponent = ({ src, ...props }) => {
  const Comp = SVG[src]
  return <Comp {...props }/>
}

export default SvgImageComponent
