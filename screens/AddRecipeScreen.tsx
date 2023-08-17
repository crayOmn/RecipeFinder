// AddRecipeScreen.tsx

import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, ScrollView, View} from 'react-native';
import {
  Button,
  Icon,
  IconElement,
  IconProps,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {
  ImagePickerResponse,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {AddRecipeScreenProps} from '../navigation/types';
import {Recipe} from '../components/RecipeCard';
import {
  Controller,
  useForm,
  useFieldArray,
  ControllerRenderProps,
} from 'react-hook-form';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addRecipe} from '../redux/slices/recipeSlice';

type Category = {
  strCategory: string;
};

const AddRecipeScreen: React.FC<AddRecipeScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const {control, handleSubmit, formState} = useForm<Recipe>();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));

  const {append, remove, fields} = useFieldArray({
    control,
    name: 'ingredients',
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      setCategories(response.data.categories);
    } catch (error) {
      // Handle error in fetching data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    append(['', '']);
    fetchCategories();
  }, []);

  const handleAddRecipe = (data: Recipe) => {
    const {title, ingredients, instructions} = data;
    if (title && ingredients && instructions && imageUri) {
      const newRecipe: Recipe = {
        id: Math.random().toString(),
        title,
        ingredients,
        category: '',
        image: imageUri,
        instructions,
      };
      dispatch(addRecipe(newRecipe));
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

  const PlusIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="plus-circle-outline" />
  );
  const TrashIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="trash-2-outline" />
  );

  const handleCategorySelection = (
    index: IndexPath | IndexPath[],
    field: ControllerRenderProps<Recipe, 'category'>,
  ) => {
    const selectedCategory = Array.isArray(index)
      ? categories[index[0].row].strCategory
      : categories[index.row].strCategory;

    setSelectedCategoryIndex(index);
    field.onChange(selectedCategory);
  };

  return (
    <Layout style={styles.container}>
      <Text category="h4" style={styles.heading}>
        Add Recipe
      </Text>
      <ScrollView style={{flex: 1, marginBottom: 50}}>
        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
        <Button onPress={handleSelectImage}>Select Image</Button>
        <Controller
          control={control}
          render={({field}) => (
            <Input
              {...field}
              label="Title"
              placeholder="Enter the recipe title"
              status={formState.errors.title ? 'danger' : 'basic'} // Access errors through formState
              caption={formState.errors.title?.message} // Access errors through formState
              style={styles.input}
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
          name="title"
          rules={{
            required: 'Title is required',
          }}
          defaultValue=""
        />
        {/* Category */}
        <Controller
          control={control}
          render={({field}) => (
            <Select
              {...field}
              label="Category"
              placeholder="Select a category"
              value={field.value}
              onSelect={(index: IndexPath | IndexPath[]) =>
                handleCategorySelection(index, field)
              }>
              {categories.map((category, index) => (
                <SelectItem key={index} title={category.strCategory} />
              ))}
            </Select>
          )}
          name="category"
          rules={{
            required: 'Category is required',
          }}
        />
        <Controller
          control={control}
          render={({field}) => (
            <Input
              {...field}
              label="instructions"
              placeholder="Enter the recipe instructions"
              onChangeText={field.onChange}
              value={field.value}
              status={formState.errors.instructions ? 'danger' : 'basic'} // Access errors through formState
              caption={formState.errors.instructions?.message} // Access errors through formState
              style={styles.input}
            />
          )}
          name="instructions"
          rules={{
            required: 'Instructions is required',
          }}
          defaultValue=""
        />
        {/* Ingredients */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            marginBottom: 8,
          }}>
          <Text category="h6">Ingredients</Text>
          <Button
            onPress={() => append('')}
            appearance="ghost"
            accessoryLeft={PlusIcon}
          />
        </View>
        {fields.map((field, index) => (
          <View
            key={field.id}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Controller
              control={control}
              render={({field}) => (
                <Input
                  {...field}
                  label={`Ingredient ${index + 1}`}
                  placeholder="Enter an ingredient"
                  status={
                    formState.errors.ingredients &&
                    formState.errors.ingredients[index]
                      ? 'danger'
                      : 'basic'
                  }
                  caption={
                    formState.errors.ingredients &&
                    formState.errors.ingredients[index]?.message
                  }
                  onChangeText={field.onChange}
                  style={styles.input}
                />
              )}
              name={`ingredients.${index}`}
              rules={{
                required: 'Ingredient is required',
              }}
              defaultValue=""
            />
            {index ? (
              <Button
                onPress={() => remove(index)}
                style={{marginTop: 15}}
                appearance="ghost"
                status="danger"
                accessoryLeft={TrashIcon}
              />
            ) : null}
          </View>
        ))}
      </ScrollView>
      <Layout style={styles.addBtnContainer}>
        <Button onPress={handleSubmit(handleAddRecipe)}>Add Recipe</Button>
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
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  input: {
    flex: 1,
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