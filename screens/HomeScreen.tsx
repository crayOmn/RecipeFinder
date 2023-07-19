import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import RecipeCard, {Recipe} from '../components/RecipeCard';
import {
  Button,
  Layout,
  Text,
  Input,
  Icon,
  IconElement,
  IconProps,
} from '@ui-kitten/components';
import {HomeScreenProps} from '../navigation/types';
import {useToast} from 'react-native-toast-notifications';
// Simulating search functionality with a mock array of recipes
const mockRecipes: Recipe[] = [
  {
    title: 'Pasta Carbonara',
    image: require('../assets/pasta_carbonara.jpeg'),
    ingredients: 'Pasta, eggs, bacon, Parmesan cheese',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit viverra augue et rutrum. Ut consequat efficitur ex vel tempor. Morbi velit lectus, rhoncus et suscipit vel, eleifend scelerisque leo. Donec semper vulputate enim non convallis. Nam laoreet iaculis leo nec porttitor. Praesent ac rhoncus nulla, et efficitur nulla.',
  },
  {
    title: 'Chicken Curry',
    image: require('../assets/chicken-curry.jpg'),
    ingredients: 'Chicken, curry powder, coconut milk, vegetables',
    description:
      'Morbi ac lobortis elit. Quisque tempor et risus et tristique. Nunc placerat elit vel vehicula elementum. Sed posuere, justo sed commodo aliquet, ex urna blandit sapien, non dictum nisl sapien id mauris. Mauris dictum, massa at rhoncus pellentesque, ex mi bibendum mi, eget varius elit sapien ac lectus. Ut ut ullamcorper eros.',
  },
  {
    title: 'Chocolate Chip Cookies',
    image: require('../assets/chocolate-chip-cookies.jpg'),
    ingredients: 'Flour, butter, sugar, chocolate chips',
    description:
      'Pellentesque non dolor in nibh ultricies aliquam sit amet eu libero. In a accumsan tortor. Ut dictum lacinia ipsum at malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut blandit egestas enim, ac finibus turpis tristique finibus. Morbi ullamcorper mauris ligula, sed egestas elit dignissim dignissim.',
  },
  // Add more mock recipes here
];

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([...mockRecipes]);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const toast = useToast();

  const handleSearch = () => {
    console.log('Search:', keyword);

    const filteredResults = mockRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    setSearchResults(filteredResults);
  };

  const handleRecipePress = (recipe: Recipe) => {
    navigation.navigate('RecipeDetails', {recipe});
  };

  const handleAddRecipe = (recipe: Recipe) => {
    setRecipes(prevRecipes => [...prevRecipes, recipe]);
    toast.show('Recipe added successfully!', {
      type: 'success',
      placement: 'bottom',
      duration: 40000,
    });
  };

  const navigateToAddRecipe = () => {
    navigation.navigate('AddRecipe', {handleAddRecipe});
  };

  const PlusIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="plus-circle-outline" />
  );

  const CancelIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="close-square-outline" />
  );

  return (
    <Layout style={styles.layout}>
      <Text category="h4" style={styles.heading}>
        Recipe Finder
      </Text>
      <View style={styles.searchBarContainer}>
        <Input
          placeholder="Search recipes..."
          accessoryLeft={props => <Icon {...props} name="search-outline" />}
          style={styles.searchInput}
          onChangeText={nextValue => setKeyword(nextValue)}
        />
        <Button onPress={handleSearch} appearance="ghost">
          Search
        </Button>
      </View>
      {searchResults.length > 0 ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeading}>Search Results:</Text>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {searchResults.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onPress={handleRecipePress}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeading}>All Recipes:</Text>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onPress={handleRecipePress}
              />
            ))}
          </ScrollView>
        </View>
      )}
      <Layout style={styles.btnContainer}>
        {searchResults.length > 0 ? (
          <Button
            onPress={() => setSearchResults([])}
            accessoryRight={CancelIcon}>
            Cancel Search
          </Button>
        ) : (
          <Button onPress={navigateToAddRecipe} accessoryRight={PlusIcon}>
            Add Recipe
          </Button>
        )}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultsContainer: {
    marginTop: 20,
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
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: '#fff',
    zIndex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default HomeScreen;