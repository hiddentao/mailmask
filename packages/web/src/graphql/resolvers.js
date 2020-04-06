import { getDefaultResolvers } from './typedefs'

export default () => {
  return {
    Query: {
      test: () => {
        return {
          msg: 'Test',
        }
      }
    },
    ...getDefaultResolvers(),
  }
}


