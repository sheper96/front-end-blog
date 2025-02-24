import { applyMiddleware, combineReducers, createStore,} from "redux";
import {thunk} from "redux-thunk";
import { appReducer} from "./app-reducer";
import { authReducer} from "../features/Login/auth-reducer";
import { postsReducer } from "../features/MainPage/posts-reducer";

const rootReducer = combineReducers({
  app: appReducer,
  auth:authReducer,
  posts:postsReducer,
//   cards:cardsReducer
})


export const store = createStore(rootReducer,applyMiddleware(thunk))




window.store = store;
