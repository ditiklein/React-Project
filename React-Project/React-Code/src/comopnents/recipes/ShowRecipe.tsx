import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Recipe from "../../types/Recipe";
import { Box, Typography, Card, CardContent, Divider, List, ListItem, ListItemText } from "@mui/material";
import { Rootstore } from "./RecipesStore";

export default () => {
    const { id } = useParams();  
    const recipes = useSelector((state: Rootstore) => state.recipes.recipes);
    
    const recipe: Recipe | undefined = recipes.find(r => String(r.id) === id);

    if (!recipe) {
        return <Typography variant="h6" color="error">Recipe not found.</Typography>;
    }

    return (
        <Box sx={{
 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'flex-start', 
            height: 'auto',
            paddingTop: '5vh', 
            marginRight: "20%" ,
        }}>
        
        <Card sx={{ maxWidth: 1000, width: '95%', padding: 3, boxShadow: 3, borderRadius: 3, backgroundColor: '#f8f8f8', maxHeight: '60vh', overflowY: 'auto' }}>
            <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
                                    {recipe!.title}
                                </Typography>

                <Typography variant="h6" color="textSecondary" gutterBottom>
                    {recipe.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
                    Ingredients:
                </Typography>
                <List>
                    {recipe.ingredients.map((ingredient, index) => (
                        <ListItem key={index} sx={{ padding: 0 }}>
                            <ListItemText primary={`✔️ ${ingredient}`} />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
                    Instructions:
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    {recipe.instructions}
                </Typography>

                <Typography variant="h6" sx={{ marginLeft: 1 }}>Appetite! 😋😊</Typography>
                </CardContent>
        </Card>
    </Box>
);
};
