import { Button } from "@mui/material"
import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import HookForm from "./Form/RecipeForm";
import Recipe from "../../types/Recipe";
import { userCotext } from "../appLayot";
import { AppDispach } from "./RecipesStore";
import { AddRecipes, fetchRecipes } from "./recipesSlice";


export default()=>{
const [open,setopen]=useState(false)
const dispatch=useDispatch<AppDispach>()
const {user} = useContext(userCotext);
    
const handleAdd = async (recipe: Recipe) => {
    await dispatch(AddRecipes(recipe));
    dispatch(fetchRecipes());
};
        
    return (
        <div>
            {user.id&&<Button color="primary" variant="contained" onClick={() => setopen(true)} style={{
                    position: 'fixed',
                    bottom: '20px', 
                    right: '20px',     
                    zIndex: 1000       
                }}
>
                Add Recipe
            </Button>}
            {open && <HookForm addToList={handleAdd} />}
        </div>
    );

}
