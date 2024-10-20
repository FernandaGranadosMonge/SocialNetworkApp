import React, { useState, useEffect, useContext } from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import Post from './Post';


const heroImageToken = process.env.EXPO_PUBLIC_KEY;
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

// currentUserId is the id of the user currently signed in; id is the id of the user who's account is gonna get displayed
export default function AccountInfo({currentUserId, id, username, followerCount, followingCount, isFollowing}){
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
        <View>
            <View style={styles.infoContainer}>
                <View style={[styles.userIcon]}>
                    {imageUrl ? (
                        imageUrl !== '' ? (
                            <Image source={{ uri: imageUrl }} style={styles.userIcon} />
                        ) : (
                            <Text style={styles.userIconText}>{username[0]}</Text>
                        )
                    ) : (
                        <Text>Loading image...</Text>
                    )}
                </View>

                <Text style={styles.username}>{username}</Text>

                <View style={styles.followContainer}>
                    <Text>Followers: {followerCount}</Text>
                    <Text>Following: {followingCount}</Text>
                </View>

                {currentUserId == id?
                    null:
                    <Pressable style={styles.followButton}>
                        <Text style={{color: 'white'}}> {isFollowing? "Unfollow" : "Follow"} </Text>
                    </Pressable>
                }

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 15,
        paddingVertical: 15
    },
    userIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    userIconText: {
        color: 'white',
        fontSize: 35,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },
    followContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between'
    },
    followButton: {
        marginTop: 10,
        backgroundColor: '#3636ff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 35,
        borderRadius: 5
    },
});