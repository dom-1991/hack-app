import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import { ScrollView } from 'react-native-gesture-handler';

import { Images } from '@assets';
import { CommonButton } from '@components';
import { CharsMyItem } from '@types';
import NoteModal from './NoteModal';
import ConfirmModal from './ConfirmModel';
import { styles } from './styles';
import { noteMyWord, removeMyWord, selectWords, useAppSelector } from '@stores';

export const MyWordDetail = () => {
    useEffect(() => {
        Tts.addEventListener('tts-start', event => console.log('start', event));
        Tts.addEventListener('tts-progress', event =>
            console.log('progress', event),
        );
        Tts.addEventListener('tts-finish', event =>
            console.log('finish', event),
        );
        Tts.addEventListener('tts-cancel', event =>
            console.log('cancel', event),
        );
    }, []);
    const route: any = useRoute();
    const dispatch = useDispatch();
    let { item }: { item: CharsMyItem } = route.params || {};

    const words = useAppSelector(selectWords);
    const navigation: any = useNavigation();
    const myWord = words?.myWords?.find(word => word?.id === item?.id);

    const onTextToSpeech = () => {
        Tts.speak(item?.read);
    };
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
            myNote: myWord?.myNote,
            isLearn: !myWord?.isLearn,
        };
        dispatch(noteMyWord(noteWord));
    };

    const handleRemoteMyWord = () => {
        dispatch(removeMyWord(item?.id));
        handleCancelModalVisible();
        navigation.navigate('MyWord');
    };

    return (
        <SafeAreaView
            style={styles.container}
            edges={['left', 'right', 'bottom']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.inner}>
                <View style={styles.top}>
                    <View>
                        <Text style={styles.word}>{item?.word}</Text>
                    </View>
                    <View>
                        <View style={styles.top}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={onTextToSpeech}>
                                <Image
                                    source={Images.sound}
                                    style={styles.soundIcon}
                                />
                            </TouchableOpacity>
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
                        <Text style={styles.read}>{item?.read}</Text>
                    </View>
                </View>

                <Text style={styles.meaning}>{item?.meaning}</Text>
                <Text style={styles.note}>{item?.note}</Text>
                <Text style={styles.myNote}>{myWord?.myNote}</Text>

                <View style={styles.noteButton}>
                    <CommonButton
                        title={
                            myWord?.isLearn
                                ? 'Đánh dấu Cần học lại'
                                : 'Đánh dấu đã học xong'
                        }
                        onPress={handleToggleRead}
                    />
                </View>
            </ScrollView>
            {item && (
                <NoteModal
                    word={item}
                    onGoback={handleNoteModalVisible}
                    modalVisible={noteModalVisible}
                    onModalVisible={handleNoteModalVisible}
                />
            )}
            {myWord && (
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
