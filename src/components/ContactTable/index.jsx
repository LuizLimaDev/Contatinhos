import { useTheme } from "@emotion/react";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import deleteContact from "../../assets/delete.png";
import editContact from "../../assets/edit.png";
import useGetContacts from "../../hooks/useGetContacts";
import api from "../../services/api";
import { notifyError } from "../../utils/toast/toast";
import ModalAddContact from "../Modals/ModalAddContact/index";
import ModalDelete from "../Modals/ModalDelete";
import ModalEditar from "../Modals/ModalEditar/index";

function TabelaContatos() {
  const theme = useTheme();
  const [value] = useLocalStorage('token');
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAddContact, setOpenModalAddContact] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { getContacts } = useGetContacts();
  const [rows, setRows] = useState([])
  const [currentContact, setCurrentContact] = useState([])

  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => setOpenModalEdit(false);
  const handleOpenModalAddContact = () => setOpenModalAddContact(true);
  const handleCloseModalAddContact = () => setOpenModalAddContact(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  useEffect(() => {
    async function getAllContacts() {
      const allContacts = await getContacts();

      setRows([...allContacts])
    }

    getAllContacts();
  }, [getContacts]);

  function handleOpenConfirmDelete(contact) {
    setCurrentContact(contact);
    handleOpenModalDelete();
  }

  function handleEditContact(contact) {
    setCurrentContact(contact);
    handleOpenModalEdit();
  }


  async function handleDeleContact() {
    try {
      await api.delete(`/contatos/${currentContact.id}`, {
        headers: {
          'Authorization': `${value}`
        }
      });
    } catch (error) {
      notifyError(error.response.data)
    }

    setRows(rows.filter((contact) => {
      return contact.id !== currentContact.id;
    }))
    setOpenModalDelete(false);
  }

  return (
    <Container maxWidth='md'>
      <Button
        variant="contained"
        type="button"
        sx={{
          width: '235px',
          height: '50px',
          marginTop: '104px',
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'capitalize',
          backgroundColor: `${theme.color.green200}`
        }}
        onClick={handleOpenModalAddContact}
      >
        Adicionar
      </Button>
      <ModalAddContact
        openModal={openModalAddContact}
        handleCloseModal={handleCloseModalAddContact}
        setModal={setOpenModalAddContact}
        setRows={setRows}
      />
      <TableContainer component={Paper} sx={{ marginTop: '36px' }}>
        <Table>
          <TableHead sx={{ backgroundColor: `${theme.color.gray200}` }}>
            <TableRow>
              <TableCell sx={{ paddingLeft: '32px' }}>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {rows.map(
              row => (
                <TableRow key={row.id} >
                  <TableCell sx={{ paddingLeft: '32px' }}>{row.nome}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.telefone}</TableCell>
                  <TableCell align="right">
                    <img
                      src={editContact}
                      alt="editar contato"
                      style={{ marginRight: '16px' }}
                      onClick={() => handleEditContact(row)}
                    />
                    <ModalEditar
                      openModalEdit={openModalEdit}
                      handleCloseModalEdit={handleCloseModalEdit}
                      currentContact={currentContact}
                      setRows={setRows}
                    />
                    <img
                      src={deleteContact}
                      alt="deletar contato"
                      style={{ marginRight: '32px' }}
                      onClick={() => handleOpenConfirmDelete(row)}
                    />
                    <ModalDelete
                      openModal={openModalDelete}
                      handleCloseModal={handleCloseModalDelete}
                      handleDeleContact={handleDeleContact}
                      currentContact={currentContact}
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container >
  );
}

export default TabelaContatos;