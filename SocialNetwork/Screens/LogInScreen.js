import { ScrollView, Text, StyleSheet, TextInput, Pressable, View, ImageBackground } from 'react-native';

export default function LogInScreen(){
    return (
      <View style={styles.wholePage}>
        <ImageBackground source={require('../assets/whatsappDanger.jpg')} resizeMode='cover' style={styles.image}>
            <View style={styles.content}>
                <Text style = {styles.welcomeText}> Welcome! </Text>

                <TextInput
                    style={styles.inputBox}
                    //value={email}
                    //onChangeText={onChangeEmail}
                    placeholder={'Email'}
                />

                <TextInput
                    style={styles.inputBox}
                    placeholder={'Password'}
                />

                <Pressable style={styles.logInButton}>
                    <Text style={styles.textButton}>Log In</Text>
                </Pressable>
                
                <View style={styles.signUpContainer}>
                    <Text style={styles.question}>Don't have an account?</Text>
                    <Pressable style={styles.pressableSignUp}>
                        <Text style={styles.signUp}>Sign Up</Text>
                    </Pressable>
                </View>
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
    }
});