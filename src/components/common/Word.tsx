import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Spacing, FontSize, Images } from '@assets';
import { limitChar } from '@utils';
import {
    noteMyWord,
    selectWords,
    useAppDispatch,
    useAppSelector,
} from '@stores';
import { CharsItem, CharsMyItem } from '@types';

interface WordProps {
    onPress?: () => void;
    word: CharsItem;
}

export const Word = (props: WordProps) => {
    const { word, onPress } = props;

    const dispatch = useAppDispatch();
    const words = useAppSelector(selectWords);
    const myWord = words?.myWords?.find(wordItem => wordItem?.id === word.id);

    const handleNote = (e: any) => {
        e.preventDefault();
        const myWordParam: CharsMyItem = {
            ...word,
            myNote: '',
            isLearn: false,
        };
        dispatch(noteMyWord(myWordParam));
    };

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={onPress}>
            <View style={styles.wordContainer}>
                <View style={styles.word}>
                    <Text style={styles.wordTitle}>
                        {limitChar(word.word, 5, false)}
                    </Text>
                    <Text style={styles.wordDescription}>
                        {limitChar(word.reading, 5, false)}
                    </Text>
                </View>
                <View>
                    {!myWord && (
                        <TouchableOpacity onPress={handleNote}>
                            <Image
                                source={Images.note}
                                style={styles.noteImage}
                            />
                        </TouchableOpacity>
                    )}

                    <Text style={styles.translateTitle}>
                        {limitChar(word.meaning, 15)}
                    </Text>
                </View>
            </View>

            <Text style={styles.translateDescription}>{word.note}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: 'rgba(29, 161, 243, 0.29)',
        paddingVertical: Spacing.height12,
        paddingHorizontal: Spacing.width10,
        borderWidth: Spacing.width1,
    },

    wordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
    },
    noteImage: {
        position: 'absolute',
        top: -13,
        right: 0,
    },

    word: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    wordTitle: {
        fontSize: FontSize.Font18,
        color: '#000000',
    },

    wordDescription: {
        fontSize: FontSize.Font8,
        color: '#00000063',
        marginTop: 6,
        marginLeft: 8,
    },

    translateTitle: {
        fontSize: FontSize.Font13,
        color: '#00000063',
    },

    translateDescription: {
        fontSize: FontSize.Font12,
        color: '#00000075',
        marginTop: Spacing.height12,
    },
});
