import { _ } from '@mailmask/utils'

import { lighten, opacify } from './utils'

import {
  primary1,
  primary2,
  secondary1,
  secondary2,
  secondary3,
  white,
  black,
  darkGrey,
  darkestGrey,
  green,
  red,
  yellow,
  grey,
  lightGrey,
  lighterGrey,
  transparent,
} from './colors'

import baseTheme from './light'

const bgColor = primary1
const textColor = primary2
const anchorColor = lighten(secondary1, 65)

const bgColorAlt1 = '#22272D'

export default Object.freeze(_.deepMerge(baseTheme, {
  layout: {
    bgColor,
    textColor,
  },
  // header component
  header: {
    logoColor: textColor,
    themeSwitcher: {
      iconColor: white,
    },
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
      logoColor: black,
      themeSwitcher: {
        iconColor: black,
      },
      wrapper: {
        bgColor: opacify(white, 0.9),
      },
      navAnchor: {
        textColor: black,
        borderColor: transparent,
        bgColor: transparent,
        hoverTextColor: black,
        hoverBgColor: transparent,
        hoverBorderColor: black,
      },
      specialNavAnchor: {
        textColor: black,
        borderColor: black,
        bgColor: transparent,
        hoverTextColor: white,
        hoverBgColor: black,
        hoverBorderColor: black,
      },
    },
  },
  // footer component
  footer: {
    anchor: {
      textColor,
      hoverTextColor: bgColor,
      hoverBgColor: textColor,
      borderColor: textColor,
    },
  },
  // content wrapper component
  contentWrapper: {
    normal: {
      bgColor,
      textColor,
      shadowColor: transparent,
      anchor: {
        textColor: anchorColor,
        hoverTextColor: white,
        hoverBgColor: anchorColor,
        borderBottomColor: anchorColor,
      },
    },
    alt1: {
      bgColor: bgColorAlt1,
      textColor,
      shadowColor: transparent,
      anchor: {
        textColor: anchorColor,
        hoverTextColor: white,
        hoverBgColor: anchorColor,
        borderBottomColor: anchorColor,
      },
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
    bgColor: lighten(secondary2, 70),
    textColor: black,
    iconColor: secondary2,
  },
  // button component
  button: {
    disabledBgColor: grey,
    disabledTextColor: darkGrey,
    disabledBorderColor: grey,
    bgColor: anchorColor,
    textColor: white,
    borderColor: anchorColor,
    hoverBgColor: opacify(anchorColor, 0.9),
    hoverTextColor: white,
    hoverBorderColor: anchorColor,
    shadowColor: black,
  },
  // icon button component
  iconButton: {
    borderColor: anchorColor,
    bgColor: transparent,
    textColor: anchorColor,
    disabledBorderColor: lightGrey,
    disabledBgColor: transparent,
    disabledTextColor: grey,
    hoverBorderColor: anchorColor,
    hoverBgColor: anchorColor,
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
      textColor,
    },
    answer: {
      textColor: lighterGrey,
    },
  },
  // markdown component
  markdown: {
    content: {
      image: {
        borderColor: grey,
      },
      code: {
        bgColor: opacify(secondary3, 0.2),
      },
    },
  },
  // footnote components
  footnote: {
    textColor: grey,
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
  // cookie consent component
  consentBar: {
    textColor: bgColor,
    bgColor: textColor,
    anchor: {
      textColor: bgColor,
      hoverTextColor: white,
      hoverBgColor: anchorColor,
      borderBottomColor: bgColor,
    }
  },
  // pricing component
  pricing: {
    schedule: {
      bgColor: white,
      textColor: darkGrey,
      shadowColor: black,
    },
    selectedSchedule: {
      bgColor: anchorColor,
      textColor: white,
    },
    plan: {
      details: {
        bgColor: white,
        textColor: bgColor,
        shadowColor: black,
      },
    },
    moneyOff: {
      textColor: red,
    },
    benefit: {
      borderColor: grey,
    },
    priceSchedule: {
      textColor: grey,
    },
    preferredIcon: {
      textColor: secondary2,
    },
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
      example: {
        bgColor: opacify(secondary2, 1),
        textColor: black,
      },
    },
    benefit: {
      block: {
        borderColor: transparent,
        bgColor: transparent,
        shadowColor: transparent,
        textColor,
      },
      arcLine: {
        color: darkGrey,
      },
      logo: {
        bgColor: white,
        shadowColor: black,
      },
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
      maskSuffixTextColor: grey,
      metaDataTextColor: grey,
      maskStatusTextColor: white,
      maskOnIconColor: green,
      maskOffIconColor: red,
    },
  },
  // help page
  helpPage: {
    contactItem: {
      borderColor: lightGrey,
    },
  },
  // blog page
  blogPage: {
    post: {
      title: {
        anchor: {
          textColor: anchorColor,
          hoverTextColor: bgColor,
          hoverBgColor: anchorColor,
          borderBottomColor: anchorColor,
        }
      },
      preview: {
        textColor: grey
      },
      date: {
        textColor: darkGrey,
      }
    },
  },
}))

