import React from 'react';
import {Routes} from './routes';
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import 'react-native-gesture-handler';
const App = () => {
  return (
    <ThemeProvider theme={theme.light}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
