import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Navigation from './navigation/Navigation';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <Navigation />
          </ApplicationProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
