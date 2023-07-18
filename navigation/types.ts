import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Recipe} from '../components/RecipeCard';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  RecipeDetails: {recipe: Recipe};
  AddRecipe: {handleAddRecipe: (recipe: Recipe) => void};
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

type AddRecipeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddRecipe'>;
  route: RouteProp<RootStackParamList, 'AddRecipe'>;
};

type RecipeDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RecipeDetails'>;
  route: RouteProp<RootStackParamList, 'RecipeDetails'>;
};

export type {
  RootStackParamList,
  HomeScreenProps,
  AddRecipeScreenProps,
  RecipeDetailsScreenProps,
};
