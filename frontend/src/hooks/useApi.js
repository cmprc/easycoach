import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:8080';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while fetching data';
      setError(errorMessage);
      console.error('API Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPlayers = useCallback(async (page = 1, perPage = 10, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
    });

    if (search) {
      params.append('search', search);
    }

    return await fetchData(`/api/players?${params}`);
  }, [fetchData]);

  const getPlayer = useCallback(async (id) => {
    return await fetchData(`/api/players/${id}`);
  }, [fetchData]);

  const getPlayerSessions = useCallback(async (id, page = 1, perPage = 10) => {
    const params = new URLSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
    });

    return await fetchData(`/api/players/${id}/sessions?${params}`);
  }, [fetchData]);

  const healthCheck = useCallback(async () => {
    return await fetchData('/api/health');
  }, [fetchData]);

  return {
    loading,
    error,
    fetchData,
    getPlayers,
    getPlayer,
    getPlayerSessions,
    healthCheck,
  };
}; 