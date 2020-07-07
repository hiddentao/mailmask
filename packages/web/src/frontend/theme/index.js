import { Themes } from 'emotion-styled-utils'

import light from './light'
import dark from './dark'

export const setupThemes = breakpoints => {
  const themes = new Themes({}, breakpoints)

  themes.add('light', light)
  themes.add('dark', dark)

  return themes
}
