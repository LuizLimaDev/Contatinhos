import { Typography, Link, Box } from "@mui/material";
import logout from "../../assets/logout.png";
import { useTheme } from "@emotion/react";
import { useLocalStorage } from 'react-use';

function Header() {
  const theme = useTheme();
  const [value, setValue, remove] = useLocalStorage('token');

  return (
    <header>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: `${theme.color.blue200}`,
          height: '70px'
        }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: '24px',
            color: `${theme.color.white200}`,
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}
        >
          Contatinhos
        </Typography>
        <Link href="/" underline="none">
          <img
            src={logout}
            alt="botao de logout"
            style={{ position: 'absolute', top: '26px', right: '32px' }}
            onClick={() => remove()}
          />
        </Link>
      </Box>
    </header>
  );
}

export default Header;