/**
 * Generate flexbox CSS.
 *
 * @param  {Object} p Parameters.
 * @param  {String} [p.direction='column'] flex-direction.
 * @param  {String} [p.justify='center'] justify-content.
 * @param  {String} [p.align='center'] align-items.
 * @param  {String} [p.basis='auto'] flex-basis.
 * @param  {String} [p.wrap='nowrap'] flex-wrap.
 * @return {String}
 */
export const flex = ({ direction = 'column', justify = 'center', align = 'center', basis = 'auto', wrap = 'nowrap' } = {}) => `
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  flex: ${basis};
`

/**
 * Generate CSS to fully cover parent.
 * @return {String}
 */
export const absoluteCover = () => `
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

/**
 * Generate CSS for child anchors.
 * @param {Object} p Parameters
 * @return {String}
 */
export const childAnchors = ({
  textColor,
  bgColor = 'transparent',
  hoverTextColor,
  hoverBgColor,
  borderBottomColor,
  selected,
  extraStyles,
}) => `
  a {
    color: ${selected ? hoverTextColor : textColor};
    background-color: ${selected ? (hoverBgColor || textColor) : bgColor};
    border-bottom: 1px solid ${borderBottomColor || textColor};
    &:visited, &:link {
      color: ${textColor};
      background-color: ${bgColor};
      border-bottom: 1px solid ${borderBottomColor || textColor};
    }
    &:hover, &:active {
      color: ${hoverTextColor};
      background-color: ${hoverBgColor || textColor};
      border-bottom: 1px solid ${borderBottomColor || textColor};
    }
    ${extraStyles}
  }
`

/**
 * Generate CSS for smooth animations.
 * @return {String}
 */
export const smoothTransitions = () => `
  transition: all 0.3s linear
`

/**
 * Generate CSS for box shadow.
 * @param {Object} p Parameters
 * @param {String} p.color Shadow color.
 * @return {String}
 */
export const boxShadow = ({ color }) => `
  box-shadow: 0px 0px 10px 2px ${color}
`

/**
 * Generate CSS for button styles.
 * @param {Object} p Parameters
 * @return {String}
 */
export const buttonStyles = ({
  theme,
  disabled,
  buttonDisabledBgColor,
  buttonDisabledTextColor,
  buttonDisabledBorderColor,
  buttonBgColor,
  buttonTextColor,
  buttonBorderColor,
  buttonHoverBgColor,
  buttonHoverTextColor,
  buttonHoverBorderColor,
  buttonShadowColor,
}) => `
  ${smoothTransitions()};
  ${font('body', 'bold')};
  cursor: pointer;
  border: 1px solid ${(disabled ? buttonDisabledBorderColor : buttonBorderColor)};
  background-color: ${(disabled ? buttonDisabledBgColor : buttonBgColor)};
  color: ${(disabled ? buttonDisabledTextColor : buttonTextColor)};
  padding: 1em 2em;
  font-size: 1rem;
  outline: none;
  ${(disabled ? '' : `
    &:hover {
      border-color: ${buttonHoverBorderColor};
      background-color: ${buttonHoverBgColor};
      color: ${buttonHoverTextColor};
      ${boxShadow({ color: buttonShadowColor })};
    }
  `)}
`
