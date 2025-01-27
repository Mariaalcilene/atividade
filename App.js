import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './Home';

import Desafios from './Desafios';
import Curiosidades from './Curiosidades';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Desafios') {
              iconName = 'bar-chart';
            } else if (route.name === 'Curiosidades') {
              iconName = 'bulb';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Desafios" component={Desafios} />
        <Tab.Screen name="Curiosidades" component={Curiosidades} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
