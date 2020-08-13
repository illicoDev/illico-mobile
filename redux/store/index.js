import { createStore, combineReducers } from "redux";

import booksReducer from "../reducers/BooksReducer";
import authReducer from "../reducers/authReducer";
import cartReducer from "../reducers/cartReducer";
import AddressReducer from '../reducers/AddressReducer';
const store = createStore(
  combineReducers({
    books: booksReducer,
    auth: authReducer,
    cart: cartReducer,
    addressBook: AddressReducer
  })
);

export default store;
