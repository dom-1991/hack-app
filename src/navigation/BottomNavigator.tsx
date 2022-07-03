import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, KanjiScreen, Profile } from '@screens';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { Images, Spacing } from '@assets';

const Tab = createBottomTabNavigator();

export const styles = StyleSheet.create({
    bottomTabHomeIcon: {
        width: Spacing.width36,
        height: Spacing.height28,
        resizeMode: 'contain',
    },

    bottomTabJapanIcon: {
        width: Spacing.width57,
        height: Spacing.height28,
        resizeMode: 'contain',
    },

    bottomTabProfileIcon: {
        width: Spacing.width25,
        resizeMode: 'contain',
        height: Spacing.height28,
    },
});

const bottomTabScreens = [
    {
        name: 'Home',
        screen: Home,
        iconActive: Images.homeIconActive,
        iconUnActive: Images.homeIcon,
        styleIcon: styles.bottomTabHomeIcon,
    },
    {
        name: 'Japan',
        screen: KanjiScreen,
        iconActive: Images.japanIconActive,
        iconUnActive: Images.japanIcon,
        styleIcon: styles.bottomTabJapanIcon,
    },
    {
        name: 'Profile',
        screen: Profile,

        iconActive: Images.profileIconActive,
        iconUnActive: Images.profileIcon,
        styleIcon: styles.bottomTabProfileIcon,
    },
];

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{
                tabBarShowLabel: false,
            }}>
            {bottomTabScreens.map(tab => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.screen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={
                                    focused ? tab.iconActive : tab.iconUnActive
                                }
                                style={tab.styleIcon}
                            />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};
