import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontSize, FontWithBold, Spacing, Images } from '@assets';
import { CharsComment, CharsCommentInteract } from '@types';
import {
    useAppSelector,
    selectWords,
    useAppDispatch,
    likeComment,
    unlikeComment,
} from '@stores';
import { StatusEnum } from '@enum';
import { commentInteract } from '@api';

interface Props {
    comment: CharsComment;
}

const deviceId = DeviceInfo.getUniqueId();

export const Comment = (props: Props) => {
    const { comment } = props;
    const dispatch = useAppDispatch();
    const words = useAppSelector(selectWords);
    const isLike = words.likeComments.includes(comment.id);
    const isUnlike = words.unlikeComments.includes(comment.id);
    const likeCount = isLike ? 1 : 0;
    const unlikeCount = isUnlike ? 1 : 0;

    const handleLike = async () => {
        if (!isLike) {
            const params: CharsCommentInteract = {
                device_fcm: deviceId,
                id: comment.id,
                status: StatusEnum.Active,
            };
            await commentInteract(params);
            dispatch(likeComment(comment.id));
        }
    };

    const handleUnlike = async () => {
        if (!unlikeCount) {
            const params: CharsCommentInteract = {
                device_fcm: deviceId,
                id: comment.id,
                status: StatusEnum.InActive,
            };
            await commentInteract(params);
            dispatch(unlikeComment(comment.id));
        }
    };

    return (
        <View>
            <View style={styles.content}>
                <Text style={styles.commentText}>{comment.content}</Text>
                <View style={styles.commentItem}>
                    <View style={styles.reaction}>
                        {typeof comment.like !== 'undefined' &&
                        (isLike || !isUnlike) ? (
                            <View style={styles.reactionItem}>
                                <Text style={styles.reactionCount}>
                                    {comment.like + likeCount}
                                </Text>
                                <TouchableOpacity onPress={handleLike}>
                                    <Image
                                        source={
                                            isLike
                                                ? Images.likeActive
                                                : Images.like
                                        }
                                        style={styles.reactionImage}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <></>
                        )}
                        {typeof comment.unlike !== 'undefined' &&
                        (isUnlike || !isLike) ? (
                            <View style={styles.reactionItem}>
                                <Text style={styles.reactionCount}>
                                    {comment.unlike + unlikeCount}
                                </Text>
                                <TouchableOpacity onPress={handleUnlike}>
                                    <Image
                                        source={
                                            isUnlike
                                                ? Images.unlikeActive
                                                : Images.unlike
                                        }
                                        style={styles.reactionImage}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <></>
                        )}
                    </View>
                    <Text style={styles.author}>{comment.author_name}</Text>
                </View>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
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
        paddingTop: Spacing.height12,
        paddingBottom: Spacing.height12,
    },

    reactionImage: {
        width: Spacing.width14,
        height: Spacing.height18,
        marginRight: Spacing.height12,
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
});
