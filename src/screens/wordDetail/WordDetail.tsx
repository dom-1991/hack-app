import { Images } from '@assets';
import { CommonButton } from '@components';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import NoteModal from './NoteModal';
import ReportModal from './ReportModal';
import { styles } from './styles';

export const WordDetail = () => {
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
    let { item }: { item: Home.Word } = route.params || {};

    const onTextToSpeech = (text: string) => {
        Tts.speak(text);
    };

    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [noteModalVisible, setNoteModalVisible] = useState(false);
    const navigation: any = useNavigation();

    const handleGoback = useCallback(() => {
        // navigation.goBack();
    }, [navigation]);

    const handleReportModalVisible = useCallback(() => {
        setReportModalVisible(!reportModalVisible);
    }, [reportModalVisible]);

    const handleNoteModalVisible = useCallback(() => {
        setNoteModalVisible(!noteModalVisible);
    }, [noteModalVisible]);

    return (
        <SafeAreaView
            style={styles.container}
            edges={['left', 'right', 'bottom']}>
            <View style={styles.inner}>
                <View style={styles.top}>
                    <View>
                        <Text style={styles.word}>{item?.word}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                onTextToSpeech(item?.word);
                            }}>
                            <Image
                                source={Images.sound}
                                style={styles.soundIcon}
                            />
                        </TouchableOpacity>

                        <Text style={styles.read}>{item?.read}</Text>
                    </View>
                </View>

                <Text style={styles.meaning}>{item?.meaning}</Text>
                <Text style={styles.note}>{item?.note}</Text>

                <View style={styles.noteButton}>
                    <CommonButton
                        title="Note lại để học sau"
                        onPress={handleNoteModalVisible}
                    />
                </View>
                {/* <View style={styles.comment}>
                    <Text style={styles.commentHeading}>Các góp ý</Text>
                    {item?.comment?.map(comment => (
                        <View style={styles.commentItem} key={comment.id}>
                            <View style={styles.content}>
                                <Text style={styles.commentText}>
                                    {comment.content}
                                </Text>
                                <View style={styles.reaction}>
                                    <View style={styles.reactionItem}>
                                        <Image
                                            source={Images.like}
                                            style={styles.reactionImage}
                                        />
                                        <Text style={styles.reactionCount}>
                                            {comment.like}
                                        </Text>
                                    </View>
                                    <View style={styles.reactionItem}>
                                        <Image
                                            source={Images.unlike}
                                            style={styles.reactionImage}
                                        />
                                        <Text style={styles.reactionCount}>
                                            {comment.unlike}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.author}>
                                {comment.author_name}
                            </Text>
                        </View>
                    ))}
                </View> */}
                {/* <View style={styles.addComment}>
                    <Input
                        // value={value}
                        // onChangeValue={handleChangeValue}
                        placeholder="Thêm góp ý của bạn..."
                    />
                    <View style={styles.addCommentAction}>
                        <Input size="small" placeholder="Tên của bạn" />
                        <View style={styles.sendCommentButton}>
                            <CommonButton type="small" title="Gửi" />
                        </View>
                    </View>

                    
                </View> */}
            </View>
            <SafeAreaView
                style={styles.reportButton}
                edges={['left', 'right', 'bottom']}>
                <CommonButton
                    title="Báo cáo từ này có vấn đề"
                    backgroundColor="#C4C4C4"
                    onPress={handleReportModalVisible}
                />
            </SafeAreaView>
            {item && (
                <NoteModal
                    word={item}
                    onGoback={handleNoteModalVisible}
                    modalVisible={noteModalVisible}
                    onModalVisible={handleNoteModalVisible}
                />
            )}

            <ReportModal
                onGoback={handleReportModalVisible}
                modalVisible={reportModalVisible}
                onModalVisible={handleReportModalVisible}
            />
        </SafeAreaView>
    );
};
