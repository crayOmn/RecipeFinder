import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
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
import {makeEventNotifier} from '../utils/EventListener';
import axios, {CancelTokenSource} from 'axios';
import mapApiResponseToRecipe from '../utils/objMapper';

const newRecipeNotifier = makeEventNotifier<Recipe>('newRecipe');

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const toast = useToast();
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const fetchRecipes = async () => {
    try {
      // Cancel any previous requests before making a new one
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel();
      }
      cancelTokenSource.current = axios.CancelToken.source();
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/search.php?f=c',
        {
          cancelToken: cancelTokenSource.current.token,
        },
      );
      setRecipes(mapApiResponseToRecipe(response.data.meals));
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was canceled, do nothing
      } else {
        // Handle other errors in fetching data
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
    return () => {
      // Cancel the request when the component unmounts
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel();
      }
    };
  }, []);

  const handleSearch = () => {
    console.log('Search:', keyword);

    const filteredResults = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    setSearchResults(filteredResults);
  };

  const handleRecipePress = (recipe: Recipe) => {
    navigation.navigate('RecipeDetails', {recipe});
  };

  newRecipeNotifier.useEventListener(recipe => {
    setRecipes(prevRecipes => [...prevRecipes, recipe]);
    toast.show('Recipe added successfully!', {
      type: 'success',
      placement: 'bottom',
      duration: 40000,
    });
  }, []);

  const navigateToAddRecipe = () => {
    navigation.navigate('AddRecipe');
  };

  const PlusIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="plus-circle-outline" />
  );

  const CancelIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="close-square-outline" />
  );

  return (
    <Layout style={styles.layout}>
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
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={searchResults.length > 0 ? searchResults : recipes}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <RecipeCard key={index} recipe={item} onPress={handleRecipePress} />
          )}
          contentContainerStyle={styles.scrollContent}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderRadius: 10,
    width: '80%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 70,
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