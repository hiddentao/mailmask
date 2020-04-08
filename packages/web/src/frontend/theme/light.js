import { opacify } from 'emotion-styled-utils'

// pallette
const primary = '#6807f9'

// standard colours
const white = '#fff'
const black = '#000'
const darkGrey = '#666'
const grey = '#999'
const lightGrey = '#ccc'
const lighterGrey = '#eee'
const transparent = 'transparent'

/**
 * Default theme.
 *
 * @type {Object}
 */
export default {
  // layout
  layoutBgColor: 'rgba(62,0,135,1) linear-gradient(135deg, rgba(62, 0, 135, 1) 0%, rgba(100, 36, 167, 1) 44%, rgba(146, 80, 205, 1) 74%, rgba(202, 134, 252, 1) 100%)',
  layoutTextColor: white,
  // header component
  headerWrapperBgColor: transparent,
  headerWrapperFloatingBgColor: 'rgba(0, 0, 0, 0.9)',
  headerBgColor: transparent,
  headerTextColor: white,
  navAnchorTextColor: white,
  navAnchorHoverTextColor: white,
  navAnchorHoverBgColor: primary,
  navAnchorBorderBottomColor: transparent,
  mobileNavBoxShadow: darkGrey,
  mobileNavBgColor: white,
  mobileNavAnchorTextColor: primary,
  mobileNavAnchorHoverTextColor: white,
  mobileNavAnchorHoverBgColor: primary,
  mobileNavAnchorBorderBottomColor: transparent,
  // content wrapper component
  contentWrapperBgColor: white,
  contentWrapperTextColor: black,
}
