import { Comment, CommonButton, Input } from '@components';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharsComment, CharsItem } from '@types';
import NoteModal from './NoteModal';
import ReportModal from './ReportModal';
import { styles } from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { commentPost, getWord } from '@api';
import { selectWords, useAppSelector } from '@stores';

export const KanjiDetail = () => {
    const route: any = useRoute();
    let { item }: { item: CharsItem } = route.params || {};
    const [word, setWord] = useState(item);

    const words = useAppSelector(selectWords);
    const myWord = words?.myWords?.find(wordItem => wordItem?.id === item?.id);

    const fetchWord = useCallback(async () => {
        try {
            const res = await getWord(item.id);
            setWord(res.data);
        } catch {
            //
        }
    }, [item.id]);
    useEffect(() => {
        fetchWord();
    }, [fetchWord]);
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
                    id: item.id,
                    author_name: authorName || 'Người Dùng',
                    content,
                };
                await commentPost(params);
                fetchWord();
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
                <View style={styles.kanjiTop}>
                    <Text style={styles.kanjiWord}>{item?.word}</Text>

                    <Text style={styles.kanjiMeaning}>{item?.reading}</Text>
                    <Text style={styles.kanjiNote}>{item?.note}</Text>
                </View>
                <View style={styles.kanjiSmallNote}>
                    <Text>Nghĩa: {item?.meaning}</Text>
                </View>
                <View style={styles.kanjiSmallNote}>
                    <Text>Âm Kun:{item?.kun}</Text>
                </View>
                <View style={styles.kanjiSmallNote}>
                    <Text>Âm On: {item?.on}</Text>
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
