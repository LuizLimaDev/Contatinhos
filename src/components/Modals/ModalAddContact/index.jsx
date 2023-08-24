import { useTheme } from "@emotion/react";
import { Box, Container, Modal, Paper } from "@mui/material";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import closeModal from "../../../assets/close.png";
import useGetContacts from "../../../hooks/useGetContacts";
import api from "../../../services/api";
import ButtonStyled from "../../ButtonStyled";
import TextFieldStyled from "../../TextFieldStyled";
import Titulo from "../../Title";
import { notifyError } from "../../../utils/toast/toast";

function ModalAddContact({ openModal, handleCloseModal, setRows }) {
  const theme = useTheme();
  const [user, setUser] = useState({
    nome: '',
    telefone: '',
    email: ''
  });
  const [value] = useLocalStorage('token');
  const { getContacts } = useGetContacts();

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  function handleSetNewUser(e) {
    //set error vazio - para limar os erros qdo corrigidos

    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user.nome || !user.telefone || !user.email) {
      notifyError('Preencha todos os campos!')
      return;
    }

    try {
      await api.post('/contatos', user, {
        headers: {
          'Authorization': `${value}`
        }
      })

    } catch (error) {
      notifyError(error.response)
    }

    handleCloseModal();
    clearForm();

    const allContacts = await getContacts();
    setRows([...allContacts]);
  }

  function clearForm() {
    //set error vazio - para limar os erros qdo corrigidos

    setUser({
      nome: '',
      telefone: '',
      email: ''
    })
  }

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
    >
      <Container maxWidth='xs' sx={modalStyle}>
        <Paper sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '494px',
          pb: '75px'
        }}>
          <img
            src={closeModal}
            alt="fechar modal"
            style={{ width: '16px', alignSelf: 'flex-end', margin: '24px' }}
            onClick={handleCloseModal}
          />
          <Box
            component='form'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0 58px'
            }}
            onSubmit={handleSubmit}
          >
            <Titulo texto='Novo Contato' props={{ textAlign: 'center', mb: '40px' }} />
            <TextFieldStyled
              id='nome'
              name='nome'
              label='Nome'
              type='text'
              value={user.nome}
              onChange={e => handleSetNewUser(e)}
            />
            <TextFieldStyled
              id='email'
              name='email'
              label='E-mail'
              type='email'
              value={user.email}
              onChange={e => handleSetNewUser(e)}
            />
            <TextFieldStyled
              id='telefone'
              name='telefone'
              label='Telefone'
              type='tel'
              value={user.telefone}
              onChange={e => handleSetNewUser(e)}
            />
            <ButtonStyled
              text='Adicionar'
              type='submit'
              sx={{ mt: '72px', backgroundColor: `${theme.color.green200}` }}
            />
            <ButtonStyled
              text='Limpar'
              type='button'
              sx={{ mt: '8px', backgroundColor: `${theme.color.red100}` }}
              onClick={clearForm}
            />
          </Box>
        </Paper>
      </Container>
    </Modal>
  );
}

export default ModalAddContact;