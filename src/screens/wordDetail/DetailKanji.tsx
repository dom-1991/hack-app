import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { Comment, CommonButton, Input } from '@components';
import { CharsComment, CharsItem } from '@types';
import NoteModal from './NoteModal';
import ReportModal from './ReportModal';
import { styles } from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { commentPost, getWord } from '@api';
import { selectWords, useAppSelector } from '@stores';
import { Images } from '@assets';

export const KanjiDetail = () => {
    const route: any = useRoute();
    let { item }: { item: CharsItem } = route.params || {};
    const [word, setWord] = useState(item);
    const [next, setNext] = useState<number>(-1);
    const [prev, setPrev] = useState<number>(-1);

    const words = useAppSelector(selectWords);
    const myWord = words?.myWords?.find(wordItem => wordItem?.id === word?.id);

    const fetchWord = useCallback(async (id: number) => {
        try {
            const res = await getWord(id);
            setWord(res.data);
            //@ts-ignore
            setNext(res?.next);
            //@ts-ignore
            setPrev(res?.prev);
        } catch {
            //
        }
    }, []);
    useEffect(() => {
        fetchWord(item.id);
    }, [fetchWord, item.id]);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [noteModalVisible, setNoteModalVisible] = useState(false);

    const [content, setContent] = useState<string>('');
    const [authorName, setAuthorName] = useState<string>('');

    const handleReportModalVisible = useCallback(() => {
        setReportModalVisible(!reportModalVisible);
    }, [reportModalVisible]);

    const handleNoteModalVisible = useCallback(() => {
        setNoteModalVisible(!noteModalVisible);
    }, [noteModalVisible]);

    const handleComment = async () => {
        if (content) {
            try {
                const params: CharsComment = {
                    id: word.id,
                    author_name: authorName || 'Người Dùng',
                    content,
                };
                await commentPost(params);
                fetchWord(word.id);
                setContent('');
            } catch {
                //
            }
        }
    };

    const handleNext = () => {
        fetchWord(next);
    };

    const handlePrev = () => {
        fetchWord(prev);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.noteContain}>
                <TouchableOpacity onPress={handlePrev}>
                    <Image source={Images.prev} style={styles.soundIcon} />
                </TouchableOpacity>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.inner}>
                    <View style={styles.kanjiTop}>
                        <Text style={styles.kanjiWord}>{word?.word}</Text>

                        <Text style={styles.kanjiMeaning}>{word?.reading}</Text>
                        <Text style={styles.kanjiNote}>{word?.note}</Text>
                    </View>
                    <View style={styles.kanjiSmallNote}>
                        <Text>Nghĩa: {word?.meaning}</Text>
                    </View>
                    <View style={styles.kanjiSmallNote}>
                        <Text>Âm Kun:{word?.kun}</Text>
                    </View>
                    <View style={styles.kanjiSmallNote}>
                        <Text>Âm On: {word?.on}</Text>
                    </View>

                    {myWord ? (
                        <></>
                    ) : (
                        <View style={styles.noteButton}>
                            <CommonButton
                                title="Thêm vào Note"
                                onPress={handleNoteModalVisible}
                            />
                        </View>
                    )}

                    <View style={styles.comment}>
                        <Text style={styles.commentHeading}>Các góp ý</Text>
                        <ScrollView style={styles.commentContainer}>
                            {word.comment.map(comment => (
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
                                value={authorName}
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

                    <TouchableOpacity onPress={handleReportModalVisible}>
                        <Text style={styles.reportButton}>
                            Báo cáo từ này có vấn đề
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity onPress={handleNext}>
                    <Image source={Images.next} style={styles.soundIcon} />
                </TouchableOpacity>
            </View>
            {word && (
                <NoteModal
                    word={word}
                    onGoback={handleNoteModalVisible}
                    modalVisible={noteModalVisible}
                    onModalVisible={handleNoteModalVisible}
                />
            )}

            <ReportModal
                onGoback={handleReportModalVisible}
                modalVisible={reportModalVisible}
                onModalVisible={handleReportModalVisible}
                word={word.word}
            />
        </KeyboardAvoidingView>
    );
};
