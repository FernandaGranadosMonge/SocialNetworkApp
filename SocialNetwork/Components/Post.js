import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const heroImageToken = 'a8e7ff77d984eb69f8932fcff236d68b';
const imageCache = {}; 

const getHeroImage = async (id) => {
    if (imageCache[id]) {
        return imageCache[id];
    }
    
    try {
        const response = await fetch(`https://superheroapi.com/api/${heroImageToken}/${id}/image`);
        const data = await response.json();
        imageCache[id] = data.url;
        return data.url;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const Post = ({ username, content, likes, liked, id}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const navigation = useNavigation();

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
                        <TouchableOpacity onPress={() => {navigation.navigate('Others Profile', {userId: id} ) }}>
                            <Image source={{ uri: imageUrl }} style={styles.heroImage} />
                        </TouchableOpacity>
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
                    <Text style={styles.likesText}>
                        {likes > 0 ? `${likes} like${likes > 1 ? 's' : ''}` : 'No likes yet'}
                    </Text>
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
        backgroundColor: '#d4f3d4',
        borderRadius: 10,
        marginVertical: 6
    },
    postContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
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
        marginRight: 15,
        borderRadius: 25,
        marginBottom: 3
    },
    likesText: {
        marginLeft: 5
    }
});

export default Post;
