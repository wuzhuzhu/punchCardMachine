import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import apolloClient from '../Config/apolloClientConfig'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    github: require('./GithubRedux').reducer,
    login: require('./LoginRedux').reducer,
    search: require('./SearchRedux').reducer,
    scan: require('./ScanRedux').reducer,
    apollo: apolloClient.reducer()
  })

  return configureStore(rootReducer, rootSaga)
}
