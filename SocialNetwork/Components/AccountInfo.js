import React, { useState, useEffect, useContext } from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import Post from './Post';

// currentUserId is the id of the user currently signed in; id is the id of the user who's account is gonna get displayed
export default function AccountInfo({currentUserId, id, username, followerCount, followingCount, isFollowing}){

    return (
        <View>
            <View style={styles.infoContainer}>

                <View style={[styles.userIcon, { backgroundColor: 'red' }]}>
                    <Text style={styles.userIconText}>{username[0].toUpperCase()}</Text>
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
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
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