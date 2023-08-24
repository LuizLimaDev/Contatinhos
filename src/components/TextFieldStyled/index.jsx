import { useTheme } from "@emotion/react";
import { TextField } from "@mui/material";

function TextFieldStyled({ id, name, label, type, value, onChange }) {
  const theme = useTheme();

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      name={name}
      label={label}
      type={type}
      autoFocus
      sx={{ backgroundColor: `${theme.color.gray100}` }}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextFieldStyled;