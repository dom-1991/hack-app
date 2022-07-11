import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import debounce from 'lodash.debounce';

import { Input, Word } from '@components';
import { Spacing } from '@assets';
import { getWords } from '@api';
import { CharsItem, CharsSearch } from '@types';
import { WordTypeEnum } from '@enum';

const BookList = () => {
    // const words = useAppSelector(selectWords);
    const [page, setPage] = useState(1);
    const [value, setValue] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [words, setWords] = useState<CharsItem[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true);

    const navigation: any = useNavigation();
    const route: any = useRoute();
    const { book }: { book: string } = route.params || '';

    useEffect(() => {
        fetchWords(1, '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchWords = async (movePage: number, search: string) => {
        const params: CharsSearch = {
            page: movePage,
            search,
            type: WordTypeEnum.Word,
            book,
        };

        try {
            const res = await getWords(params);
            if (res.data && res.data.length > 0) {
                if (movePage === 1) {
                    setWords(res.data);
                } else {
                    setWords([...words, ...res.data]);
                }
            } else {
                setIsError(true);
                if (movePage === 1) {
                    setWords([]);
                }
            }
        } catch {
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const changeWord = (keyword: string) => {
        fetchWords(1, keyword);
        setPage(1);
        setLoading(true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleChangeWord = useCallback(debounce(changeWord, 500), []);

    const handleChangeValue = (text: string) => {
        setValue(text);
        setIsError(false);
        handleChangeWord(text);
    };

    // const onNavigateAddWordScreen = () => {
    //     navigation.navigate('AddWord');
    // };

    const onLoadMore = () => {
        console.log(isError);
        if (!isError) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchWords(nextPage, value);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchWords(page, value);
        setRefreshing(false);
    };

    const renderItem = ({ item }: any) => {
        return (
            <Word
                key={item?.id}
                word={item}
                onPress={() => navigation.navigate('WordDetail', { item })}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.input}>
                <Input
                    value={value}
                    onChangeValue={handleChangeValue}
                    placeholder="từ mới, vd: 階段,も,mo,...."
                    error={
                        !loading && !words.length
                            ? 'Tiếc ghê không có từ này'
                            : ''
                    }
                />
            </View>

            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#1DA1F38F" />
                </View>
            ) : words.length ? (
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
                    {/* <CommonButton
                        title="Thêm từ này"
                        onPress={onNavigateAddWordScreen}
                    /> */}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: -35,
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
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

export { BookList };
