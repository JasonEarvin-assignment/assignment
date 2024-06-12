import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useWishlist } from '../context/WishlistContext';
import MovieCard from '../card/MovieCard';

const WishlistScreen: React.FC = () => {
  const { wishlist } = useWishlist();

  return (
    <ScrollView style={styles.container}>
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty.</Text>
        </View>
      ) : (
        wishlist.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            poster={movie.poster}
            year={movie.year}
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default WishlistScreen;
