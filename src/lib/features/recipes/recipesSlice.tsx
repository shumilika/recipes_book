import { db } from '@/services/firebase.config';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

interface Ingredient {
  amount: number;
  units: string;
  name: string;
}

interface Recipe {
  id: string;
  img_url: string;
  title: string;
  ingredients: Ingredient[];
  cooking_steps: string[];
  category: string;
  origin: string;
}

interface RecipesState {
  recipesList: Recipe[];
  loading: boolean;
  error: string | null;
  currentRecipe: Recipe | null;
}

const initialState: RecipesState = {
  recipesList: [],
  currentRecipe: null,
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

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id: string) => {
    const docRef = doc(db, 'recipes', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id, ...docSnap.data() } as Recipe;
    } else {
      throw new Error('Recipe not found');
    }
  }
);

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
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      });
  },
});

export default recipesSlice.reducer;
