import { createTheme } from '@mui/material/styles';

// A clean, simple Material Design 3-inspired light theme.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006974', // Example primary color from MD3 builder
    },
    secondary: {
      main: '#4A6365',
    },
    background: {
      default: '#F7F9FA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  // Optional: Add component overrides for a more custom feel
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F7F9FA',
          color: '#191C1C',
          boxShadow: 'none',
          borderBottom: '1px solid #DCE4E5'
        },
      },
    },
  },
});

export default theme;