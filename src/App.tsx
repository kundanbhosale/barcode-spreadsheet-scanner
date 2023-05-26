import {ScanProvider} from './context/scan';
import Scanner from './screens/scanner';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import Theme from './theme';
import DocPicker from './screens/picker';
import Settings from './screens/settings';
import Result from './screens/result';
import Home from './screens/home';
import {WithSplashScreen} from './components/splash';

function Main() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="result" component={Result} />
        <Stack.Screen name="scanner" component={Scanner} />
        <Stack.Screen name="picker" component={DocPicker} />
        <Stack.Screen name="settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    setIsAppReady(true);
  }, []);
  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <ScanProvider>
        <Main />
      </ScanProvider>
    </WithSplashScreen>
  );
}

export default App;
