import { FontSize, FontWithBold, Spacing } from '@assets';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Spacing.height20,
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.height20,
        alignItems: 'center',
    },

    inner: {
        flex: 1,
        width: '100%',
    },

    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    kanjiTop: {
        alignItems: 'center',
    },

    word: {
        fontSize: FontSize.Font24,
    },

    kanjiWord: {
        fontSize: FontSize.Font65,
    },

    read: {
        fontSize: FontSize.Font14,
        color: 'rgba(0, 0, 0, 0.78)',
        textAlign: 'center',
    },

    noteRead: {
        fontSize: FontSize.Font10,
        color: 'rgba(0, 0, 0, 0.78)',
        textAlign: 'center',
    },

    meaning: {
        fontSize: FontSize.Font24,
        marginVertical: Spacing.height16,
        color: 'rgba(0, 0, 0, 0.87)',
    },

    kanjiMeaning: {
        fontSize: FontSize.Font24,
        marginTop: Spacing.height32,
        marginBottom: Spacing.height12,
        color: 'rgba(0, 0, 0, 0.87)',
    },

    note: {
        fontSize: FontSize.Font24,
        marginTop: Spacing.height20,
        color: 'rgba(0, 0, 0, 0.87)',
        marginBottom: Spacing.height40,
    },

    noteMyNote: {
        fontSize: FontSize.Font14,
        color: 'rgba(0, 0, 0, 0.78)',
    },

    kanjiNote: {
        fontSize: FontSize.Font16,
        marginBottom: Spacing.height30,
        color: 'rgba(0, 0, 0, 0.87)',
    },

    myNote: {
        fontSize: FontSize.Font13,
        marginBottom: Spacing.height60,
        color: 'rgba(0, 0, 0, 0.87)',
    },

    kanjiSmallNote: {
        fontSize: FontSize.Font16,
        marginBottom: Spacing.height10,
        color: 'rgba(0, 0, 0, 0.87)',
    },

    noteButton: {
        marginBottom: Spacing.height28,
    },

    soundIcon: {
        width: Spacing.width24,
        height: Spacing.height21,
        marginBottom: Spacing.height10,
    },

    editIcon: {
        width: Spacing.width24,
        height: Spacing.height21,
        marginBottom: Spacing.height10,
        marginLeft: Spacing.height15,
    },
    trashIcon: {
        width: Spacing.width16,
        height: Spacing.height21,
        marginBottom: Spacing.height10,
        marginLeft: Spacing.height15,
    },

    comment: {},

    commentContainer: {
        maxHeight: Spacing.height200,
    },

    commentHeading: {
        fontSize: FontSize.Font16,
        color: 'rgba(0, 0, 0, 0.78)',
        marginBottom: Spacing.height16,
        ...FontWithBold.Bold_700,
    },

    commentItem: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

    content: {},

    commentText: {
        fontSize: FontSize.Font14,
        color: 'rgba(0, 0, 0, 0.63)',
    },

    reaction: {
        flexDirection: 'row',
    },

    reactionItem: {
        flexDirection: 'row',
        padding: Spacing.height12,
    },

    reactionImage: {
        width: Spacing.width14,
        height: Spacing.height18,
    },

    reactionCount: {
        fontSize: FontSize.Font12,
        color: 'rgba(0, 0, 0, 0.55)',
        marginRight: Spacing.height8,
    },

    author: {
        fontSize: FontSize.Font11,
        ...FontWithBold.Bold_700,
        color: 'rgba(0, 0, 0, 0.42)',
        paddingBottom: Spacing.height12,
    },

    input: {
        paddingHorizontal: Spacing.height12,
    },

    addComment: {
        marginTop: Spacing.height20,
        marginBottom: Spacing.height64,
    },

    addCommentAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    sendCommentButton: {},

    reportButton: {
        width: '100%',
        bottom: 0,
        marginBottom: Spacing.height20,
        color: '#C4C4C4',
        textAlign: 'center',
    },

    centerNoteModal: {
        marginBottom: Spacing.height20,
    },

    topNoteModal: {
        marginTop: Spacing.height20,
    },
});
