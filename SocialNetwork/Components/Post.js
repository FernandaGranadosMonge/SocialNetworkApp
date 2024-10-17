import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserIcon from './UserIcon';

const Post = ({ username, content, likes, liked, color }) => {
    return (
        <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{username}</Text>
            <View style={styles.postContent}>
                <UserIcon username={username} color={color} style={styles.postIcon} />
                <Text>{content}</Text>
            </View>
            <View style={styles.postFooter}>
                <View style={styles.postLikes}>
                    <Ionicons 
                        name="heart" 
                        color={liked ? 'red' : 'gray'} 
                        size={20} 
                        accessibilityLabel="Likes"
                    />
                    <Text> {likes > 0 ? `${likes} like${likes > 1 ? 's' : ''}` : 'No likes yet'}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        margin: 5,
    },

    postContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },

    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postLikes: {
        flexDirection: 'row',
        fontSize: 12,
        color: '#666666',
    },
});

export default Post;
