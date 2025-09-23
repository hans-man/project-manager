import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#27E4A4', // A bright green for accents
    },
    background: {
      default: '#1A2532', // Dark blue/charcoal
      paper: '#243447',   // A slightly lighter shade for surfaces like cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A9B2BC', // A lighter grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #3A4A5D',
        },
      },
    },
  },
});

export default theme;
