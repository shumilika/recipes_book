import { db } from '@/services/firebase.config';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';


interface Recipe {
  id: string;
  img_url: string;
  title: string;
  ingredients: string[];
  cooking_steps: string[];
  category: string;
  origin: string;
}

interface RecipesState {
  recipesList: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipesList: [],
  loading: false,
  error: null,
};


export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const querySnapshot = await getDocs(collection(db, 'recipes'));
  const recipes: Recipe[] = [];
  querySnapshot.forEach((doc) => {
    recipes.push({
      id: doc.id,
      ...doc.data(),
    } as Recipe);
  });
  return recipes;
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.recipesList = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export default recipesSlice.reducer;
