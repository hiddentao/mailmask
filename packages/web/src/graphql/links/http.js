import fetch from 'node-fetch'
import { HttpLink } from 'apollo-link-http'

export default ({ endpoint }) => new HttpLink({ uri: endpoint, fetch })
