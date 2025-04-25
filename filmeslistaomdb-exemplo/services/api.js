import axios from 'axios';

const API_KEY = 'e66606b6';
const BASE_URL = 'https://www.omdbapi.com/';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const searchMovies = async (searchTerm = 'marvel') => {
  try {
    const response = await api.get('', {
      params: {
        s: searchTerm,
        type: 'movie',
      },
    });
    if (response.data.Response === 'True') {
      return response.data.Search;
    }
    throw new Error(response.data.Error || 'Movies not found');
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get('', {
      params: {
        i: movieId,
        plot: 'full',
      },
    });
    if (response.data.Response === 'True') {
      return response.data;
    }
    throw new Error(response.data.Error || 'Movie details not found');
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
