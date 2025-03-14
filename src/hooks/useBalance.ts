import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface BalanceData {
    saldo: string;
}

interface BalanceResponse {
    status: string;
    data: BalanceData;
}

export function useBalance() {
    const [balance, setBalance] = useState<BalanceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await api.get<BalanceResponse>('/api/v1/balance');
                setBalance(response.data.data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch balance'));
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    return { balance, loading, error };
}