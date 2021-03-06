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

    word: {
        fontSize: FontSize.Font24,
    },

    read: {
        fontSize: FontSize.Font14,
        color: 'rgba(0, 0, 0, 0.78)',
    },

    meaning: {
        fontSize: FontSize.Font24,
        marginVertical: Spacing.height16,
        color: 'rgba(0, 0, 0, 0.87)',
    },

    note: {
        fontSize: FontSize.Font24,
        marginTop: Spacing.height20,
        color: 'rgba(0, 0, 0, 0.87)',
    },

    noteButton: {
        marginTop: Spacing.height56,
        marginBottom: Spacing.height28,
    },

    soundIcon: {
        width: Spacing.width21,
        height: Spacing.height18,
        marginBottom: Spacing.height10,
    },

    comment: {},

    commentHeading: {
        fontSize: FontSize.Font16,
        color: 'rgba(0, 0, 0, 0.78)',
        marginBottom: Spacing.height16,
        ...FontWithBold.Bold_700,
    },

    commentItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    content: {},

    commentText: {
        fontSize: FontSize.Font14,
        color: 'rgba(0, 0, 0, 0.63)',
    },

    reaction: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },

    reactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.height12,
    },

    reactionImage: {
        width: Spacing.width14,
        height: Spacing.height18,
    },

    reactionCount: {
        fontSize: FontSize.Font12,
        color: 'rgba(0, 0, 0, 0.55)',
        marginLeft: Spacing.height8,
    },

    author: {
        fontSize: FontSize.Font11,
        ...FontWithBold.Bold_700,
        color: 'rgba(0, 0, 0, 0.42)',
    },

    input: {
        paddingHorizontal: Spacing.height12,
    },

    addComment: {},

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
    },

    centerNoteModal: {
        marginBottom: Spacing.height20,
    },

    topNoteModal: {
        marginTop: Spacing.height20,
    },
});
