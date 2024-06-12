import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MovieCard from '../card/MovieCard';

interface Movie {
  title: string;
  year: string;
  poster: string;
}

const HomeScreen: React.FC = ({ navigation }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    try {
      const response = await fetch('https://www.omdbapi.com/?s=iron&apikey=e28ed313');
      const data = await response.json();
      const moviesData: Movie[] = data.Search.map((item: any) => ({
        title: item.Title,
        year: item.Year,
        poster: item.Poster,
      }));
      setMovies(moviesData);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          poster={movie.poster}
          year={movie.year}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;