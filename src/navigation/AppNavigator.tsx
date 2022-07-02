import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BottomTabNavigator } from './BottomNavigator';
import {
    AddWord,
    Contact,
    WordDetail,
    MyWord,
    KanjiScreen,
    KanjiDetail,
} from '@screens';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false, title: '' }}
                name="BottomTab"
                component={BottomTabNavigator}
            />
            <Stack.Screen
                options={{ title: 'Thêm từ mới' }}
                name="AddWord"
                component={AddWord}
            />
            <Stack.Screen
                options={{ title: 'Liên hệ' }}
                name="Contact"
                component={Contact}
            />
            <Stack.Screen
                options={{ title: '' }}
                name="WordDetail"
                component={WordDetail}
            />
            <Stack.Screen
                options={{ title: '' }}
                name="KanjiScreen"
                component={KanjiScreen}
            />
            <Stack.Screen
                options={{ title: '' }}
                name="KanjiDetail"
                component={KanjiDetail}
            />
            <Stack.Screen
                options={{ title: 'Từ của tôi' }}
                name="MyWord"
                component={MyWord}
            />
        </Stack.Navigator>
    );
}

export default AppNavigator;
