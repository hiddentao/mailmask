import React from 'react'

import Icon from './Icon'

/**
 * Render the loading icon.
 * @param {Object} props `Icon` properties.
 * @return {ReactElement}
 * @see {Icon}
 */
const LoadingIcon = props => <Icon name="snowflake" spin {...props} />

export default LoadingIcon
