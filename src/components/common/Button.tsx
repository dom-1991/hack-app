import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Spacing, FontSize } from '@assets';

interface ButtonProps {
    type?: 'small' | 'full';
    backgroundColor?: string;
    title: string;
    disabled?: boolean;
    onPress?: () => void;
}

export const CommonButton = (props: ButtonProps) => {
    const {
        type = 'full',
        backgroundColor = 'rgba(29, 161, 243, 0.56)',
        title,
        onPress,
        disabled,
    } = props;

    const stylesButton = [
        styles.button,
        type === 'small' && styles.buttonSmall,
        { backgroundColor: backgroundColor },
    ];

    const stylesTitle = [styles.title, type === 'small' && styles.titleSmall];

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={stylesButton}
            disabled={disabled}
            onPress={onPress}>
            <Text style={stylesTitle}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        paddingVertical: Spacing.height8,
        // marginHorizontal: Spacing.width25,
        borderRadius: Spacing.width20,
    },

    buttonSmall: {
        alignSelf: 'flex-start',
        minWidth: Spacing.width78,
        paddingVertical: Spacing.height2,
        paddingHorizontal: Spacing.width18,
    },

    title: {
        fontSize: FontSize.Font24,
        color: '#fff',
    },

    titleSmall: {
        fontSize: FontSize.Font18,
    },
});
