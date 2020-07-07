import { Color } from 'emotion-styled-utils'

export const lighten = (c, a) => Color(c).lightness(a).toString()
export const opacify = (c, a) => Color(c).alpha(a).toString()
