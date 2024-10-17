import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function UserIcon({ username, color }) {
    return (
        <View style={[styles.userIcon, { backgroundColor: color }]}>
            <Text style={styles.userIconText}>{username[0].toUpperCase()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userIconText: {
        color: 'white',
        fontSize: 20,
    },
});
