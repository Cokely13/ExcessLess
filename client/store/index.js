import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import treatsReducer from './allTreatsStore'
import userReducer from './allUsersStore'
import weeksReducer from './allWeeksStore'
import singleTreatReducer from './singleTreatStore'
import singleUserReducer from './singleUserStore'
import singleWeekReducer from './singleWeekStore'
import auth from './auth'

const reducer = combineReducers({ auth,
allTreats: treatsReducer,
allUsers: userReducer,
allWeeks: weeksReducer,
singleTreat: singleTreatReducer,
singleUser: singleUserReducer,
singleWeekReducer: singleWeekReducer })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
