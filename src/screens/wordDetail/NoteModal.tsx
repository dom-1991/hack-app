import { CustomModal, Input } from '@components';
import { noteMyWord, useAppDispatch } from '@stores';
import { CharsMyItem } from '@types';
import React, { memo, useState } from 'react';
import { Keyboard, Text, TouchableNativeFeedback, View } from 'react-native';
import { styles } from './styles';

interface NoteModalProps {
    word: CharsMyItem;
    onGoback: () => void;
    modalVisible: boolean;
    onModalVisible: () => void;
}

const NoteModal = (props: NoteModalProps) => {
    const { word, onGoback, modalVisible, onModalVisible } = props;
    const [value, setValue] = useState<string>(word?.myNote || '');
    const dispatch = useAppDispatch();

    const handleChangeValue = (text: string) => {
        setValue(text);
    };

    const handleNote = () => {
        // if (value) {
        const myWord: CharsMyItem = {
            ...word,
            myNote: value,
            isLearn: word?.isLearn || false,
        };
        dispatch(noteMyWord(myWord));
        // }
        onGoback();
    };

    return (
        <CustomModal
            modalVisible={modalVisible}
            onModalVisible={onModalVisible}
            onClose={handleNote}
            onCancel={onGoback}>
            {/* <View style={styles.container}> */}
            <TouchableNativeFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}>
                <View>
                    <View style={[styles.top, styles.topNoteModal]}>
                        <View>
                            <Text style={styles.word}>{word?.word}</Text>
                        </View>
                        <View>
                            <Text style={styles.read}>{word?.read}</Text>
                        </View>
                    </View>
                    <View style={styles.centerNoteModal}>
                        <Text style={styles.meaning}>{word?.meaning}</Text>
                        <Text style={styles.noteMyNote}>{word?.note}</Text>
                    </View>

                    <Input
                        label="Chú thích"
                        value={value}
                        onChangeValue={handleChangeValue}
                        placeholder="Chú thích của bạn"
                        multiline
                        numberOfLines={5}
                    />
                </View>
            </TouchableNativeFeedback>
        </CustomModal>
    );
};

export default memo(NoteModal);
