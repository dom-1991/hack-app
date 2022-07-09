import React, { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Word } from '@components';
import { FontSize, FontWithBold, Spacing } from '@assets';
import { selectWords, useAppSelector } from '@stores';
import { CharsMyItem } from '@types';

const MyWord = () => {
    const tabs = ['Cần học', 'Đã xong', 'Tất cả'];
    const { myWords } = useAppSelector(selectWords);

    const [indexTabActive, setIndexTabActive] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);

    const navigation: any = useNavigation();

    useEffect(() => {
        // dispatch(fetchWordsAsync());
    }, []);

    const onLoadMore = () => {};

    const onRefresh = () => {
        setRefreshing(true);
        // dispatch(getWordsPage1());
        setRefreshing(false);
    };

    const onChangeTab = (index: number) => {
        setIndexTabActive(index);
    };

    const renderItem = ({ item }: { item: CharsMyItem }) => {
        const isNeedToRead = indexTabActive === 0 && !item.isLearn;
        const isRead = indexTabActive === 1 && item.isLearn;
        if (indexTabActive === 2 || isNeedToRead || isRead) {
            return (
                <Word
                    key={item?.id}
                    word={item}
                    onPress={() =>
                        navigation.navigate('MyWordDetail', { item })
                    }
                />
            );
        } else {
            return <></>;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <View style={styles.tabs}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onChangeTab(index)}
                        key={index}
                        style={[
                            styles.tabItem,
                            // eslint-disable-next-line react-native/no-inline-styles
                            index === indexTabActive && {
                                backgroundColor: '#1DA1F3',
                            },
                        ]}>
                        <Text style={styles.tabText}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={myWords}
                onEndReached={onLoadMore}
                // onEndThreshold={0}
                renderItem={renderItem}
                keyExtractor={(item: CharsMyItem) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    wordList: {},

    tabs: {
        marginVertical: Spacing.width20,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },

    tabItem: {
        backgroundColor: '#E5E5E5',
        marginRight: Spacing.height8,
        borderRadius: Spacing.height4,
        padding: Spacing.height6,
    },

    tabText: {
        fontSize: FontSize.Font13,
        color: 'white',
        ...FontWithBold.Bold_500,
    },
});

export { MyWord };
