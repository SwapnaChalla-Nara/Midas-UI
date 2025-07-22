import { createTheme } from '@mui/material/styles';

// Create a theme that follows government website standards
// Professional, accessible, and clean design
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Professional blue similar to government sites
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#424242', // Neutral gray
      light: '#6d6d6d',
      dark: '#212121',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#424242',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', // Remove all caps for better accessibility
      fontWeight: 500,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    // Ensure proper contrast ratios for accessibility
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44, // Minimum touch target size for accessibility
          '&:focus': {
            outline: '2px solid #1976d2',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            fontSize: '1rem',
          },
          '& .MuiInputBase-root': {
            minHeight: 44, // Minimum touch target size
          },
        },
      },
    },
    // Ensure proper focus indicators for accessibility
    MuiLink: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: '2px solid #1976d2',
            outlineOffset: '2px',
          },
        },
      },
    },
  },
});