import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, ActivityIndicator, SafeAreaView, StyleSheet, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
import { AuthContext } from '../Components/Context';

import Post from '../Components/Post';

export default function PostsScreen( {navigation} ) {	
    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const { token, userId, username } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [isMoreData, setIsMoreData] = useState(true);

    const getPosts = async () => {
        if (!isMoreData) return;

        try {
            const request = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
    
            const response = await fetch(`https://social-network-v7j7.onrender.com/api/posts?page=${page}&limit=10`, request);
            const data = await response.json();
    
            if (data.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...data]);
            } else {
                setIsMoreData(false);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };

    
    useEffect(() => {
        getPosts();
    }, [page]);

    const loadMoreData = () => {
        if (isMoreData) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ImageBackground 
                    source={require('../assets/whatsappDangerBg.jpg')} 
                    imageStyle={{ opacity: 0.5 }} 
                    style={{ flex: 1 }}
                >
                    {isLoading && page === 1 ? (
                        <View style={styles.container}>
                            <ActivityIndicator size="large" />
                        </View>
                    ) : posts.length > 0 ? (
                        <FlatList
                            data={posts}
                            keyExtractor={({ id, created_at }) => `${id}-${created_at}`}
                            onEndReachedThreshold={0.1}
                            onEndReached={loadMoreData}
                            ListFooterComponent={isMoreData ? <ActivityIndicator size="small" /> : null}
                            renderItem={({ item }) => (
                                <Post
                                    id={item.user_id}
                                    title={item.title}
                                    content={item.content}
                                    username={item.username}
                                    likes={item.likes.length}
                                />
                            )}
                        />
                    ) : (
                        <View style={styles.container}>
                            <Text style={styles.noPostsText}>No posts available</Text>
                        </View>
                    )}
                </ImageBackground>

                <TouchableOpacity 
                    style={styles.createPostButton} 
                    onPress={() => { navigation.navigate('Create Post'); }}
                >
                    <Text style={styles.createPostText}>Create New Post</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    postContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    postAuthor: {
        fontStyle: 'italic',
        marginVertical: 5,
    },
    noPostsText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 20,
    },
    createPostButton: {
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
    },
    createPostText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});