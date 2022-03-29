import { reportWords } from '@api';
import { Spacing } from '@assets';
import { CustomModal, Input } from '@components';
import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface ReportModalProps {
    onGoback: () => void;
    modalVisible: boolean;
    onModalVisible: () => void;
}

const ReportModal = (props: ReportModalProps) => {
    const { onGoback, modalVisible, onModalVisible } = props;
    const [reportContent, setReportContent] = useState<{
        char: string;
        content: string;
    }>({
        char: '',
        content: '',
    });

    const handleChangeValue = (value: string, type: string) => {
        let reportContentUpdated = { ...reportContent };
        switch (type) {
            case 'char':
                Object.assign(reportContentUpdated, { char: value });
                break;

            case 'content':
                Object.assign(reportContentUpdated, { content: value });
                break;
        }
        setReportContent(reportContentUpdated);
    };

    const onSendReport = async () => {
        try {
            const response: any = await reportWords(reportContent);
            if (response.code === 200) {
            }
        } catch (error) {
            console.log(error);
        }
        onGoback();
    };
    return (
        <CustomModal
            modalVisible={modalVisible}
            onModalVisible={onModalVisible}
            onClose={onSendReport}>
            <View style={styles.container}>
                <Input
                    label="Nghĩa tiếng Việt"
                    value={reportContent.char}
                    onChangeValue={value => handleChangeValue(value, 'char')}
                    placeholder="Nghĩa"
                />
                <Input
                    label="Nghĩa tiếng Việt"
                    value={reportContent.content}
                    onChangeValue={value => handleChangeValue(value, 'content')}
                    placeholder="Cách nhớ"
                    multiline
                    numberOfLines={5}
                />
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Spacing.height16,
    },
});

export default memo(ReportModal);
