import { opacify } from 'emotion-styled-utils'

// pallette
const primary = '#6807f9'
const secondary = '#f90798'
const tertiary = '#5ca102'

// standard colours
const white = '#fff'
const black = '#000'
const darkGrey = '#666'
const green = tertiary
const red = '#f00'
const yellow = 'yellow'
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
  headerWrapperFloatingBgColor: opacify(black, 0.9),
  headerBgColor: transparent,
  headerTextColor: white,
  navAnchorTextColor: white,
  navAnchorHoverTextColor: white,
  navAnchorHoverBgColor: primary,
  navAnchorBorderBottomColor: transparent,
  navSpecialAnchorBorderColor: primary,
  // footer component
  footerAnchorTextColor: white,
  footerAnchorHoverTextColor: white,
  footerAnchorHoverBgColor: primary,
  footerAnchorBorderBottomColor: white,
  // content wrapper component
  contentWrapperBgColor: white,
  contentWrapperTextColor: black,
  contentWrapperAnchorTextColor: secondary,
  contentWrapperAnchorHoverTextColor: white,
  contentWrapperAnchorHoverBgColor: secondary,
  contentWrapperAnchorBorderBottomColor: secondary,
  // errorBox component
  errorBoxBgColor: red,
  errorBoxTextColor: white,
  errorBoxIconColor: yellow,
  // alertBox component
  alertBoxBgColor: opacify(tertiary, 0.3),
  alertBoxTextColor: black,
  alertBoxIconColor: tertiary,
  // button component
  buttonDisabledBgColor: grey,
  buttonDisabledTextColor: darkGrey,
  buttonDisabledBorderColor: grey,
  buttonBgColor: secondary,
  buttonTextColor: white,
  buttonBorderColor: secondary,
  buttonHoverBgColor: opacify(secondary, 0.9),
  buttonHoverTextColor: white,
  buttonHoverBorderColor: secondary,
  buttonShadowColor: darkGrey,
  // icon button component
  iconButtonBorderColor: secondary,
  iconButtonBgColor: transparent,
  iconButtonTextColor: secondary,
  iconButtonDisabledBorderColor: lightGrey,
  iconButtonDisabledBgColor: transparent,
  iconButtonDisabledTextColor: grey,
  iconButtonHoverBorderColor: secondary,
  iconButtonHoverBgColor: secondary,
  iconButtonHoverTextColor: white,
  iconButtonShadowColor: darkGrey,
  // link button component
  linkButtonBorderColor: transparent,
  linkButtonBgColor: transparent,
  linkButtonTextColor: secondary,
  linkButtonDisabledBorderColor: transparent,
  linkButtonDisabledBgColor: transparent,
  linkButtonDisabledTextColor: grey,
  linkButtonHoverBorderColor: transparent,
  linkButtonHoverBgColor: secondary,
  linkButtonHoverTextColor: white,
  linkButtonShadowColor: transparent,
  // input components general styles
  inputBorderColor: darkGrey,
  inputBgColor: white,
  inputErrorBorderColor: red,
  inputErrorBgColor: yellow,
  inputPlaceholderTextColor: lightGrey,
  // queryResult component
  queryResultLoadingTextColor: white,
  // setUsername component
  setUsernameYesTickColor: green,
  setUsernameNoTickColor: red,
  // faqItem component
  faqItemQuestionTextColor: black,
  faqItemAnswerTextColor: darkGrey,
  // markdown component
  markdownContentImageBorderColor: grey,
  // modal component
  modalOverlayBgColor: 'rgba(0, 0, 0, 0.8)',
  modalBgColor: white,
  modalTextColor: black,
  // error page
  errorPageExplanationTextColor: darkGrey,
  errorPageStackBgColor: lightGrey,
  // home page: top block
  homePageTopBlockTextColor: white,
  homePageHowItWorksNumberBorderColor: black,
  homePageHowItWorksExampleBgColor: lighterGrey,
  homePageHowItWorksExampleTextColor: grey,
  homePageBenefitBorderColor: grey,
  // dashboard page
  dashboardPageSidebarBorderColor: grey,
  dashboardPageBottomBlockBorderColor: grey,
  dashboardPageMasksTableMaskSuffixTextColor: lightGrey,
  dashboardPageMasksTableMaskStatusTextColor: grey,
  dashboardPageMasksTableMaskOnIconColor: green,
  dashboardPageMasksTableMaskOffIconColor: red,
  dashboardPageMobileSidebarBgColor: white,
  // pricing page
  pricingPageScheduleBgColor: white,
  pricingPageScheduleTextColor: darkGrey,
  pricingPageScheduleBorderColor: darkGrey,
  pricingPageSelectedScheduleBgColor: primary,
  pricingPageSelectedScheduleTextColor: white,
  pricingPagePackageBorderColor: grey,
  pricingPageOriginalPriceTextColor: red,
  pricingPageBenefitBorderColor: grey,
  pricingPagePriceScheduleTextColor: grey,
}
