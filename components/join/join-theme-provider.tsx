'use client';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      color: '#000000',
    },
    body1: {
      fontWeight: 400,
      color: '#666666',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bdbdbd',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#000000',
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#666666',
            fontWeight: 400,
            '&.Mui-focused': {
              color: '#000000',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '1rem',
          borderRadius: '24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#f5f5f5',
          color: '#666666',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
          '&:disabled': {
            backgroundColor: '#f5f5f5',
            color: '#bdbdbd',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 4,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
});

interface JoinThemeProviderProps {
  children: React.ReactNode;
}

export default function JoinThemeProvider({ children }: JoinThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
