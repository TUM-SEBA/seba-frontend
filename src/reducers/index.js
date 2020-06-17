import {combineReducers} from "redux";
import loginPage from "./loginPage";
import caretakerPage from "./caretakerPage";
import welcomePage from "./welcomePage";

const rootReducer = combineReducers({
  loginPage,
  caretakerPage,
  welcomePage,
});

export default rootReducer;
