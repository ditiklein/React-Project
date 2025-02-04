import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Recipe from "../../types/Recipe";
import { Rootstore } from "./RecipesStore";

export const fetchRecipes = createAsyncThunk('recipes/fetch', async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:3000/api/recipes');
        return response.data as Recipe[];
    } catch (error) {
        return thunkAPI.rejectWithValue(error
        );
    }
}
);
export const AddRecipes = createAsyncThunk('recipes/add', async (newRecipe: Recipe, thunkAPI) => {
    try {
        const { authorId, ...recipeWithoutAuthorId } = newRecipe
   

        const response = await axios.post('http://localhost:3000/api/recipes', recipeWithoutAuthorId, {
            headers: {
                'user-id':authorId
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);
export const deleteRecipe = createAsyncThunk(
    'recipes/delete',
    async ({ recipeId, userId }: { recipeId: number; userId: number }, thunkApi) => {
        try {
            await axios.delete('http://localhost:3000/api/recipes', {
                headers: { 'user-id': userId },
                data: { id: recipeId }
            });
            return recipeId;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkApi.rejectWithValue(error.message); // מחזירים טקסט במקום אובייקט
            }
            return thunkApi.rejectWithValue('Failed to delete recipe');
        }
    }
);
const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [] as Recipe[],
        loading: false,
        error: null as string | null,
    },
    reducers: {
        setRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.recipes = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message || 'Failed to fetch recipes';
            })

            .addCase(AddRecipes.pending, (state) => {
               state.loading = true;
                state.error = null;
            })

            .addCase(AddRecipes.fulfilled, (state, action: PayloadAction<Recipe>) => {
                state.loading = false;
                state.recipes.push(action.payload); 

            })
            // כאשר ההוספה נכשלת
            .addCase(AddRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message || 'Failed to add recipe';
            });
        }

    });


export const selectRecipes = (state: Rootstore) => state.recipes
export default recipesSlice.reducer;
