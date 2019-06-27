import {createStore, bindActionCreators, applyMiddleware, compose, combineReducers} from 'redux';
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import * as currentTime from './modules/current_time';
import * as currentUser from './modules/current_user';
import * as record from './modules/record';
import DevTools from './devtools/devtools';
import sagas from './sagas'

//日志输出
const loggerMiddleware = createLogger()
const baseMiddleware = (store) => (next) => (action) => {
    action && next(action)
}

//异步处理
const sagaMiddleware = createSagaMiddleware()

//中间件
const middleware = [ baseMiddleware, loggerMiddleware, sagaMiddleware]

//扩展中间件
const extendedCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
)(createStore)

//reducers
const reducer = combineReducers({
    currentTime: currentTime.reducer,
    currentUser: currentUser.reducer,
    record: record.reducer
})

//store
export const store = extendedCreateStore(reducer);

//actions
export const actions = {
    currentTime: bindActionCreators(
        currentTime.actions,
        store.dispatch
    ),
    currentUser: bindActionCreators(
        currentUser.actions,
        store.dispatch
    ),
    record: bindActionCreators(
        record.actions,
        store.dispatch
    )
}

//异步处理
sagaMiddleware.run(sagas)
