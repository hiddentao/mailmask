import React from 'react'

import { getAppConfig } from '../appConfig'
import NoSsr from './NoSsr'

const { SUPPORT_EMAIL } = getAppConfig()

const SupportEmail = () => <NoSsr><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></NoSsr>

export default SupportEmail
