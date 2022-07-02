import { reportWords } from '@api';
import { Spacing } from '@assets';
import { CustomModal, Input } from '@components';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ReportModalProps {
    onGoback: () => void;
    modalVisible: boolean;
    onModalVisible: () => void;
}

const ReportModal = (props: ReportModalProps) => {
    const { onGoback, modalVisible, onModalVisible } = props;
    const [thank, setThank] = useState<boolean>(false);
    const [reportContent, setReportContent] = useState<{
        char: string;
        content: string;
    }>({
        char: '',
        content: '',
    });
    const [error, setError] = useState('');

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
        setError('');
        if (thank) {
            setThank(false);
            onGoback();
        } else {
            if (reportContent.char && reportContent.content) {
                try {
                    await reportWords(reportContent);
                    setReportContent({ char: '', content: '' });
                } catch {
                    setError('Có lỗi sảy ra');
                }
                setThank(true);
            } else {
                onGoback();
            }
            // } else {
            //     setError('Chưa nhập nội dung');
            // }
        }
    };
    return (
        <CustomModal
            modalVisible={modalVisible}
            onModalVisible={onModalVisible}
            onClose={onSendReport}>
            <View style={styles.container}>
                {thank ? (
                    <>
                        <Text>Cám ơn bạn đã đóng góp!</Text>
                        <Text>Chúng mình đã ghi lại cẩn thận rùi nha.</Text>
                    </>
                ) : (
                    <>
                        <Input
                            label="Từ"
                            value={reportContent.char}
                            onChangeValue={value =>
                                handleChangeValue(value, 'char')
                            }
                            placeholder="日"
                        />
                        <Input
                            label="Nội dung vấn đề"
                            value={reportContent.content}
                            onChangeValue={value =>
                                handleChangeValue(value, 'content')
                            }
                            placeholder="từ đang có vấn đề là...."
                            multiline
                            numberOfLines={5}
                        />
                        <Text style={styles.error}>{error}</Text>
                    </>
                )}
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Spacing.height16,
    },
    error: {
        color: 'red',
    },
});

export default memo(ReportModal);
