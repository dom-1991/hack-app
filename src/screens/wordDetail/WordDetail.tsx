import { Images } from '@assets';
import { Comment, CommonButton, Input } from '@components';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import { CharsComment, CharsItem } from '@types';
import NoteModal from './NoteModal';
import ReportModal from './ReportModal';
import { styles } from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { commentPost } from '@api';
import { selectWords, useAppSelector } from '@stores';

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
    let { item }: { item: CharsItem } = route.params || {};

    const words = useAppSelector(selectWords);
    const myWord = words?.myWords?.find(word => word?.id === item?.id);

    const onTextToSpeech = (text: string) => {
        Tts.speak(text);
    };
    console.log(words, myWord);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [noteModalVisible, setNoteModalVisible] = useState(false);
    const [comments, setComments] = useState<CharsComment[]>(
        item?.comment || [],
    );
    const [content, setContent] = useState<string>('');
    const [author_name, setAuthorName] = useState<string>('');

    const handleReportModalVisible = useCallback(() => {
        setReportModalVisible(!reportModalVisible);
    }, [reportModalVisible]);

    const handleNoteModalVisible = useCallback(() => {
        setNoteModalVisible(!noteModalVisible);
    }, [noteModalVisible]);

    const handleComment = async () => {
        if (author_name && content) {
            try {
                const params: CharsComment = {
                    id: item.id,
                    author_name,
                    content,
                };
                await commentPost(params);
                setComments([
                    ...comments,
                    { id: Date.now(), author_name, content },
                ]);
                setContent('');
            } catch {
                //
            }
        }
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
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                onTextToSpeech(item?.read);
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

                {!!myWord && myWord.myNote ? (
                    <></>
                ) : (
                    <View style={styles.noteButton}>
                        <CommonButton
                            title="Note lại để học sau"
                            onPress={handleNoteModalVisible}
                        />
                    </View>
                )}

                <View style={styles.comment}>
                    <Text style={styles.commentHeading}>Các góp ý</Text>
                    <ScrollView style={styles.commentContainer}>
                        {comments.map(comment => (
                            <Comment comment={comment} key={comment.id} />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.addComment}>
                    <Input
                        value={content}
                        onChangeValue={value => {
                            setContent(value);
                        }}
                        placeholder="Thêm góp ý của bạn..."
                    />
                    <View style={styles.addCommentAction}>
                        <Input
                            size="small"
                            placeholder="Tên của bạn"
                            value={author_name}
                            onChangeValue={value => {
                                setAuthorName(value);
                            }}
                        />
                        <View style={styles.sendCommentButton}>
                            <CommonButton
                                type="small"
                                title="Gửi"
                                onPress={handleComment}
                            />
                        </View>
                    </View>
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
            </ScrollView>
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
