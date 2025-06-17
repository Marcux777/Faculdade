import { useState, useCallback } from 'react';

export const useApi = (service) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.listar();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [service]);

  const createItem = useCallback(async (item) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.criar(item);
      await fetchData();
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Erro ao criar item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [service, fetchData]);

  const updateItem = useCallback(async (id, item) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.atualizar(id, item);
      await fetchData();
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Erro ao atualizar item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [service, fetchData]);

  const deleteItem = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await service.excluir(id);
      await fetchData();
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Erro ao excluir item';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [service, fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem
  };
};

export default useApi;
