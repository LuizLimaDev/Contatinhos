import { useTheme } from "@emotion/react";
import { Box, Modal, Paper, Typography } from "@mui/material";
import closeModal from "../../../assets/close.png";
import ButtonStyled from "../../ButtonStyled";
import Titulo from "../../Title";

function ModalDelete({ openModal, handleCloseModal, handleDeleContact, currentContact }) {
  const theme = useTheme();
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    px: 0
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
    >
      <Box maxWidth='xs' sx={modalStyle}>
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
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0 58px'
            }}
          >
            <Titulo
              texto='Confirma a exclusão?'
              props={{ textAlign: 'center', mb: '24px' }}
            />
            <Typography
              sx={{ textAlign: 'center', fontSize: '16px' }}
            >
              Deseja excluir o contato de <b>{`${currentContact.nome}`}</b>.
            </Typography>
            <ButtonStyled
              text='Excluir'
              type='button'
              sx={{ mt: '32px', backgroundColor: `${theme.color.green200}` }}
              onClick={handleDeleContact}
            />
            <ButtonStyled
              text='Cancelar'
              type='button'
              sx={{ mt: '8px', backgroundColor: `${theme.color.red100}` }}
              onClick={handleCloseModal}
            />
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}

export default ModalDelete;