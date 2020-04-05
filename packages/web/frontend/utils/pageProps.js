import { getAppConfig } from './appConfig'

export const getInitialPageProps = () => ({
  appConfig: getAppConfig()
})
