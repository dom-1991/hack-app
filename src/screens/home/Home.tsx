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
import { debounce } from 'lodash';

import { Input, CommonButton, Word } from '@components';
import { Images, Spacing } from '@assets';
import { getWords } from '@api';
import { CharsItem, CharsSearch } from '@types';
import { WordTypeEnum } from '@enum';

const Home = () => {
    // const words = useAppSelector(selectWords);
    const [page, setPage] = useState(1);
    const [value, setValue] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [words, setWords] = useState<CharsItem[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const navigation: any = useNavigation();

    useEffect(() => {
        fetchWords(1, '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchWords = async (movePage: number, search: string) => {
        const params: CharsSearch = {
            page: movePage,
            search,
            type: WordTypeEnum.Word,
        };

        setIsError(false);
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
        }
    };

    const handleChangeWord = debounce((keyword: string) => {
        fetchWords(1, keyword);
        setPage(1);
    }, 500);

    const handleChangeValue = (text: string) => {
        setValue(text);
        setIsError(false);
        handleChangeWord(text);
    };

    // console.log(words);

    const onNavigateAddWordScreen = () => {
        navigation.navigate('AddWord', { word: value });
    };

    const onLoadMore = () => {
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
