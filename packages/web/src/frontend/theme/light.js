import { opacify, lighten } from './utils'

import {
  primary1,
  primary2,
  secondary1,
  secondary2,
  secondary3,
  white,
  black,
  darkGrey,
  orange,
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
const anchorColor = secondary1

const bgColorAlt1 = '#EEF8EE'

export default Object.freeze({
  // layout
  layout: {
    bgColor,
    textColor,
  },
  // header component
  header: {
    logoColor: textColor,
    themeSwitcher: {
      iconColor: black,
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
      logoColor: white,
      themeSwitcher: {
        iconColor: white,
      },
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
  footer: {
    anchor: {
      textColor,
      hoverTextColor: bgColor,
      hoverBgColor: textColor,
      borderColor: textColor,
    }
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
    }
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
  // warnBox component
  warnBox: {
    bgColor: lighten(orange, 80),
    textColor: black,
    iconColor: orange,
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
    shadowColor: darkGrey,
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
      code: {
        bgColor: opacify(secondary2, 0.1),
      },
    },
  },
  // footnote components
  footnote: {
    textColor: darkGrey,
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
      hoverTextColor: bgColor,
      hoverBgColor: anchorColor,
      borderBottomColor: bgColor,
    }
  },
  // pricing component
  pricing: {
    schedule: {
      bgColor: white,
      textColor: darkGrey,
      shadowColor: lightGrey,
    },
    selectedSchedule: {
      bgColor: anchorColor,
      textColor: white,
    },
    plan: {
      details: {
        bgColor: white,
        textColor,
        shadowColor: lightGrey,
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
        bgColor: opacify(secondary2, 0.2),
        textColor: darkGrey,
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
        color: lightGrey,
      },
      logo: {
        bgColor: white,
        shadowColor: grey,
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
      maskSuffixTextColor: lightGrey,
      metaDataTextColor: grey,
      maskStatusTextColor: black,
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
    rssIconColor: 'orange',
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
        textColor: lightGrey,
      }
    },
  },
})

