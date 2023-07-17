import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import logger from "./middleware/logger";

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
