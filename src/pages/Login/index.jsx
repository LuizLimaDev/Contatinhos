import LoginForm from '../../components/Forms/LoginForm';
import backgroundLogin from '../../assets/imagem-login.png'
import { Grid } from '@mui/material';

export default function App() {

  return (
    <>
      <Grid
        container
        component="main"
        sx={{ height: '100vh' }}
      >
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'flex'
            },
            backgroundImage: `url('${backgroundLogin}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <LoginForm />
      </Grid >
    </>
  )
}
