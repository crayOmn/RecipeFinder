import React from 'react';
import {
  Card,
  Text,
  Button,
  IconElement,
  Icon,
  IconProps,
} from '@ui-kitten/components';
import {Image, StyleSheet, View, ImageProps} from 'react-native';
import {useDispatch} from 'react-redux';
import {markFavorite} from '../redux/slices/recipeSlice';

export type Recipe = {
  id: string;
  title: string;
  category: string;
  instructions: string;
  ingredients: string[];
  image: any;
  favorite?: boolean;
};

interface RecipeCardProps {
  onPress: (recipe: Recipe) => void;
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({onPress, recipe}) => {
  const favIconRef = React.useRef<Icon<Partial<ImageProps>>>();
  const dispatch = useDispatch();

  const StarIcon = (props: IconProps): IconElement => (
    <Icon
      {...props}
      name={recipe.favorite ? 'heart' : 'heart-outline'}
      ref={favIconRef}
      animationConfig={{cycles: 1}}
      animation="pulse"
    />
  );

  const onPresFav = () => {
    favIconRef.current?.startAnimation();
    dispatch(markFavorite(recipe.id));
  };

  return (
    <Card style={styles.card}>
      <Image source={{uri: recipe.image}} style={styles.recipeImage} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text category="h6" style={styles.recipeTitle}>
          {recipe.title}
        </Text>
        <Button
          appearance="ghost"
          accessoryLeft={StarIcon}
          onPress={onPresFav}
          status='danger'
        />
      </View>
      <Button style={styles.readMoreButton} onPress={() => onPress(recipe)}>
        Read More
      </Button>
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