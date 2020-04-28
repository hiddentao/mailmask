import React from 'react'

import { getAppConfig } from '../appConfig'
import NoSsr from './NoSsr'

const { SUPPORT_EMAIL } = getAppConfig()

const SupportEmail = ({ children }) => <NoSsr><a href={`mailto:${SUPPORT_EMAIL}`}>{children || SUPPORT_EMAIL}</a></NoSsr>

export default SupportEmail
