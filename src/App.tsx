import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Routes} from './routes';

import AppLoading from 'expo-app-loading';

import {AuthProvider, useAuth} from './hooks/auth';

import {ThemeProvider} from 'styled-components';
import theme from './global/styles/theme';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';


export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  const {userStorageLoading} = useAuth();

  if(!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ThemeProvider theme={theme}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
      </ThemeProvider>
    </>
  );
}