'use client';

import { ThemeProvider, createTheme } from '@mui/material';

// Customize Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#f9fafb',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d1d5db',
            },
          },
        },
      },
    },
  },
});

interface CheckoutThemeProviderProps {
  children: React.ReactNode;
}

export default function CheckoutThemeProvider({ children }: CheckoutThemeProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
