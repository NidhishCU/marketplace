import React, { useState } from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
function App(): React.JSX.Element {

  return (
    <NavigationContainer>
    <StackNavigation/>
    </NavigationContainer>
   
  );
}



export default App;
