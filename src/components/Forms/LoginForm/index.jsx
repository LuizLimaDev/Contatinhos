import { useTheme } from '@emotion/react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import api from '../../../services/api';
import ButtonStyled from '../../ButtonStyled';
import TextFieldStyled from '../../TextFieldStyled';
import Title from '../../Title/index';
import DefaultToast from '../../DefaultToast/DefaultToast';
import { notifyError } from '../../../utils/toast/toast';

function LoginForm() {
  const theme = useTheme();
  const [value, setValue] = useLocalStorage('token');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!email || !senha) {
      notifyError('Todos os campos são necessários')
      return;
    }

    try {
      const response = await api.post('/login', {
        email,
        senha,
      })

      const { token } = response.data
      setValue(`${token}`);
      navigate('/home');

    } catch (error) {
      notifyError(error.response.data)
    }
  }

  useEffect(() => {
    if (value) {
      navigate('/home');
    }
  }, [value, navigate]);

  return (
    <Grid item xs={12} sm={6} square>
      <DefaultToast />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: {
            sm: '100vw',
            md: '476px'
          },
          height: '100%'
        }}
      >
        <Typography
          variant='h3'
          component='h1'
          sx={{ marginBottom: '5rem', textAlign: 'center', textTransform: 'uppercase' }}
        >
          Contatinhos
        </Typography>
        <Typography variant='subtitle1' component='p'>
          Bem vindo
        </Typography>
        <Title texto='Faça o login com sua conta' />
        <Box
          component="form"
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: {
              xs: '70%',
              sm: '70%',
              md: '90%',
              lg: '100%'
            },
            mt: 1
          }}

          onSubmit={handleSubmit}
        >
          <TextFieldStyled
            id="email"
            name="email"
            label="E-mail"
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextFieldStyled
            id="pasword"
            name="pasword"
            label="Senha"
            type='password'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <ButtonStyled
            text='Login'
            type="submit"
            sx={{ mt: '72px', mb: '96px', backgroundColor: `${theme.color.green200}` }}
          />
          <Typography>
            Não tem cadastro?
            <Link href="/singup" underline='none'>
              &nbsp;Clique aqui!
            </Link>
          </Typography>
        </Box>
      </Container>
    </Grid>
  );
}

export default LoginForm;