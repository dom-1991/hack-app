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
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
    selectWords,
    getWordsPagination,
    fetchWordsAsync,
    getWordsPage1,
} from '../../redux/slices/wordsSlice';

const MyWord = () => {
    const tabs = ['Cần học', 'Đã xong', 'Tất cả'];

    const words = useAppSelector(selectWords);
    const dispatch = useAppDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [page, setPage] = useState<number>(1);
    const [indexTabActive, setIndexTabActive] = useState(2);
    const [refreshing, setRefreshing] = React.useState(false);

    const navigation: any = useNavigation();

    useEffect(() => {
        dispatch(fetchWordsAsync());
    }, [dispatch]);

    const onLoadMore = () => {
        setPage((prevPage: number) => {
            dispatch(getWordsPagination(prevPage + 1));
            return prevPage + 1;
        });
    };

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getWordsPage1());
        setRefreshing(false);
    };

    const onChangeTab = (index: number) => {
        setIndexTabActive(index);
    };

    const renderItem = ({ item }: any) => {
        return (
            <Word
                key={item?.id}
                wordTitle={item?.word}
                wordDescription={item?.read}
                translateTitle={item?.meaning}
                translateDescription={item?.note}
                onPress={() => navigation.navigate('WordDetail', { item })}
            />
        );
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
                data={words as []}
                onEndReached={onLoadMore}
                // onEndThreshold={0}
                renderItem={renderItem}
                keyExtractor={(item: { id: string }) => item?.id}
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
