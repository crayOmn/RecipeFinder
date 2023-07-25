import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './types';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import {ToastProvider} from 'react-native-toast-notifications';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <ToastProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Recipe Finder'}}
          />
          <Stack.Screen
            name="RecipeDetails"
            component={RecipeDetailsScreen}
            options={{title: 'Recipe Details'}}
          />
          <Stack.Screen
            name="AddRecipe"
            component={AddRecipeScreen}
            options={{title: 'Add Recipe'}}
          />
        </Stack.Navigator>
      </ToastProvider>
    </NavigationContainer>
  );
};

export default Navigation;