import { useDispatch, useSelector } from "react-redux";
import { AppDispach, Rootstore } from "./RecipesStore";
import { useEffect } from "react";
import { deleteRecipe, fetchRecipes } from "./recipesSlice";
import Recipe from "../../types/Recipe";
import { CircularProgress, Box, Typography, Button, IconButton } from "@mui/material"; 
import { Link, Outlet } from "react-router-dom";  
import AddRecipe from "./AddRecipe";
import { Delete } from "@mui/icons-material";
import {FaUtensils} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

export default () => {
    const dispatch = useDispatch<AppDispach>();
    const { recipes, loading, error } = useSelector((state: Rootstore) => state.recipes);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const handleDelete = async (item: Recipe) => {
        await dispatch(deleteRecipe({ recipeId: item.id, userId: item.authorId }));
        await dispatch(fetchRecipes());
        navigate('/RecipesList');

    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    המתכונים טוענים...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    חלה שגיאה בטעינת המתכונים.
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ 
                position: 'fixed', 
                top: 68, 
                right: 0, 
                width: 250, 
                height: '100vh', 
                bgcolor: "#f4f4f4", 
                padding: 2, 
                display: 'flex', 
                flexDirection: 'column',
                overflowY: 'auto'  ,

            }}>
                <Typography    variant="h6" 
  gutterBottom 
  color="black" 
sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaUtensils style={{ marginRight: 8 }} /> Recipes List
                </Typography>
                {recipes.map((r: Recipe) => (
    <Link key={r.id} to={`/recipes/${r.id}`} style={{ textDecoration: 'none' }}>
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 2, 
                padding: 2, 
                borderRadius: 2, 
                bgcolor: 'background.paper', 
                boxShadow: 1, 
                '&:hover': { 
                    transform: 'scale(1.02)', 
                    boxShadow: 4, 
                },
                transition: 'transform 0.2s, box-shadow 0.2s'
            }}
        >
            <Button 
                variant="outlined" 
                fullWidth 
                sx={{ 
                    marginRight: 2, 
                    color: 'text.primary', 
                    fontWeight: 'bold', 
                    textTransform: 'capitalize', 
                    borderRadius: 1 
                }}
                key={`button-${r.id}`} // הוספת key לכל Button
            >
                {r.title}
            </Button>

            <IconButton 
                sx={{ 
                    color: 'primary.main', 
                    minWidth: 'auto', 
                    padding: '6px', 
                    '&:hover': { 
                        backgroundColor: 'primary.light', 
                        color: 'white' 
                    } 
                }} 
                onClick={(e) => { 
                    e.stopPropagation(); 
                    handleDelete(r); 
                }}
                key={`icon-button-${r.id}`} // הוספת key לכל IconButton
            >
                <Delete />
            </IconButton>
        </Box>
    </Link>
))}

            </Box>
            <Outlet />
            <AddRecipe />
        </>
    );
};
