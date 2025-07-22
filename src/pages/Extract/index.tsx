import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { api } from '../../services/api';

interface ExtractRecord {
  _id: string;
  data: string;
  descricao: string;
  valor: number;
  banco: string;
  categoria?: string;
}

export default function Extract() {
  const [records, setRecords] = useState<ExtractRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  useEffect(() => {
    fetchExtract();
  }, []);

  const fetchExtract = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/api/v1/extract');
      setRecords(res.data);
    } catch (err: any) {
      setError('Erro ao buscar registros de extrato.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError('');
    setUploadSuccess('');
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file));
    try {
      await api.post('/api/v1/extract', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadSuccess('Upload realizado com sucesso!');
      setFiles(null);
      fetchExtract();
    } catch (err: any) {
      setUploadError('Erro ao fazer upload do extrato.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Extrato</h2>
        <form onSubmit={handleUpload} className="mb-6 flex flex-col md:flex-row items-center gap-4">
          <input type="file" multiple onChange={handleFileChange} className="border p-2 rounded" />
          <button type="submit" disabled={uploading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            {uploading ? 'Enviando...' : 'Enviar Extrato'}
          </button>
        </form>
        {uploadError && <p className="text-red-500 mb-2">{uploadError}</p>}
        {uploadSuccess && <p className="text-green-500 mb-2">{uploadSuccess}</p>}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Registros</h3>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : records.length === 0 ? (
            <p>Nenhum registro encontrado.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-slate-900 rounded shadow">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Data</th>
                    <th className="px-4 py-2">Descrição</th>
                    <th className="px-4 py-2">Valor</th>
                    <th className="px-4 py-2">Banco</th>
                    <th className="px-4 py-2">Categoria</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec) => (
                    <tr key={rec._id} className="border-t">
                      <td className="px-4 py-2">{rec.data?.slice(0, 10)}</td>
                      <td className="px-4 py-2">{rec.descricao}</td>
                      <td className={`px-4 py-2 font-bold ${rec.valor < 0 ? 'text-red-500' : 'text-green-600'}`}>{rec.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                      <td className="px-4 py-2">{rec.banco}</td>
                      <td className="px-4 py-2">{rec.categoria || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 