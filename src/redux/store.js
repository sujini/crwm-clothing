import {createStore,applyMiddleware} from 'redux';
import looger from 'redux-logger';
import {persistStore} from 'redux-persist';

import rootReducer from './root-reducer';
const middlwares = [looger];

export const store = createStore(rootReducer,applyMiddleware(...middlwares));
export const persistor = persistStore(store);

export default {store,persistor};