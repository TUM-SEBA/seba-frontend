import {combineReducers} from "redux";
import loginPage from "./loginPage";
import caretakerPage from "./caretakerPage";

const rootReducer = combineReducers({
  loginPage,
  caretakerPage,
});

export default rootReducer;
