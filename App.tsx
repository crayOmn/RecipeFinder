import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView  } from 'react-native';
import RecipeCard from './components/RecipeCard';
import {ApplicationProvider, IconRegistry, Button, Layout, Text, Input, Icon} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<
    {title: string; ingredients: string; image: any; description: string}[]
  >([]);

  const handleSearch = () => {
    console.log('Search:', keyword);

    // Simulating search functionality with a mock array of recipes
    const mockRecipes = [
      {
        title: 'Pasta Carbonara',
        image: require('./assets/pasta_carbonara.jpeg'),
        ingredients: 'Pasta, eggs, bacon, Parmesan cheese',
        description: '',
      },
      {
        title: 'Chicken Curry',
        image: require('./assets/chicken-curry.jpg'),
        ingredients: 'Chicken, curry powder, coconut milk, vegetables',
        description: '',
      },
      {
        title: 'Chocolate Chip Cookies',
        image: require('./assets/chocolate-chip-cookies.jpg'),
        ingredients: 'Flour, butter, sugar, chocolate chips',
        description: '',
      },
      // Add more mock recipes here
    ];

    const filteredResults = mockRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    setSearchResults(filteredResults);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.layout}>
          <Text category="h4" style={styles.heading}>
            Recipe Finder
          </Text>
          <View style={styles.searchBarContainer}>
            <Input
              placeholder="Search recipes..."
              accessoryLeft={(props) => <Icon {...props} name="search-outline" />}
              style={styles.searchInput}
              onChangeText={nextValue => setKeyword(nextValue)}
            />
            <Button
              onPress={handleSearch}
              appearance='ghost'
            >
              Search
            </Button>
          </View>
          {searchResults.length > 0 && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsHeading}>Search Results:</Text>
              <ScrollView contentContainerStyle={styles.scrollContent}>
                {searchResults.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
              </ScrollView>
            </View>
          )}
        </Layout>
      </ApplicationProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
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
  searchBarContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 0,
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderRadius: 10,
    width: '80%',
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default App;