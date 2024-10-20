import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const heroImageToken = process.env.EXPO_PUBLIC_KEY;

const getHeroImage = async (id) => {
    try {
        const response = await fetch(`https://superheroapi.com/api/${heroImageToken}/${id}/image`);
        const data = await response.json();
        return data.url;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const Post = ({ username, content, likes, liked, id }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            const url = await getHeroImage(id);
            if (url) {
                setImageUrl(url);
            } else {
                setImageUrl('');
            }
        };
        fetchImage();
    }, [id]);

    return (
        <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{username}</Text>
            <View style={styles.postContent}>
            {imageUrl ? (
                imageUrl !== '' ? (
                    <Image source={{ uri: imageUrl }} style={styles.heroImage} />
                ) : (
                    <Text>Image could not be loaded</Text>
                )
            ) : (
                <Text>Loading image...</Text>
            )}
                    <Text style={{ flexShrink: 1 }}>{content}</Text>
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
    heroImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
});

export default Post;
