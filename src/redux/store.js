import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import watcherSaga from './root-saga';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(watcherSaga);

export default store;
