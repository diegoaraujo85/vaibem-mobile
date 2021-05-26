import React, { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import presetColors from '../../assets/styles/colors'

import AutoUpdate from '../components/AutoUpdate';
import { useAuth } from '../hooks/auth';
import Establishment from '../pages/Establishment';
import User from '../pages/User';
import UserEdit from '../pages/UserEdit';
import EstablishmentEdit from '../pages/EstablishmentEdit';
import Settings from '../pages/Settings';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = createStackNavigator();

const Routes: React.FC = () => {
  const { user, checkStorageExpired, signOut } = useAuth();

  const [appState, setAppState] = useState(AppState.currentState);

  // verifica se os dados de login ainda estão válidos no AsyncStorage
  const storageExpiredCheck = useCallback(async () => {
    const storageExpired = await checkStorageExpired();

    if (storageExpired) {
      signOut();
    }
  }, [checkStorageExpired, signOut]);

  const handleStateChange = useCallback(
    async nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        storageExpiredCheck();

      }
      setAppState(nextAppState);
    },
    [storageExpiredCheck],
  );

  // verifica a mudança de estado do app e troca seu estado, backgrouns, ativo, inativo
  useEffect(() => {
    AppState.addEventListener('change', handleStateChange);

    return function cleanup() {
      AppState.removeEventListener('change', handleStateChange);
    };
  });

  interface TabProps {
    focused: boolean;
    color: string;
    size: number;
  }

  interface Route {
    name: string;
  }

  interface RouteProps {
    route: Route;
  }

  function HomeTabs() {
    return (
      <Tab.Navigator screenOptions={({ route }: RouteProps) => ({
        tabBarIcon: ({ focused, color, size }: TabProps) => {
          let iconName;

          if (route.name === 'Establishment') {
            iconName = focused
              ? 'md-business'
              : 'md-business-outline';
          } else if (route.name === 'User') {
            iconName = focused ? 'ios-people-sharp' : 'ios-people-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={String(iconName)} size={size} color={color} />;
        },

      })}
        tabBarOptions={{
          activeTintColor: '#7b18c1',
          inactiveTintColor: 'gray',
        }}
      >

        <Tab.Screen
          name="User"
          component={User}
          options={{ title: 'Usuários' }}
        />

        <Tab.Screen
          name="Establishment"
          component={Establishment}
          options={{ title: 'Estabelecimentos' }}
        />


      </Tab.Navigator>
    );
  }

  return (
    <>

      <AutoUpdate />

      <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: presetColors.background },
      }}>

        <Stack.Screen name="Home" component={HomeTabs} />

        <App.Screen
          name="UserEdit"
          component={UserEdit}
          options={{ title: 'UserEdit' }}
        />

        <App.Screen
          name="EstablishmentEdit"
          component={EstablishmentEdit}
          options={{ title: 'EstablishmentEdit' }}
        />

        <App.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Ajustes' }}
        />

      </Stack.Navigator>
    </>
  );
};

export default Routes;
