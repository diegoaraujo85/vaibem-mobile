import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import presetColors from '../../assets/styles/colors'

import SignIn from '../pages/SignIn';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: presetColors.background },
      }}
      initialRouteName="SignIn"
    >
      <Auth.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: 'Logon' }}
      />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
