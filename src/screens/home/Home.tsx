import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Input, CommonButton, Word } from '@components';
import { Images, Spacing } from '@assets';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
    selectWords,
    getWordsPagination,
    fetchWordsAsync,
    searchWords,
    getWordsPage1,
} from '../../redux/slices/wordsSlice';

const Home = () => {
    const words = useAppSelector(selectWords);
    const dispatch = useAppDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [page, setPage] = useState(1);

    const [value, setValue] = useState<string>('');
    const [refreshing, setRefreshing] = React.useState(false);

    const navigation: any = useNavigation();

    useEffect(() => {
        dispatch(fetchWordsAsync());
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(getWordsPagination(page));
    //     // console.log(page);
    // }, [dispatch, page]);

    // console.log(words);

    const handleChangeValue = (text: string) => {
        setValue(text);
        dispatch(searchWords(text));
        dispatch(getWordsPage1());
    };

    // console.log(words);

    const onNavigateAddWordScreen = () => {
        navigation.navigate('AddWord');
    };

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
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Image source={Images.logo} style={styles.logo} />
            <View style={styles.input}>
                <Input
                    value={value}
                    onChangeValue={handleChangeValue}
                    placeholder="từ mới, vd: 階段,も,mo,...."
                    error={!words.length ? 'Tiếc ghê không có từ này' : ''}
                />
            </View>

            {words.length ? (
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
            ) : (
                <View style={styles.notFoundWord}>
                    <CommonButton
                        title="Thêm từ này"
                        onPress={onNavigateAddWordScreen}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    logo: {
        width: Spacing.width231,
        height: Spacing.height18,
        marginTop: Spacing.height12,
        marginBottom: Spacing.height20,
        marginLeft: Spacing.width16,
    },

    input: {
        paddingHorizontal: Spacing.height12,
    },

    wordList: {
        // marginTop: Spacing.height12,
        // marginBottom: Spacing.height56,
    },

    notFoundWord: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Spacing.height20,
    },
});

export { Home };
