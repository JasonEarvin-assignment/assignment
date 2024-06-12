import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';
import { useWishlist } from '../context/WishlistContext';

interface MovieCardProps {
  title: string;
  poster: string;
  year: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster, year }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some(movie => movie.title === title);

  const handlePress = () => {
    const movie = { title, poster, year };
    if (isInWishlist) {
      removeFromWishlist(title);
    } else {
      addToWishlist(movie);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: poster }} style={styles.poster} />
      <Text style={styles.year}>{year}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center', // Center align content horizontally
  },
  poster: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center', // Center align text
  },
  year: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    marginBottom: 10, // Add margin to separate from button
    textAlign: 'center', // Center align text
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#0000ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,
});

export default MovieCard;
