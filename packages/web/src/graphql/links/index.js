import { ApolloLink } from 'apollo-link'

import http from './http'

export default args => ApolloLink.from([ http(args) ])
