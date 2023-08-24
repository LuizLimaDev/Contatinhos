import { Button } from "@mui/material";


function ButtonStyled({ text, type, sx, onClick }) {

  return (
    <Button
      type={type}
      fullWidth
      variant="contained"
      sx={{ ...sx, padding: '16px', fontSize: '16px', fontWeight: 'bold' }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default ButtonStyled;