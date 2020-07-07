import { _ } from '@mailmask/utils'

const crisp = (typeof window !== 'undefined' ? window.$crisp : null)

if (crisp) {
  crisp.push([ 'config', 'color:theme', 'deep_purple' ])
}


export const openChatSupportBox = () => {
  if (crisp) {
    crisp.push([ 'do', 'chat:open' ])
  }
}


export const setChatSupportUser = ({ email, usernames } = {}) => {
  if (crisp) {
    if (email) {
      crisp.push([ 'set', 'user:email', [ email ] ])
    }

    const username = _.get(usernames, '0.username')
    if (username) {
      crisp.push([ 'set', 'user:nickname', [ username ] ])
    }
  }
}

