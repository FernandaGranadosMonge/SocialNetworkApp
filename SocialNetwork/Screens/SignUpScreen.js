import { ScrollView, Text, StyleSheet, TextInput, Pressable, View, ImageBackground, ActivityIndicator} from 'react-native';
import React, { useState } from 'react';


export default function SignUpScreen( {navigation} ){
    const [bgColor, setBgColor] = useState('transparent'); // Default background color
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [load, isLoading] = useState(false);

    const manageSignUp = async () => {
        setErrorMessage('');
        if(password !== reEnterPassword) {
            setErrorMessage('Passwords do not match.');
            return; // Prevent the sign-up process from continuing
        }
        isLoading(true);
        

        try {
    
            const response = await fetch('https://social-network-v7j7.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            });
    
            const data = await response.json();

            if(response.ok){
                navigation.navigate('Log In', {
                    token: data.token,
                    userId: data.userId,
                    username: data.username
                })
            } else {
                if (data.errors.length > 0) {
                    setErrorMessage(data.errors[0].msg); 
                } else {
                    setErrorMessage('Invalid sign up.');
                }
            }
    
        } catch (error){
            setErrorMessage('Something went wrong. Try again.')
        }

        isLoading(false);
    }

    
    return (
        <View style={styles.wholePage}>
            <ImageBackground source={require('../assets/whatsappDangerPS4.jpg')} resizeMode='cover' style={styles.image}>
                <View style={styles.content}>
  
                    <Text style = {styles.welcomeText}> Sign Up </Text>
  
                    <TextInput
                      style={styles.inputBox}
                      value={username}
                      onChangeText={setUsername}
                      placeholder={'Username'}
                    />
                  
                    <TextInput
                      style={styles.inputBox}
                      value={email}
                      onChangeText={setEmail}
                      placeholder={'Email'}
                    />
  
                    <TextInput
                      style={styles.inputBox}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={true}
                      placeholder={'Password'}
                    />

                    <TextInput
                      style={styles.inputBox}
                      value={reEnterPassword}
                      onChangeText={setReEnterPassword}
                      secureTextEntry={true}
                      placeholder={'Re-enter Password'}
                    />
  
                    <Pressable style={styles.logInButton} onPress={manageSignUp}>
                        <Text style={styles.textButton}>Sign Up</Text>
                    </Pressable>
                  
                    <View style={styles.signUpContainer}>
                        <Text style={styles.question}>Already have an account?</Text>
                        <Pressable 
                            style={[styles.pressableSignUp, { backgroundColor: bgColor }]}
                            onPressIn={() => setBgColor('#bbbbff')}
                            onPressOut={()=> setBgColor('transparent')}
                            onPress={() => {navigation.navigate('Log In')}}
                        >
                            <Text style={styles.signUp}>Log In</Text>
                        </Pressable>
                    </View>
  
                    {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                    {load ? <ActivityIndicator style={styles.loader} /> : null}
  
                </View>
            </ ImageBackground>
        </View>
      );
}

const styles = StyleSheet.create({
    wholePage: {
        flex: 1,
    },
    image: {
        flex: 1
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        color: 'white', 
        fontSize: 32,
        marginBottom: 10
    },
    inputBox: {
        marginTop: 15,
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 8,
        paddingRight: 8,
    },
    logInButton: {
        margin: 10,
        width: '80%',
        height: 40,
        backgroundColor: '#3636ff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    signUpContainer: {
        flexDirection: 'row',
    },
    question: {
        color: 'white',
    },
    pressableSignUp:{
        marginLeft: 5,
    },
    signUp: {
        color: '#0073ff'
    },
    errorMessage: {
        color: 'red',
        marginTop: 15,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 16
    },
    loader: {
        margin: 15
    }
});