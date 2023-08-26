import { useTheme } from '@emotion/react';
import {
  Box,
  Container,
  Grid, Link,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { nofifySucess, notifyError } from '../../../utils/toast/toast';
import ButtonStyled from '../../ButtonStyled';
import TextFieldStyled from '../../TextFieldStyled';
import Title from '../../Title';

function SingUpForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  function addNewUser(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSingin(e) {
    e.preventDefault();

    if (!form.nome || !form.email || !form.senha) {
      notifyError('Preencha todos os campos!')

      return
    }

    try {
      await api.post('/usuarios', form)

      nofifySucess('Cadastrado com sucesso! Redirecionando para o Login')

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      notifyError(error.response.data)
    }

    clearForm();

  }

  function clearForm() {
    setForm({
      nome: '',
      email: '',
      senha: ''
    });
  }

  return (
    <Grid item xs={12} sm={6} square >
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
        <Title texto='Cadastre-se' props={{ textAlign: 'center' }} />
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: {
              xs: '70%',
              sm: '70%',
              md: '90%',
              lg: '100%'
            },
            mt: 1
          }}
          onSubmit={handleSingin}
        >
          <TextFieldStyled
            id='nome'
            name='nome'
            label='Nome'
            type='text'
            value={form.nome}
            onChange={e => addNewUser(e)}
          />
          <TextFieldStyled
            id='email'
            name='email'
            label='E-mail'
            type='email'
            value={form.email}
            onChange={e => addNewUser(e)}
          />
          <TextFieldStyled
            id='senha'
            name='senha'
            label='Senha'
            type='password'
            value={form.senha}
            onChange={e => addNewUser(e)}
          />
          <ButtonStyled
            text='Cadastrar'
            type='submit'
            sx={{ mt: '72px', mb: '8px', backgroundColor: `${theme.color.green200}` }}
          />
          <ButtonStyled
            text='Cancelar'
            type='button'
            sx={{ mb: '96px', backgroundColor: `${theme.color.red100}` }}
            onClick={() => navigate("/")}
          />
          <Typography>
            Já tem cadastro?
            <Link href="/" underline='none'>
              &nbsp;Clique aqui!
            </Link>
          </Typography>
        </Box>
      </Container>
    </Grid>
  );
}

export default SingUpForm;