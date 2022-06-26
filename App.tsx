import 'react-native-gesture-handler';
// import '@reduxjs/toolkit';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@redux';
import Tts from 'react-native-tts';

Tts.setDefaultLanguage('ja-JP');

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <AppNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
