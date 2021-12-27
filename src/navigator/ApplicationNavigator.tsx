import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Login';
import PhotoList from '../screen/PhotoList';
import DetailPhoto from '../screen/DetailPhoto';


const Stack = createNativeStackNavigator();

export default function ApplicationNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='PhotoList' component={PhotoList} />
        <Stack.Screen name='DetailPhoto' component={DetailPhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}