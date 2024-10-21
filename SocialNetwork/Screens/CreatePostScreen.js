import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../Components/Context';

export default function CreatePostScreen( {navigation} ) {
    const { token } = useContext(AuthContext);
    const [newContent, setNewContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [page, setPage] = useState(1);
    const [successMessage, setSuccessMessage] = useState('');
    

    const createPost = async () => {
        if (!newContent) {
            Alert.alert('Error', 'Content cannot be empty');
        }

        try {
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content: newContent }),
            };

            const response = await fetch(`https://social-network-v7j7.onrender.com/api/posts`, request);

            if(response.ok){
                setNewContent(''); 
                setSuccessMessage('Posted!')

            } else {
                if (data.errors.length > 0) {
                    setErrorMessage(data.errors[0].msg); 
                } else {
                    setErrorMessage('Something went wrong.');
                }
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while creating the post');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="What's up, danger?"
                    multiline
                    value={newContent}
                    onChangeText={setNewContent}
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity 
                style={styles.postButton} 
                // onPress={createPost}
                onPress={async () => {
                    await createPost();
                    navigation.navigate('Main App', {
                    screen: 'All Posts', 
                    params: { refresh: true },
                })}}>
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center', 
        alignItems: 'center',    
        padding: 20,
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        width: '100%',
        height: '50%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    input: {
        flex: .8,
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    postButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    postButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
