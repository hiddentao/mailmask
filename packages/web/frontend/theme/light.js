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
  // header component
  headerWrapperBgColor: 'transparent',
  headerWrapperFloatingBgColor: 'rgba(0, 0, 0, 0.9)',
  headerBgColor: 'transparent',
  headerTextColor: black,
  navAnchorTextColor: white,
  navAnchorHoverTextColor: white,
  navAnchorHoverBgColor: primary,
  navAnchorBorderBottomColor: 'transparent',
  mobileNavBoxShadow: darkGrey,
  mobileNavBgColor: white,
  mobileNavAnchorTextColor: primary,
  mobileNavAnchorHoverTextColor: white,
  mobileNavAnchorHoverBgColor: primary,
  mobileNavAnchorBorderBottomColor: 'transparent',
}
