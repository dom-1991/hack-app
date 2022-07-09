import { Spacing, FontSize, FontWithBold, Images } from '@assets';
import React from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Contact = () => {
    const momo = '0583597438';
    const mbBank = '0583597438';
    const fb = 'https://www.facebook.com/hacknaotiengnhatn12345';
    const email = 'tomuhedspi@gmail.com';
    const copyToClipBoard = (text: string) => {
        Clipboard.setString(text);
        Alert.alert('Copy to clipboard!');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.heading}>
                    Hãy mời đội ngũ phát triển một vài cốc tà tữa nha!
                </Text>
                <View style={styles.momo}>
                    <Text style={styles.title}>Momo</Text>
                    <TouchableOpacity
                        onPress={() => {
                            copyToClipBoard(momo);
                        }}>
                        <Text style={styles.description}>{momo}</Text>
                    </TouchableOpacity>
                    <Text style={styles.bankAuthor}>Nguyễn Thị Thơm</Text>

                    <Image source={Images.momo} style={styles.momoQR} />
                </View>

                <View style={styles.bank}>
                    <Text style={styles.title}>
                        MB bank(Ngân Hàng Quân Đội):
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            copyToClipBoard(mbBank);
                        }}>
                        <Text style={styles.description}>{mbBank}</Text>
                    </TouchableOpacity>
                    <Text style={styles.bankAuthor}>Nguyễn Thị Thơm</Text>
                    <Image source={Images.bank} style={styles.bankImage} />
                </View>
                <View style={styles.email}>
                    <Text style={styles.title}>Fanpage:</Text>

                    <TouchableOpacity
                        onPress={() => {
                            copyToClipBoard(fb);
                        }}>
                        <Text style={styles.description}>{fb}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.email}>
                    <Text style={styles.title}>Email:</Text>
                    <TouchableOpacity
                        onPress={() => {
                            copyToClipBoard(email);
                        }}>
                        <Text style={styles.description}>{email}</Text>
                    </TouchableOpacity>
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
        fontSize: FontSize.Font12,
        color: '#1DA1F3',
        ...FontWithBold.Bold_300,
        paddingTop: Spacing.height8,
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
        fontSize: FontSize.Font12,
        marginTop: Spacing.width22,
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
