import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AutoUpdate from './components/AutoUpdate';

import presetColors from '../assets/styles/colors'

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={presetColors.primary} />
      <AppProvider>
        <AutoUpdate />

        <Routes />

      </AppProvider>
    </NavigationContainer>
  );

};
export default App;
