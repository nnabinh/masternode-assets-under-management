import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Drawer from './src/navigation/Drawer';
import {store} from './src/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} />
        <Drawer />
      </NavigationContainer>
    </Provider>
  );
}

LogBox.ignoreLogs(['SerializableStateInvariantMiddleware took']);

export default App;
