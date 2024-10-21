import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import AccountInfo from '../Components/AccountInfo';
import { AuthContext } from '../Components/Context';
import Post from '../Components/Post';


export default function OthersProfileScreen({route}){
    const { token, userId } = useContext(AuthContext);
    const otherUserId = route.params.userId;
    const [isLoading, setLoading] = useState(true);
    const [followerCount, setFollowerCount] = useState('');
    const [followingCount, setFollowingCount] = useState('');
    const [isFollowing, setIsFollowing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isMoreData, setIsMoreData] = useState(true);
    const [username, setUsername] = useState('')

    const getAccountInfo = async () =>{
        try {
            const request = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(`https://social-network-v7j7.onrender.com/api/users/${otherUserId}`, request);
            const data = await response.json();

            if(response.ok){
                setFollowerCount(data.follower_count);
                setFollowingCount(data.following_count)
                setIsFollowing(data.is_following)
                setUsername(data.username)
            }

        } catch (error) {
            console.error(error);
        } finally {
        }
    };

    const getPosts = async () => {

        try {
            const request = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(`https://social-network-v7j7.onrender.com/api/users/${otherUserId}/posts?page=${page}&limit=10`, request);
            const dataPosts = await response.json();

            if (dataPosts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...dataPosts]); 
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

    getAccountInfo();

    return (
        <SafeAreaView>
            <AccountInfo 
                currentUserId={userId}
                id={otherUserId} 
                username={username} 
                followerCount={followerCount} 
                followingCount={followingCount} 
                isFollowing={isFollowing}
            />

            <View style={styles.postsContainer}>
                <Text style={styles.title}>Posts</Text>

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
                        <View style={styles.noPostsContainer}>
                            <Text style={styles.noPostsText}>No posts available</Text>
                        </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    postsContainer: {
        marginTop: 5,
        marginBottom: 630,
    },
    title: {
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    noPostsContainer: {
        margin: 10,
        alignSelf: 'center'
    },
    noPostsText: {
        color: 'gray'
    }
});