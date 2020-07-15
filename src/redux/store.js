import {createStore,applyMiddleware} from 'redux';
import looger from 'redux-logger';

import rootReducer from './root-reducer';
const middlwares = [looger];

const store = createStore(rootReducer,applyMiddleware(...middlwares));

export default store;