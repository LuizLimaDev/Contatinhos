import { Grid } from "@mui/material";
import SingUpBackground from "../../assets/imagem-cadastro.png";
import SingUpForm from "../../components/Forms/SingUpForm/index"
import DefaultToast from "../../components/DefaultToast/DefaultToast"

function SingUp() {

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <DefaultToast />
        <Grid
          item
          xs={6}
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'flex'
            },
            backgroundImage: `url('${SingUpBackground}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            order: 2
          }}
        >
        </Grid>
        <SingUpForm />
      </Grid >
    </>
  );
}

export default SingUp;