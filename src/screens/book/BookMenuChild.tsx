import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { BookMenu } from '@types';
import { Spacing, FontSize, FontWithBold } from '@assets';

export const BookMenuChildScreen = () => {
    const route: any = useRoute();
    const navigation = useNavigation();

    let { menuList }: { menuList: BookMenu[] } = route.params || {};

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.menuList}>
                {menuList.map(menuItem => (
                    <TouchableOpacity
                        key={menuItem.title}
                        onPress={() => {
                            if (menuItem.book) {
                                navigation.navigate('BookList', {
                                    book: menuItem.book,
                                });
                            } else if (menuItem.child) {
                                navigation.navigate('BookMenu', {
                                    menuList: menuItem.child,
                                });
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
