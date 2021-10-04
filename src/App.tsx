import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';


import AppLoading from 'expo-app-loading';

import {AuthProvider} from './hooks/auth';
import {SignIn} from './pages/SignIn';


import { ThemeProvider } from 'styled-components';
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

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
}