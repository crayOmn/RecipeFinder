import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Recipe} from '../../components/RecipeCard';
import mapApiResponseToRecipe from '../../utils/objMapper';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const initialState = {
  recipes: [] as Recipe[],
  searchResult: [] as Recipe[],
  loading: true,
  error: null as string | null,
};

export const fetchRecipesFromAPI = createAsyncThunk(
  'recipes/fetch',
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search.php?f=b`);
      return mapApiResponseToRecipe(response.data.meals);
    } catch (error) {
      throw new Error('Failed to fetch recipes');
    }
  },
);

export const searchRecipesFromAPI = createAsyncThunk(
  'recipes/searchRecipes',
  async (keyword: string) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/search.php?s=${keyword}`,
      );
      return mapApiResponseToRecipe(response.data.meals);
    } catch (error) {
      throw new Error('Failed to search recipes');
    }
  },
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    markFavorite: (state, action) => {
      const recipeId = action.payload;
      const recipe = state.recipes.find(r => r.id === recipeId);

      if (recipe) {
        recipe.favorite = !recipe.favorite;
      }
    },
    cancelSearch: state => {
      state.searchResult = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipesFromAPI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipesFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      })
      .addCase(searchRecipesFromAPI.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRecipesFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload;
      })
      .addCase(searchRecipesFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to search recipes.';
      });
  },
});

export const {markFavorite, cancelSearch} = recipeSlice.actions;

export default recipeSlice.reducer;