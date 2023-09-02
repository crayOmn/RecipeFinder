import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import RecipeCard, {Recipe} from '../components/RecipeCard';
import {
  Button,
  Layout,
  Text,
  Icon,
  IconElement,
  IconProps,
} from '@ui-kitten/components';
import {HomeScreenProps} from '../navigation/types';
import SearchBar from '../components/SearchBar';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecipesFromAPI} from '../redux/slices/recipeSlice';
import NetInfo from '@react-native-community/netinfo';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [isAppOnline, setIsAppOnline] = useState<boolean | null>(true);
  const dispatch = useDispatch();
  const {recipes, searchResult, loading, error} = useSelector(
    (state: any) => state.recipes,
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsAppOnline(state.isConnected);
    });
  
    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (isAppOnline) {
      dispatch(fetchRecipesFromAPI() as any);
    }
  }, [isAppOnline]);

  const handleRecipePress = (recipe: Recipe) => {
    navigation.navigate('RecipeDetails', {recipe});
  };

  const navigateToAddRecipe = () => {
    navigation.navigate('AddRecipe');
  };

  const PlusIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="plus-circle-outline" />
  );


  return (
    <Layout style={styles.layout}>
      <SearchBar />
      {error && <Text>{error}</Text>}
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <FlatList
          data={searchResult.length > 0 ? searchResult : recipes}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <RecipeCard key={index} recipe={item} onPress={handleRecipePress} />
          )}
          contentContainerStyle={styles.scrollContent}
        />
      )}
      <Layout style={styles.btnContainer}>
        {searchResult.length == 0 && (
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