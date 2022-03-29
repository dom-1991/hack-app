import { Spacing, FontSize, FontWithBold, Images } from '@assets';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export const Contact = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.heading}>
                    Hãy mời đội ngũ phát triển một vài cốc tà tữa nha!
                </Text>
                <View style={styles.momo}>
                    <Text style={styles.title}>Momo</Text>
                    <Text style={styles.description}>0583597438</Text>
                    <Text style={styles.bankAuthor}>Nguyễn Thị Thơm</Text>

                    <Image source={Images.momo} style={styles.momoQR} />
                </View>

                <View style={styles.bank}>
                    <Text style={styles.title}>
                        MB bank(Ngân Hàng Quân Đội):
                    </Text>
                    <Text style={styles.description}>0583597438</Text>
                    <Text style={styles.bankAuthor}>Nguyễn Thị Thơm</Text>
                    <Image source={Images.bank} style={styles.bankImage} />
                </View>
                <View style={styles.email}>
                    <Text style={styles.title}>Email:</Text>
                    <Text style={styles.description}>tomuhedspi@gmail.com</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    scroll: {
        flex: 1,
        paddingHorizontal: Spacing.height20,
    },

    heading: {
        fontSize: FontSize.Font24,
        ...FontWithBold.Bold_700,
        textAlign: 'center',
    },

    title: {
        fontSize: FontSize.Font18,
    },

    description: {
        fontSize: FontSize.Font24,
        color: '#1DA1F3',
        ...FontWithBold.Bold_300,
        paddingVertical: Spacing.height8,
        textAlign: 'center',
    },

    momo: {
        marginTop: Spacing.width32,
    },

    bank: {
        marginTop: Spacing.width32,
    },

    bankAuthor: {
        fontSize: FontSize.Font12,
        ...FontWithBold.Bold_400,
        textAlign: 'center',
    },

    email: {
        marginTop: Spacing.width32,
        paddingBottom: Spacing.height20,
    },

    momoQR: {
        width: Spacing.height213,
        resizeMode: 'contain',
        height: Spacing.height213,
        alignSelf: 'center',
        marginTop: Spacing.width12,
    },

    bankImage: {
        width: '100%',
        resizeMode: 'contain',
        height: Spacing.height375,
        alignSelf: 'center',
        marginTop: Spacing.width12,
    },
});
