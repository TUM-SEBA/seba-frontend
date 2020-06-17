import {combineReducers} from "redux";
import loginPage from "./loginPage";
import caretakerPage from "./caretakerPage";
import welcomePage from "./welcomePage";
import ownerPage from "./ownerPage";

const rootReducer = combineReducers({
  loginPage,
  caretakerPage,
  welcomePage,
  ownerPage,
});

export default rootReducer;
