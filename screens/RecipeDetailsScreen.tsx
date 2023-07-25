import React from 'react';
import {Text} from '@ui-kitten/components';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {RecipeDetailsScreenProps} from '../navigation/types';

const RecipeDetailsScreen: React.FC<RecipeDetailsScreenProps> = ({route}) => {
  const {recipe} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: recipe.image}} style={styles.recipeCover} />
      <View style={styles.heading}>
        <Text category="h4">Recipe Details</Text>
        <View style={styles.categoryBadge}>
          <Text>{recipe.category}</Text>
        </View>
      </View>
      <Text category="h6" style={styles.sectionHeader}>
        {recipe.title}
      </Text>
      <Text>{recipe.instructions}</Text>
      <Text category="h6" style={styles.sectionHeader}>
        Ingredients
      </Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={`${index}`}> - {ingredient}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  sectionHeader: {
    paddingVertical: 10,
  },
  categoryBadge: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 5,
    marginLeft: 10,
  },
});

export default RecipeDetailsScreen;