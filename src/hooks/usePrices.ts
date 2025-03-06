import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { PricesResponse } from '../types/prices';

export function usePrices() {
    const [prices, setPrices] = useState<PricesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await api.get<PricesResponse>('/api/v1/prices');
                setPrices(response.data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch prices'));
                console.error('Error fetching prices:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();

        // Set up polling every 5 minutes
        const intervalId = setInterval(fetchPrices, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const refetch = async () => {
        setLoading(true);
        try {
            const response = await api.get<PricesResponse>('/api/v1/prices');
            setPrices(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch prices'));
        } finally {
            setLoading(false);
        }
    };

    return { prices, loading, error, refetch };
}