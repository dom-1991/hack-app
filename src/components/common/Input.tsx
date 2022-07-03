import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Spacing, FontSize } from '@assets';

interface InputProps {
    value: string;
    label?: string;
    placeholder: string;
    multiline?: boolean;
    numberOfLines?: number;
    onChangeValue: (value: string) => void;
    blurOnSubmit?: boolean;
    error?: string;
    size?: string;
}

export const Input = (props: InputProps) => {
    const {
        value,
        label,
        multiline,
        onChangeValue,
        placeholder,
        numberOfLines,
        error,
        blurOnSubmit,
        size,
    } = props;

    const styleInput = [
        styles.input,
        multiline && { height: Spacing.height123, padding: Spacing.width20 },
        size && styles.inputSmall,
    ];
    return (
        <View style={styles.container}>
            {!!label?.length && <Text style={styles.label}>{label}</Text>}
            <TextInput
                blurOnSubmit={blurOnSubmit}
                style={styleInput}
                onChangeText={onChangeValue}
                value={value}
                placeholder={placeholder}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
            {!!error && !!error?.length && (
                <Text style={styles.error}>{error}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.height8,
    },

    label: {
        fontSize: FontSize.Font18,
        marginBottom: Spacing.height10,
    },

    input: {
        // height: Spacing.height40,
        borderWidth: Spacing.width1,
        borderRadius: Spacing.width10,
        borderColor: 'rgba(29, 161, 243, 0.64)',
        padding: Spacing.width10,
        fontSize: FontSize.Font14,
        lineHeight: Spacing.height19,
    },

    inputSmall: {
        // height: Spacing.height40,
        borderWidth: Spacing.width1,
        borderRadius: Spacing.width4,
        borderColor: 'rgba(29, 161, 243, 0.64)',
        padding: Spacing.width4,
        fontSize: FontSize.Font12,
        lineHeight: Spacing.height16,
        minWidth: Spacing.width100,
    },

    error: {
        fontSize: FontSize.Font12,
        marginBottom: Spacing.height10,
        fontStyle: 'italic',
        marginTop: Spacing.height4,
        fontWeight: '300',
    },
});
