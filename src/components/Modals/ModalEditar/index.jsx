import { useTheme } from "@emotion/react";
import { Box, Modal, Paper, } from "@mui/material";
import closeModal from "../../../assets/close.png";
import ButtonStyled from "../../ButtonStyled";
import TextFieldStyled from "../../TextFieldStyled";
import Titulo from "../../Title";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useLocalStorage } from "react-use";
import useGetContacts from "../../../hooks/useGetContacts";
import { notifyError } from "../../../utils/toast/toast";

function ModalEditar({ openModalEdit, handleCloseModalEdit, currentContact, setRows }) {
  const theme = useTheme();
  const [value] = useLocalStorage('token');
  const [contactToEdit, setContactToEdit] = useState({
    nome: '',
    email: '',
    telefone: ''
  });
  const { getContacts } = useGetContacts();
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  useEffect(() => {
    if (currentContact) {
      const { nome, email, telefone } = currentContact;

      setContactToEdit({ nome, email, telefone })
    }
  }, [currentContact])

  function handleSetNewUser(e) {
    setContactToEdit({
      ...contactToEdit,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put(`/contatos/${currentContact.id}`, contactToEdit, {
        headers: {
          'Authorization': `${value}`
        }
      })

    } catch (error) {
      notifyError(error.response)
    }

    handleCloseModalEdit();
    clearForm();

    const allContacts = await getContacts();
    setRows([...allContacts]);
  }

  function clearForm() {
    setContactToEdit({
      nome: '',
      email: '',
      telefone: ''
    });
  }

  return (
    <Modal
      open={openModalEdit}
      onClose={handleCloseModalEdit}
    >
      <Box maxWidth='xs' sx={modalStyle}>
        <Paper sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '494px',
          pb: '74px',
        }}>
          <img
            src={closeModal}
            alt="fechar modal"
            style={{ width: '16px', alignSelf: 'flex-end', margin: '24px' }}
            onClick={handleCloseModalEdit}
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
            <Titulo texto='Editar Contato' props={{ textAlign: 'center', mb: '40px' }} />
            <TextFieldStyled
              id='nome'
              name='nome'
              label='nome'
              type='text'
              value={contactToEdit.nome}
              onChange={e => handleSetNewUser(e)}
            />
            <TextFieldStyled
              id='email'
              name='email'
              label='E-mail'
              type='email'
              value={contactToEdit.email}
              onChange={e => handleSetNewUser(e)}
            />
            <TextFieldStyled
              id='tel'
              name='telefone'
              label='Telefone'
              type='tel'
              value={contactToEdit.telefone}
              onChange={e => handleSetNewUser(e)}
            />
            <ButtonStyled
              text='Salvar'
              type='submit'
              sx={{ mt: '72px', backgroundColor: `${theme.color.green200}` }}
            />
            <ButtonStyled
              text='Cancelar'
              type='button'
              sx={{ mt: '8px', backgroundColor: `${theme.color.red100}` }}
              onClick={handleCloseModalEdit}
            />
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}

export default ModalEditar;