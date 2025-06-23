import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import '@locales/i18n.ts';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);