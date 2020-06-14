import {combineReducers} from "redux";
import loginPage from "./loginPage";
import caretakerPage from "./caretakerPage";
import ownerPage from "./ownerPage";

const rootReducer = combineReducers({
  loginPage,
  caretakerPage,
  ownerPage,
});

export default rootReducer;
