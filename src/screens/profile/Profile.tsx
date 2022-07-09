import { Spacing, FontSize, FontWithBold } from '@assets';
import { useNavigation } from '@react-navigation/native';
import { BookMenu } from '@types';
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
        title: 'Note',
        screen: 'MyWord',
    },
    {
        title: 'Từ theo giáo trình',
        screen: 'BookMenu',
    },
    {
        title: 'Hán tự Bộ thủ',
        screen: 'Japan',
    },
    {
        title: 'Đóng góp từ',
        screen: 'AddWord',
    },
    {
        title: 'Tặng trà sữa',
        screen: 'Contact',
    },
];

const bookMenu: BookMenu[] = [
    {
        title: 'Minna No Nihongo N5',
        child: [
            { title: 'Bài 1', book: 'MINA1' },
            { title: 'Bài 2', book: 'MINA2' },
            { title: 'Bài 3', book: 'MINA3' },
            { title: 'Bài 4', book: 'MINA4' },
            { title: 'Bài 5', book: 'MINA5' },
            { title: 'Bài 6', book: 'MINA6' },
            { title: 'Bài 7', book: 'MINA7' },
            { title: 'Bài 8', book: 'MINA8' },
            { title: 'Bài 9', book: 'MINA9' },
            { title: 'Bài 10', book: 'MINA10' },
            { title: 'Bài 11', book: 'MINA11' },
            { title: 'Bài 12', book: 'MINA12' },
            { title: 'Bài 13', book: 'MINA13' },
            { title: 'Bài 14', book: 'MINA14' },
            { title: 'Bài 15', book: 'MINA15' },
            { title: 'Bài 16', book: 'MINA16' },
            { title: 'Bài 17', book: 'MINA17' },
            { title: 'Bài 18', book: 'MINA18' },
            { title: 'Bài 19', book: 'MINA19' },
            { title: 'Bài 20', book: 'MINA20' },
            { title: 'Bài 21', book: 'MINA21' },
            { title: 'Bài 22', book: 'MINA22' },
            { title: 'Bài 23', book: 'MINA23' },
            { title: 'Bài 24', book: 'MINA24' },
            { title: 'Bài 25', book: 'MINA25' },
        ],
    },
    {
        title: 'Minna No Nihongo N4',
        child: [
            { title: 'Bài 26', book: 'MINA26' },
            { title: 'Bài 27', book: 'MINA27' },
            { title: 'Bài 28', book: 'MINA28' },
            { title: 'Bài 29', book: 'MINA29' },
            { title: 'Bài 30', book: 'MINA30' },
            { title: 'Bài 31', book: 'MINA31' },
            { title: 'Bài 32', book: 'MINA32' },
            { title: 'Bài 33', book: 'MINA33' },
            { title: 'Bài 34', book: 'MINA34' },
            { title: 'Bài 35', book: 'MINA35' },
            { title: 'Bài 36', book: 'MINA36' },
            { title: 'Bài 37', book: 'MINA37' },
            { title: 'Bài 38', book: 'MINA38' },
            { title: 'Bài 39', book: 'MINA39' },
            { title: 'Bài 40', book: 'MINA40' },
            { title: 'Bài 41', book: 'MINA41' },
            { title: 'Bài 42', book: 'MINA42' },
            { title: 'Bài 43', book: 'MINA43' },
            { title: 'Bài 44', book: 'MINA44' },
            { title: 'Bài 45', book: 'MINA45' },
            { title: 'Bài 46', book: 'MINA46' },
            { title: 'Bài 47', book: 'MINA47' },
            { title: 'Bài 48', book: 'MINA48' },
            { title: 'Bài 49', book: 'MINA49' },
            { title: 'Bài 50', book: 'MINA50' },
        ],
    },
    { title: 'Mimikara N3', book: 'MIMI_N3' },
    { title: 'Mimikara N2', book: 'MIMI_N2' },
    { title: 'Mimikara N1', book: 'MIMI_N1' },
];
console.log(bookMenu);

export const Profile = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.menuList}>
                {menuList.map(menuItem => (
                    <TouchableOpacity
                        key={menuItem.title}
                        onPress={() => {
                            if (menuItem.screen) {
                                if (menuItem.screen === 'BookMenu') {
                                    navigation.navigate(menuItem.screen, {
                                        menuList: bookMenu,
                                    });
                                } else {
                                    navigation.navigate(menuItem.screen);
                                }
                            }
                        }}
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
