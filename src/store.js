
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";  
import todoReducer from "./todos";

const rootReducer = combineReducers({
  todos: todoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;