import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import { Images } from '@assets';
import { CommonButton } from '@components';
import { CharsMyItem } from '@types';
import NoteModal from './NoteModal';
import ConfirmModal from './ConfirmModel';
import { styles } from './styles';
import { noteMyWord, removeMyWord, selectWords, useAppSelector } from '@stores';

export const MyWordDetail = () => {
    const route: any = useRoute();
    const dispatch = useDispatch();
    let { item }: { item: CharsMyItem } = route.params || {};
    const [word, setWord] = useState<CharsMyItem>(item);

    const words = useAppSelector(selectWords);
    const navigation: any = useNavigation();
    useEffect(() => {
        const myWordIndex = words?.myWords?.findIndex(
            wordItem => wordItem?.id === item?.id,
        );
        if (myWordIndex) {
            setWord(words?.myWords[myWordIndex]);
        }
    }, [item?.id, words]);

    const [noteModalVisible, setNoteModalVisible] = useState(false);
    const [cancelModalVisible, setCancelModalVisible] = useState(false);

    const handleNoteModalVisible = useCallback(() => {
        setNoteModalVisible(!noteModalVisible);
    }, [noteModalVisible]);

    const handleCancelModalVisible = useCallback(() => {
        setCancelModalVisible(!cancelModalVisible);
    }, [cancelModalVisible]);

    const handleToggleRead = () => {
        const noteWord: CharsMyItem = {
            ...item,
            myNote: word?.myNote,
            isLearn: !word?.isLearn,
        };
        dispatch(noteMyWord(noteWord));
    };

    const handleRemoteMyWord = () => {
        dispatch(removeMyWord(word?.id));
        handleCancelModalVisible();
        navigation.navigate('MyWord');
    };

    const handleNext = () => {
        const myWordIndex = words?.myWords?.findIndex(
            wordItem => wordItem?.id === word?.id,
        );
        if (myWordIndex < words?.myWords?.length - 1) {
            setWord(words?.myWords[myWordIndex + 1]);
        }
    };

    const handlePrev = () => {
        const myWordIndex = words?.myWords?.findIndex(
            wordItem => wordItem?.id === word?.id,
        );
        if (myWordIndex > 0) {
            setWord(words?.myWords[myWordIndex - 1]);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <View style={styles.noteContain}>
                <TouchableOpacity onPress={handlePrev}>
                    <Image source={Images.prev} style={styles.soundIcon} />
                </TouchableOpacity>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.inner}>
                    <View style={styles.top}>
                        <View>
                            <Text style={styles.word}>{word?.word}</Text>
                        </View>
                        <View>
                            <View style={styles.topIcon}>
                                {/* <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={onTextToSpeech}>
                                <Image
                                    source={Images.sound}
                                    style={styles.soundIcon}
                                />
                            </TouchableOpacity> */}
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={handleNoteModalVisible}>
                                    <Image
                                        source={Images.edit}
                                        style={styles.editIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={handleCancelModalVisible}>
                                    <Image
                                        source={Images.trash}
                                        style={styles.trashIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.read}>{word?.read}</Text>
                        </View>
                    </View>

                    <Text style={styles.meaning}>{word?.meaning}</Text>
                    <Text style={styles.note}>{word?.note}</Text>
                    <Text style={styles.myNote}>{word?.myNote}</Text>

                    <View style={styles.noteButton}>
                        <CommonButton
                            title={
                                word?.isLearn
                                    ? 'Đánh dấu Cần học lại'
                                    : 'Đánh dấu đã học xong'
                            }
                            onPress={handleToggleRead}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={handleNext}>
                    <Image source={Images.next} style={styles.soundIcon} />
                </TouchableOpacity>
            </View>
            {word && (
                <NoteModal
                    word={word}
                    onGoback={handleNoteModalVisible}
                    modalVisible={noteModalVisible}
                    onModalVisible={handleNoteModalVisible}
                />
            )}
            {word && (
                <ConfirmModal
                    modalVisible={cancelModalVisible}
                    onGoback={handleCancelModalVisible}
                    onModalVisible={handleCancelModalVisible}
                    onConfirm={handleRemoteMyWord}
                />
            )}
        </SafeAreaView>
    );
};
