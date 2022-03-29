import { Spacing } from '@assets';
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { CommonButton } from './Button';

interface CustomModalProps {
    modalVisible: boolean;
    onModalVisible: () => void;
    onClose: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = props => {
    const { modalVisible, onModalVisible, onClose, children } = props;
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            style={styles.modal}
            onRequestClose={onModalVisible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View>{children}</View>
                    <View style={styles.button}>
                        <CommonButton
                            type="small"
                            title="OK"
                            onPress={onClose}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        margin: 0, // This is the important style you need to set
        alignItems: undefined,
        justifyContent: undefined,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.height12,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
        backgroundColor: 'white',
        borderColor: 'rgba(29, 161, 243, 0.64)',
        borderWidth: Spacing.width1,
        borderRadius: Spacing.width20,
        padding: Spacing.width16,
        width: '100%',
    },
    button: {
        marginTop: Spacing.height16,
        alignSelf: 'center',
    },
});
