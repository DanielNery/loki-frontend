import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface PixTransaction {
    endToEndId: string;
    valor: string;
    horario: {
        solicitacao?: string | any;
        liquidacao?: string | any;
    } | any;
    chave?: string;
    txid?: string;
    status?: string;
    infoPagador?: string;
    favorecido?: {
        chave?: string;
        identificacao?: {
            nome?: string;
            cpf?: string;
            cnpj?: string;
        };
    };
    type?: string;
}

interface PixResponse {
    status: string;
    data: {
        parametros: {
            inicio: string;
            fim: string;
            paginacao: {
                paginaAtual: number;
                itensPorPagina: number;
                quantidadeDePaginas: number;
                quantidadeTotalDeItens: number;
            };
        };
        pix: PixTransaction[];
    };
}

export function usePix(page: number, itemsPerPage: number, startDate: string, endDate: string) {
    const [pix, setPix] = useState<PixTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPix = async () => {
            try {
                const response = await api.get('/api/v1/pix', {
                    params: {
                        page,
                        itemsPerPage,
                        startDate,
                        endDate,
                    },
                });
                setPix(response.data.data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch PIX transactions'));
            } finally {
                setLoading(false);
            }
        };

        fetchPix();
    }, [page, itemsPerPage, startDate, endDate]);

    return { pix, loading, error };
}