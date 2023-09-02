import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a Redux Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
});
const persistor = persistStore(store); // Create a persistor object

export { store, persistor };