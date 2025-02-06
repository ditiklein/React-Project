import { Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Recipe from "../../../types/Recipe";
import { useContext } from "react";
import { UserCotext } from "../../appLayot";
import schema from "./RecipeSchema";
import DynamicFieldArray from "./DynamicFileds";

const HookForm = ({ addToList }: { addToList: (data: Recipe) => void }) => {
  const { user } = useContext(UserCotext);
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    reset,
  } = useForm<Recipe>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      products: [""],
      ingredients: [""],
      instructions: "",
      
    },
  });

  const onSubmit = (data: Recipe) => {
    data.authorId = +user.id;
    addToList(data);
    reset();
  };

  return (
    <Dialog open={true} onClose={() => {}} fullWidth maxWidth="sm">
      <DialogTitle>Add New Recipe</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            label="Instructions"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("instructions")}
            error={!!errors.instructions}
            helperText={errors.instructions?.message}
          />

          <DynamicFieldArray name="products" label="Products" control={control} register={register} errors={errors} />
          <DynamicFieldArray name="ingredients" label="Ingredients" control={control} register={register} errors={errors} />

          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Submit Recipe
            </Button>
            <Button onClick={() => reset()} color="secondary">
              Reset
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HookForm;
