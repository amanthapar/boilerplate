import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';

export const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggingMiddleware)
);
