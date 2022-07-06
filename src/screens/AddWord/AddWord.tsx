import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { Input, CommonButton, CustomModal } from '@components';
import { Spacing, FontSize } from '@assets';
import { NewChars } from '@types';
import { useFormik } from 'formik';
import { addWords } from '@api';

const initialValues: NewChars = {
    word: '',
    reading: '',
    note: '',
    meaning: '',
};

const validationSchema = yup.object().shape({
    word: yup.string().required('Trường này là bắt buộc'),
    reading: yup.string().required('Trường này là bắt buộc'),
    note: yup.string().required('Trường này là bắt buộc'),
    meaning: yup.string().required('Trường này là bắt buộc'),
});

const AddWord = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation: any = useNavigation();

    const handleModalVisible = () => {
        setModalVisible(!modalVisible);
    };

    const onSubmit = async (values: NewChars) => {
        try {
            await addWords(values);
            setModalVisible(true);
        } catch {
            setFieldError('word', 'Có lỗi xảy');
        }
    };

    const {
        values,
        setFieldValue,
        handleSubmit,
        errors,
        setFieldError,
        setValues,
        setErrors,
    } = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
        validateOnChange: false,
    });

    const handleChangeValue = (name: string, text: string) => {
        setFieldValue(name, text);
    };

    const handleOk = () => {
        setValues(initialValues);
        setErrors({});
        setModalVisible(false);
        navigation.goBack();
    };

    return (
        <>
            <View style={styles.container}>
                <Input
                    label="Từ"
                    value={values.word}
                    name="word"
                    onChangeValue={value => {
                        handleChangeValue('word', value);
                    }}
                    placeholder="Nhập từ..."
                />
                <Text style={styles.errorText}>{errors.word}</Text>
                <Input
                    label="Cách Đọc"
                    name="reading"
                    value={values.reading}
                    onChangeValue={value => {
                        handleChangeValue('reading', value);
                    }}
                    placeholder="từ mới, vd: 階段,も,mo,...."
                />
                <Text style={styles.errorText}>{errors.reading}</Text>
                <Input
                    label="Nghĩa tiếng Việt"
                    value={values.meaning}
                    name="meaning"
                    onChangeValue={value => {
                        handleChangeValue('meaning', value);
                    }}
                    placeholder="Nghĩa"
                />
                <Text style={styles.errorText}>{errors.meaning}</Text>
                <Input
                    label="Cách nhớ"
                    value={values.note}
                    onChangeValue={value => {
                        handleChangeValue('note', value);
                    }}
                    name="note"
                    placeholder="Cách nhớ. 
                    Vd : ngồi bên CẦU THANG đánh CÁI ĐÀN cho crush nghe"
                    multiline
                    numberOfLines={5}
                />
                <Text style={styles.errorText}>{errors.note}</Text>
                <View style={styles.button}>
                    <CommonButton
                        type="small"
                        title="OK"
                        onPress={handleSubmit}
                    />
                </View>
            </View>
            <CustomModal
                modalVisible={modalVisible}
                onModalVisible={handleModalVisible}
                onClose={handleOk}>
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

    errorText: {
        fontSize: FontSize.Font12,
        color: 'red',
        lineHeight: Spacing.height16,
    },
});

export { AddWord };
