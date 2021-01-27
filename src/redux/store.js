import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';

import { persistStore } from 'redux-persist';

import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';

import rootSaga from './root-saga';


const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware]; //expects an array.logger accepts infinite number of middlewares

export const store = createStore(rootReducer, applyMiddleware(...middlewares)) //spreads out all the values in the [] array into this function call as individual arguments

sagaMiddleware.run(rootSaga) //to run each individual saga
 
export const persistor = persistStore(store)

export default {store, persistor};