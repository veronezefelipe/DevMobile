import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getMovieDetails } from '../../services/api';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ 
          uri: movie?.Poster !== 'N/A' 
            ? movie?.Poster 
            : 'https://via.placeholder.com/300x450'
        }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie?.Title}</Text>
        <Text style={styles.genre}>{movie?.Genre}</Text>
        <Text style={styles.director}>Director: {movie?.Director}</Text>
        <Text style={styles.actors}>Cast: {movie?.Actors}</Text>
        <Text style={styles.sectionTitle}>Plot</Text>
        <Text style={styles.plot}>{movie?.Plot}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 450,
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  genre: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  director: {
    fontSize: 16,
    marginBottom: 4,
  },
  actors: {
    fontSize: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  plot: {
    fontSize: 16,
    lineHeight: 24,
  },
});