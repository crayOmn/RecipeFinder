// AddRecipeScreen.tsx

import React, {useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {
  ImagePickerResponse,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {AddRecipeScreenProps} from '../navigation/types';
import {Recipe} from '../components/RecipeCard';
import { makeEventNotifier } from '../utils/EventListener';

const newRecipeNotifier = makeEventNotifier<Recipe>("newRecipe");

const AddRecipeScreen: React.FC<AddRecipeScreenProps> = ({
  navigation,
  route,
}) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();

  const handleAddRecipe = () => {
    if (title && ingredients && description && imageUri) {
      const newRecipe: Recipe = {
        title,
        ingredients,
        description,
        image: imageUri,
        isNew: true,
      };
      newRecipeNotifier.notify(newRecipe);
      navigation.goBack();
    } else {
      // Display an error message or show a toast indicating missing fields
    }
  };

  const handleSelectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        // User cancelled image selection
      } else if (response.errorCode) {
        // Error occurred while selecting image
      } else if (response?.assets) {
        setImageUri(response?.assets[0].uri);
      }
    });
  };

  return (
    <Layout style={styles.container}>
      <Text category="h4" style={styles.heading}>
        Add Recipe
      </Text>
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      <Button onPress={handleSelectImage}>Select Image</Button>
      <Input
        label="Title"
        placeholder="Enter recipe title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Input
        label="Ingredients"
        placeholder="Enter recipe ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        style={styles.input}
        multiline
      />
      <Input
        label="Description"
        placeholder="Enter recipe description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <Layout style={styles.addBtnContainer}>
        <Button onPress={handleAddRecipe}>Add Recipe</Button>
      </Layout>
    </Layout>
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
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  input: {
    marginVertical: 10,
  },
  addBtnContainer: {
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

export default AddRecipeScreen;