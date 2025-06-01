import React from 'react';
import { useLoading } from '../hooks/useLoading';
import { LoadingSpinner } from './LoadingSpinner';

export function GlobalLoading() {
  const { loading } = useLoading();
  return loading ? <LoadingSpinner /> : null;
} 