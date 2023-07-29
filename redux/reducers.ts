import { combineReducers } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipeSlice';

const rootReducer = combineReducers({
  recipes: recipesReducer
});
export default rootReducer;