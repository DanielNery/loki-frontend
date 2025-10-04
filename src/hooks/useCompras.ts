import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

// Tipos para as interfaces
export interface ItemCompra {
  id: string;
  nome_nota: string;
  quantidade: number;
  unidade: string;
  preco_unitario: number;
  preco_total: number;
  nome_pesquisa: string;
  data_carregamento: string;
  carga_id: number;
}

export interface Carga {
  id: number;
  data_carregamento: string;
  total_itens: number;
  arquivo_original: string;
  itens: ItemCompra[];
}

export interface ItemMaisCaro {
  nome_pesquisa: string;
  preco_total: number;
  preco_unitario: number;
  quantidade: number;
  unidade: string;
  data_carregamento: string;
  nome_nota: string;
}

export interface ItemMaisFrequente {
  nome_pesquisa: string;
  vezes_comprado: number;
  quantidade_total: number;
  unidade: string;
  preco_unitario_medio: number;
  preco_total_gasto: number;
}

export interface Estatisticas {
  itens_mais_caros: ItemMaisCaro[];
  itens_mais_frequentes: ItemMaisFrequente[];
  compras_por_data: ItemCompra[];
  total_cargas: number;
  total_itens: number;
  valor_total_gasto: number;
}

export interface Resumo {
  total_cargas: number;
  total_itens: number;
  valor_total_gasto: number;
  item_mais_caro: ItemMaisCaro;
  item_mais_frequente: ItemMaisFrequente;
  total_datas_diferentes: number;
}

// Hook para upload de CSV
export function useUploadCSV() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<Carga | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadCSV = async (file: File) => {
    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('arquivo', file);

      const response = await api.post('/api/v1/compras/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Erro ao fazer upload do arquivo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return { uploadCSV, uploading, result, error };
}

// Hook para estatísticas
export function useEstatisticas() {
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEstatisticas = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/api/v1/compras/estatisticas');
      setEstatisticas(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Erro ao carregar estatísticas';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstatisticas();
  }, []);

  return { estatisticas, loading, error, refetch: fetchEstatisticas };
}

// Hook para cargas
export function useCargas() {
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCargas = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/api/v1/compras/cargas');
      setCargas(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Erro ao carregar cargas';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCargas();
  }, []);

  return { cargas, loading, error, refetch: fetchCargas };
}

// Hook para itens mais caros
export function useItensMaisCaros(limite: number = 10) {
  const [itens, setItens] = useState<ItemMaisCaro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItens = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/v1/compras/itens-mais-caros?limite=${limite}`);
      setItens(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Erro ao carregar itens mais caros';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [limite]);

  useEffect(() => {
    fetchItens();
  }, [fetchItens]);

  return { itens, loading, error, refetch: fetchItens };
}

// Hook para itens mais frequentes
export function useItensMaisFrequentes(limite: number = 10) {
  const [itens, setItens] = useState<ItemMaisFrequente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItens = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/v1/compras/itens-mais-frequentes?limite=${limite}`);
      setItens(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Erro ao carregar itens mais frequentes';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [limite]);

  useEffect(() => {
    fetchItens();
  }, [fetchItens]);

  return { itens, loading, error, refetch: fetchItens };
}

// Hook para compras por data
export function useComprasPorData() {
  const [compras, setCompras] = useState<ItemCompra[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompras = async (dataInicio?: string, dataFim?: string, limite: number = 100) => {
    setLoading(true);
    setError(null);

    try {
      let url = `/api/v1/compras/compras-por-data?limite=${limite}`;
      if (dataInicio) url += `&data_inicio=${dataInicio}`;
      if (dataFim) url += `&data_fim=${dataFim}`;

      const response = await api.get(url);
      setCompras(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Erro ao carregar compras';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { compras, loading, error, fetchCompras };
}

// Hook para resumo
export function useResumo() {
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResumo = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/api/v1/compras/resumo');
      setResumo(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Erro ao carregar resumo';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumo();
  }, []);

  return { resumo, loading, error, refetch: fetchResumo };
}
