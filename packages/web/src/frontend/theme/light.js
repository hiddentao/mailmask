import { opacify } from 'emotion-styled-utils'

import {
  primary1,
  primary2,
  secondary1,
  secondary2,
  secondary3,
  white,
  black,
  darkGrey,
  green,
  red,
  yellow,
  grey,
  lightGrey,
  lighterGrey,
  transparent,
} from './colors'

const bgColor = primary2
const textColor = primary1

export default {
  // layout
  layout: {
    bgColor,
    textColor,
  },
  // header component
  header: {
    logoColor: textColor,
    wrapper: {
      bgColor: transparent,
    },
    navAnchor: {
      textColor,
      borderColor: transparent,
      bgColor: transparent,
      hoverTextColor: textColor,
      hoverBgColor: transparent,
      hoverBorderColor: textColor,
    },
    specialNavAnchor: {
      textColor,
      borderColor: textColor,
      bgColor: transparent,
      hoverTextColor: bgColor,
      hoverBgColor: textColor,
      hoverBorderColor: textColor,
    },
    floating: {
      logoColor: white,
      wrapper: {
        bgColor: opacify(black, 0.9),
      },
      navAnchor: {
        textColor: white,
        borderColor: transparent,
        bgColor: transparent,
        hoverTextColor: white,
        hoverBgColor: transparent,
        hoverBorderColor: white,
      },
      specialNavAnchor: {
        textColor: white,
        borderColor: white,
        bgColor: transparent,
        hoverTextColor: black,
        hoverBgColor: white,
        hoverBorderColor: white,
      },
    },
  },
  // footer component
  footerAnchor: {
    textColor,
    hoverTextColor: bgColor,
    hoverBgColor: textColor,
    borderColor: textColor,
  },
  // content wrapper component
  contentWrapper: {
    bgColor,
    textColor,
    shadowColor: transparent,
    anchor: {
      textColor: secondary1,
      hoverTextColor: white,
      hoverBgColor: secondary1,
      borderBottomColor: secondary1,
    },
  },
  // errorBox component
  errorBox: {
    bgColor: red,
    textColor: white,
    iconColor: yellow,
    anchor: {
      textColor: white,
      hoverTextColor: white,
      hoverBgColor: secondary2,
      borderBottomColor: white,
    },
  },
  // alertBox component
  alertBox: {
    bgColor: opacify(secondary2, 0.3),
    textColor: black,
    iconColor: secondary2,
  },
  // button component
  button: {
    disabledBgColor: grey,
    disabledTextColor: darkGrey,
    disabledBorderColor: grey,
    bgColor: secondary1,
    textColor: white,
    borderColor: secondary1,
    hoverBgColor: opacify(secondary1, 0.9),
    hoverTextColor: white,
    hoverBorderColor: secondary1,
    shadowColor: darkGrey,
  },
  // icon button component
  iconButton: {
    borderColor: secondary1,
    bgColor: transparent,
    textColor: secondary1,
    disabledBorderColor: lightGrey,
    disabledBgColor: transparent,
    disabledTextColor: grey,
    hoverBorderColor: secondary1,
    hoverBgColor: secondary1,
    hoverTextColor: white,
    shadowColor: darkGrey,
  },
  // input component
  input: {
    borderColor: darkGrey,
    bgColor: white,
    errorBorderColor: red,
    errorBgColor: yellow,
    placeholderTextColor: lightGrey,
  },
  // setUsername component
  completeSignup: {
    yesTickColor: green,
    noTickColor: red,
  },
  // faqItem component
  faqItem: {
    question: {
      textColor: black,
    },
    answer: {
      textColor: darkGrey,
    },
  },
  // markdown component
  markdown: {
    content: {
      image: {
        borderColor: grey,
      },
    },
  },
  // modal component
  modal: {
    overlay: {
      bgColor: 'rgba(0, 0, 0, 0.8)',
    },
    bgColor: white,
    textColor: black,
  },
  // tooltip component
  tooltip: {
    bgColor: black,
    textColor: white,
  },
  // error page
  errorPage: {
    explanation: {
      textColor: darkGrey,
    },
    stack: {
      bgColor: lightGrey,
    },
  },
  // home page: top block
  homePage: {
    howItWorks: {
      number: {
        borderColor: black,
      },
      example: {
        bgColor: lighterGrey,
        textColor: grey,
      },
    },
    benefit: {
      borderColor: grey,
    },
  },
  // dashboard page
  dashboardPage: {
    sidebar: {
      borderColor: grey,
      bgColor,
      mobile: {
        bgColor: white,
      }
    },
    masksTable: {
      maskSuffixTextColor: lightGrey,
      metaDataTextColor: grey,
      maskStatusTextColor: grey,
      maskOnIconColor: green,
      maskOffIconColor: red,
    },
  },
  // pricing page
  pricingPage: {
    schedule: {
      bgColor: white,
      textColor: darkGrey,
      borderColor: darkGrey,
    },
    selectedSchedule: {
      bgColor: secondary1,
      textColor: white,
    },
    plan: {
      bgColor: white,
      borderColor: grey,
    },
    originalPrice: {
      textColor: red,
    },
    benefit: {
      borderColor: grey,
    },
    priceSchedule: {
      textColor: grey,
    },
  },
  // help page
  helpPage: {
    contactItem: {
      borderColor: lightGrey,
    },
  },
}

