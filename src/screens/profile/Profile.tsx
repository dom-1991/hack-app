import { Spacing, FontSize, FontWithBold } from '@assets';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
} from 'react-native';

const menuList = [
    {
        title: 'Từ của tôi',
        screen: 'MyWord',
    },
    {
        title: 'Từ theo giáo trình',
        screen: '',
    },
    {
        title: 'Hán tự',
        screen: '',
    },
    {
        title: 'Tặng trà sữa',
        screen: 'Contact',
    },
];

export const Profile = () => {
    const navigation: any = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.menuList}>
                {menuList.map(menuItem => (
                    <TouchableOpacity
                        key={menuItem.title}
                        onPress={() =>
                            menuItem.screen &&
                            navigation.navigate(menuItem.screen)
                        }
                        activeOpacity={0.6}
                        style={styles.menuItem}>
                        <Text style={styles.menuText}>{menuItem.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    menuList: {},

    menuItem: {
        backgroundColor: 'white',
        padding: Spacing.height23,
        marginBottom: Spacing.height16,
    },

    menuText: {
        fontSize: FontSize.Font14,
        ...FontWithBold.Bold_700,
    },
});
