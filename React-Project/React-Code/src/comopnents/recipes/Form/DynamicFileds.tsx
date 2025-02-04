import { Button, Box, TextField, Typography } from "@mui/material";
import { useFieldArray, Control, FieldErrors, UseFormRegister } from "react-hook-form";
import Recipe from "../../../types/Recipe";
interface DynamicFieldArrayProps {
    name: "products" | "ingredients"; 
    label: string;
    control: Control<Recipe>;
    register: UseFormRegister<Recipe>;
    errors: FieldErrors<Recipe>;
  }
  

const DynamicFieldArray = ({ name, label, control, register, errors }: DynamicFieldArrayProps) => {
  const { fields, append, remove } = useFieldArray({ control,  name,  // זה מעודף מ name: as never
  });

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      {fields.map((item, index) => (
        <Box key={item.id} sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <TextField
            {...register(`${name}.${index}` as const)}
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors[name]?.[index]}
            helperText={errors[name]?.[index]?.message}
          />
          {index > 0 && (
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={() => remove(index)}
              sx={{ marginLeft: 1 }}
            >
              Remove
            </Button>
          )}
        </Box>
      ))}
      <Button
        type="button"
        variant="contained"
        color="primary"
        sx={{ marginTop: 1 }}
        onClick={() => append("")}
      >
        Add {label}
      </Button>
    </Box>
  );
};

export default DynamicFieldArray;
