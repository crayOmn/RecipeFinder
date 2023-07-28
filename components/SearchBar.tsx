import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Input, Button, Icon} from '@ui-kitten/components';
import {Recipe} from './RecipeCard';
import axios, {CancelTokenSource} from 'axios';
import mapApiResponseToRecipe from '../utils/objMapper';

interface SearchBarProps {
  setSearchResults: (result: Recipe[]) => void;
  setLoading: (loading: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({setSearchResults, setLoading}) => {
  const [keyword, setKeyword] = useState('');
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const searchRecipes = async (searchKeyword: string) => {
    try {
      setKeyword(searchKeyword);
      setLoading(true);
      // Cancel any previous requests before making a new one
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel();
      }
      cancelTokenSource.current = axios.CancelToken.source();
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/search.php?s='+searchKeyword,
        {
          cancelToken: cancelTokenSource.current.token,
        },
      );
      setSearchResults(mapApiResponseToRecipe(response.data.meals));
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

  const cancelSearch = () => {
    setKeyword('');
    setSearchResults([]);
  };

  return (
    <View style={styles.searchBarContainer}>
      <Input
        placeholder="Search recipes..."
        accessoryLeft={props => <Icon {...props} name="search-outline" />}
        style={styles.searchInput}
        value={keyword}
        onChangeText={nextValue => searchRecipes(nextValue)}
      />
      <Button onPress={cancelSearch} appearance="ghost">
        Cancel
      </Button>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
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
});