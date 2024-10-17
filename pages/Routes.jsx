import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import RecoveryPasswordScreen from './RecoveryPasswordScreen';
import CreateAccountScreen from './CreateAccountScreen';
import WorkoutScreen from './WorkoutScreen';

import { SessionContext } from '../contexts/SessionContext';
import { useContext } from 'react';

export default function Routes() {
  const { loading, user } = useContext(SessionContext);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='Login'
          component={user ? HomeScreen : LoginScreen}
        />
        <Stack.Screen name='Home' component={user ? HomeScreen : LoginScreen} />
        <Stack.Screen
          name='Workout'
          component={user ? WorkoutScreen : LoginScreen}
        />
        <Stack.Screen
          name='RecoveryPassword'
          component={RecoveryPasswordScreen}
        />
        <Stack.Screen name='CreateAccount' component={CreateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
