import { Typography } from "@mui/material";

function Title({ texto, props }) {
  return (
    <Typography
      variant='h1'
      component='h1'
      fontSize='32px'
      fontWeight='bold'
      sx={props}
    >
      {texto}
    </Typography >
  );
}

export default Title;