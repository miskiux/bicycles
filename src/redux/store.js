import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import rootReducer from './root-reducer';

const middlewares = [logger, thunk]; //expects an array.logger accepts infinite number of middlewares

export const store = createStore(rootReducer, applyMiddleware(...middlewares)) //spreads out all the values in the [] array into this function call as individual arguments

export const persistor = persistStore(store)

export default {store, persistor};