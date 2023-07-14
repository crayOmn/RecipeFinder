import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<{ title: string; ingredients: string; }[]>([]);

  const handleSearch = () => {
    console.log('Search:', keyword);

    // Simulating search functionality with a mock array of recipes
    const mockRecipes = [
      { title: 'Pasta Carbonara', ingredients: 'Pasta, eggs, bacon, Parmesan cheese' },
      { title: 'Chicken Curry', ingredients: 'Chicken, curry powder, coconut milk, vegetables' },
      { title: 'Chocolate Chip Cookies', ingredients: 'Flour, butter, sugar, chocolate chips' },
      // Add more mock recipes here
    ];

    const filteredResults = mockRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipe Finder</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a recipe keyword"
        value={keyword}
        onChangeText={setKeyword}
      />
      <Button title="Search" onPress={handleSearch} />
      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeading}>Search Results:</Text>
          {searchResults.map((recipe, index) => (
            <View key={index} style={styles.recipeItem}>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <Text style={styles.recipeIngredients}>{recipe.ingredients}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  resultsContainer: {
    marginTop: 32,
  },
  resultsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recipeItem: {
    marginBottom: 16,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeIngredients: {
    marginTop: 4,
    color: '#777',
  },
});

export default App;