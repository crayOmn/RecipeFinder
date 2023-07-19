import React from 'react';
import {Text} from '@ui-kitten/components';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { RecipeDetailsScreenProps } from '../navigation/types';

const RecipeDetailsScreen: React.FC<RecipeDetailsScreenProps> = ({route}) => {
  const {recipe} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={recipe.image} style={styles.recipeCover} />
      <Text category="h4" style={styles.heading}>
        Recipe Details
      </Text>
      <Text category="h6">{recipe.title}</Text>
      <Text>{recipe.description}</Text>
      <Text category="h6">Ingredients</Text>
      <Text>{recipe.ingredients}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    marginBottom: 16,
  },
  recipeCover: {
    width: '100%',
    height: 300,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default RecipeDetailsScreen;