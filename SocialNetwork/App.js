import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider } from './Components/Context';
import LogInScreen from './Screens/LogInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import PostsScreen from './Screens/postsScreen';
import FeedScreen from './Screens/FeedScreen';
import ProfileScreen from './Screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: '#0073ff',
        tabBarInactiveTintColor: '#cccccc',
      }}
    >
      <Tab.Screen 
        name="All Posts" 
        component={PostsScreen} 
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({color})=>(
            <Ionicons name="home" color={color} size={20} />
          )
        }}
      />

      <Tab.Screen 
        name="Feed" 
        component={FeedScreen} 
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({color})=>(
            <Ionicons name="people" color={color} size={20} />
          )
        }}
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({color})=>(
            <Ionicons name="person" color={color} size={20} />
          )
        }}
      />
      
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={styles.screenTitle}>
          <Stack.Screen name="Log In" component={LogInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={styles.noBackButton} />
          <Stack.Screen name="Main App" component={AppTabNavigator} options={styles.noHeader} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    headerTitleAlign: "center",
  },
  noHeader: {
    headerShown: false
  },
  noBackButton: {
    headerBackVisible: false
  }
});
