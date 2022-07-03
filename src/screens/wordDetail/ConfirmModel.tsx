import { CustomModal } from '@components';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

interface NoteModalProps {
    onGoback: () => void;
    modalVisible: boolean;
    onModalVisible: () => void;
    onConfirm: () => void;
}

const ConfirmModal = (props: NoteModalProps) => {
    const { onGoback, onConfirm, modalVisible, onModalVisible } = props;

    return (
        <CustomModal
            modalVisible={modalVisible}
            onModalVisible={onModalVisible}
            onClose={onConfirm}
            onCancel={onGoback}>
            {/* <View style={styles.container}> */}
            <View style={[styles.top, styles.topNoteModal]}>
                <Text>Bạn có chắc chắn xoá từ này ra khỏi danh sách!</Text>
            </View>
        </CustomModal>
    );
};

export default memo(ConfirmModal);
