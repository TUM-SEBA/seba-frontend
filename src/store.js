import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
