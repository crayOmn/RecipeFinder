import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Input, Button, Icon} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {searchRecipesFromAPI, cancelSearch} from '../redux/slices/recipeSlice';

const SearchBar: React.FC = () => {
  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();

  const onChangeText = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    dispatch(searchRecipesFromAPI(searchKeyword) as any);
  };

  const onCancelSearch = () => {
    setKeyword('');
    dispatch(cancelSearch());
  };

  return (
    <View style={styles.searchBarContainer}>
      <Input
        placeholder="Search recipes..."
        accessoryLeft={props => <Icon {...props} name="search-outline" />}
        style={styles.searchInput}
        value={keyword}
        onChangeText={nextValue => onChangeText(nextValue)}
      />
      <Button onPress={onCancelSearch} appearance="ghost">
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