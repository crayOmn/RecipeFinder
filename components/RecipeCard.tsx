import React from 'react';
import { Card, Text, Button } from '@ui-kitten/components';
import { Image, StyleSheet } from "react-native";


interface RecipeCardProps {
  recipe: {
    image: any;
    title: string;
    description: string;
    ingredients: string;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card style={styles.card}>
      <Image source={recipe.image} style={styles.recipeImage} />
      <Text category="h6" style={styles.recipeTitle}>
        {recipe.title}
      </Text>
      <Button style={styles.readMoreButton}>Read More</Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  recipeTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipeDescription: {
    marginBottom: 8,
  },
  readMoreButton: {
    marginTop: 8,
  },
});

export default RecipeCard;