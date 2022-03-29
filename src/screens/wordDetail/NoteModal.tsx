import { CustomModal, Input } from '@components';
import React, { memo, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

interface NoteModalProps {
    word: Home.Word;
    onGoback: () => void;
    modalVisible: boolean;
    onModalVisible: () => void;
}

const NoteModal = (props: NoteModalProps) => {
    const { word, onGoback, modalVisible, onModalVisible } = props;
    const [value, setValue] = useState<string>('');

    const handleChangeValue = (text: string) => {
        setValue(text);
    };

    return (
        <CustomModal
            modalVisible={modalVisible}
            onModalVisible={onModalVisible}
            onClose={onGoback}>
            {/* <View style={styles.container}> */}
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
                <Text style={styles.note}>{word?.note}</Text>
            </View>

            <Input
                label="Chú thích"
                value={value}
                onChangeValue={handleChangeValue}
                placeholder="Chú thích của bạn"
                multiline
                numberOfLines={5}
            />
        </CustomModal>
    );
};

export default memo(NoteModal);
