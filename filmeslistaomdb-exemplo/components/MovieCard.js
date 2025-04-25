import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MovieCard = ({ movie, onPress }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ 
            uri: movie.Poster !== 'N/A' 
              ? movie.Poster 
              : 'https://via.placeholder.com/300x450'
          }}
          style={styles.poster}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.info} onPress={onPress}>
        <Text style={styles.title} numberOfLines={2}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  year: {
    fontSize: 14,
    color: '#666',
  },
});

export default MovieCard;

