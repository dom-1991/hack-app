import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BottomTabNavigator } from './BottomNavigator';
import {
    AddWord,
    Contact,
    WordDetail,
    MyWord,
    KanjiDetail,
    MyWordDetail,
    BookMenuScreen,
    BookMenuChildScreen,
    BookList,
    BookKanji,
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
                options={{
                    title: 'Thêm từ mới',
                    headerLeftLabelVisible: false,
                }}
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
                name="KanjiDetail"
                component={KanjiDetail}
            />
            <Stack.Screen
                options={{ title: 'Note', headerLeftLabelVisible: false }}
                name="MyWord"
                component={MyWord}
            />
            <Stack.Screen
                options={{ title: '', headerLeftLabelVisible: false }}
                name="BookMenu"
                component={BookMenuScreen}
            />
            <Stack.Screen
                options={{ title: '', headerLeftLabelVisible: false }}
                name="BookMenuChild"
                component={BookMenuChildScreen}
            />
            <Stack.Screen
                options={{ title: '', headerLeftLabelVisible: false }}
                name="BookList"
                component={BookList}
            />

            <Stack.Screen
                options={{ title: '', headerLeftLabelVisible: false }}
                name="BookKanji"
                component={BookKanji}
            />
            <Stack.Screen
                options={{ title: '' }}
                name="MyWordDetail"
                component={MyWordDetail}
            />
        </Stack.Navigator>
    );
}

export default AppNavigator;
