import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Input, CommonButton, CustomModal } from '@components';
import { Spacing, FontSize } from '@assets';
import { useNavigation } from '@react-navigation/native';

const AddWord = () => {
    const [value, setValue] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation: any = useNavigation();

    const handleChangeValue = (text: string) => {
        setValue(text);
    };

    const handleModalVisible = () => {
        setModalVisible(!modalVisible);
    };

    const onGoback = () => {
        navigation.navigate('Home');
    };

    return (
        <>
            <View style={styles.container}>
                <Input
                    label="Kanji"
                    value={value}
                    onChangeValue={handleChangeValue}
                    placeholder="Nhập từ..."
                />
                <Input
                    label="Hiragana"
                    value={value}
                    onChangeValue={handleChangeValue}
                    placeholder="từ mới, vd: 階段,も,mo,...."
                />
                <Input
                    label="Nghĩa tiếng Việt"
                    value={value}
                    onChangeValue={handleChangeValue}
                    placeholder="Nghĩa"
                />
                <Input
                    label="Nghĩa tiếng Việt"
                    value={value}
                    onChangeValue={handleChangeValue}
                    placeholder="Cách nhớ"
                    multiline
                    numberOfLines={5}
                />
                <View style={styles.button}>
                    <CommonButton
                        type="small"
                        title="OK"
                        onPress={handleModalVisible}
                    />
                </View>
            </View>
            <CustomModal
                modalVisible={modalVisible}
                onModalVisible={handleModalVisible}
                onClose={onGoback}>
                <Text style={styles.modalText}>Cám ơn bạn đã đóng góp!</Text>
                <Text style={styles.modalText}>
                    Chúng mình đã ghi lại cẩn thận rùi nha.
                </Text>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Spacing.height16,
        paddingHorizontal: Spacing.height20,
    },

    button: {
        alignSelf: 'flex-end',
        marginTop: Spacing.height12,
    },

    modalText: {
        fontSize: FontSize.Font18,
        color: 'rgba(0, 0, 0, 0.83)',
        lineHeight: Spacing.height24,
    },
});

export { AddWord };
