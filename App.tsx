import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import HomeScreen from './screen/HomeScreen';
import WishlistScreen from './screen/WishlistScreen';
import { WishlistProvider } from './context/WishlistContext';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <WishlistProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Home',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Wishlist')}
                  style={styles.headerButton}
                >
                  <Text style={styles.headerButtonText}>Wishlist</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WishlistProvider>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#033cff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
