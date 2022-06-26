import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Spacing, FontSize } from '@assets';
import { limitWord } from '@utils';

interface WordProps {
    wordTitle: string;
    wordDescription: string;
    translateTitle: string;
    translateDescription: string;
    onPress?: () => void;
}

export const Word = (props: WordProps) => {
    const {
        wordTitle,
        wordDescription,
        translateTitle,
        translateDescription,
        onPress,
    } = props;
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={onPress}>
            <View style={styles.wordContainer}>
                <View style={styles.word}>
                    <Text style={styles.wordTitle}>{wordTitle}</Text>
                    <Text style={styles.wordDescription}>
                        {wordDescription}
                    </Text>
                </View>
                <View>
                    <Text style={styles.translateTitle}>
                        {limitWord(translateTitle, 4)}
                    </Text>
                </View>
            </View>

            <Text style={styles.translateDescription}>
                {translateDescription}
            </Text>
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
