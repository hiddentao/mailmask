import React, { forwardRef } from 'react'

import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faBars,
  faCheckCircle,
  faChevronDown,
  faChevronRight,
  faExchangeAlt,
  faExclamation,
  faInfo,
  faMoon,
  faQuestion,
  faRss,
  faSignInAlt,
  faSnowflake,
  faSun,
  faStar,
  faTimesCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

const ICONS = {
  bars: faBars,
  'check-circle': faCheckCircle,
  'chevron-down': faChevronDown,
  'chevron-right': faChevronRight,
  'exchange-alt': faExchangeAlt,
  exclamation: faExclamation,
  info: faInfo,
  moon: faMoon,
  question: faQuestion,
  rss: faRss,
  'sign-in-alt': faSignInAlt,
  sun: faSun,
  snowflake: faSnowflake,
  star: faStar,
  'times-circle': faTimesCircle,
  user: faUser,
}

library.add(...(Object.values(ICONS)))

const MAP = {
  fas: Object.keys(ICONS)
}

const getCategory = name => Object.keys(MAP).find(c => MAP[c].includes(name))

/**
 * Render an icon.
 *
 * To use this component without [on-screen icon flickering](https://github.com/FortAwesome/react-fontawesome/issues/134#issuecomment-471940596)
 * the following line should be added to your React app's root file, before
 * anything gets rendered:
 *
 * ```js
 * require('@fortawesome/fontawesome-svg-core/styles.css')
 * ```
 *
 * @return {ReactElement}
 */
const Icon = forwardRef(({ className, name, ...props }, ref) => (
  <FontAwesomeIcon ref={ref} className={className} icon={[ getCategory(name), name ]} {...props} />
))

export default Icon
