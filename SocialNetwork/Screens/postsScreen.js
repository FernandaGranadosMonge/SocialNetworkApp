import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg5LCJpYXQiOjE3MjkwMzYxMjEsImV4cCI6MTcyOTA0MzMyMX0.BiY2Un0nWUWyIBQQI7ije5o4t5uvNrn9eE1S2orJDGY';

export default function PostsScreen() {
    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const request = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            };

            const response = await fetch('https://social-network-v7j7.onrender.com/api/posts?page=1&limit=10', request);
            const data = await response.json();

            setPosts(data || []);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

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
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text>{item.content}</Text>
                            <Text style={styles.postAuthor}>By {item.username}</Text>
                        </View>
                    )}
                />
            ) : (
                <View style={styles.container}>
                    <Text style={styles.noPostsText}>No posts available</Text>
                </View>
            )}
        </SafeAreaView>
    );
}
