// ** Redux Imports
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
const store = configureStore({
  reducer: rootReducer
});

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export { store }
