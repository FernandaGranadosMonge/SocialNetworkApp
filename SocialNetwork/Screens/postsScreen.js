import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, SafeAreaView, StyleSheet, Pressable } from 'react-native';

import Post from '../Components/Post';

export default function PostsScreen({ route }) {
    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const { token, userId, username } = route.params;
    const [page, setPage] = useState(1);
    const [isMoreData, setIsMoreData] = useState(true);

    const randomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    };
    
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            ) : posts.length > 0 ? (
                <FlatList
                    data={posts}
                    keyExtractor={({ id }) => id.toString()}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => setPage((prevPage) => prevPage + 1)}
                    renderItem={({ item }) => (
                        <Post
                            title={item.title}
                            content={item.content}
                            username={item.username}
                            likes={item.likes}
                            color={randomColor()}
                        />
                    )}
                    ListFooterComponent={isMoreData ? <ActivityIndicator size="small" /> : null}
                />
            ) : (
                <View style={styles.container}>
                    <Text style={styles.noPostsText}>No posts available</Text>
                    <Pressable onPress={getPosts}>
                        <Text>Reload</Text>
                    </Pressable>
                </View>
            )}
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
});
