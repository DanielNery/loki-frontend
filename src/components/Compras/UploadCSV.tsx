import React, { useRef, useState } from 'react';
import { useUploadCSV } from '../../hooks/useCompras';
import { HiCloudUpload, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

export default function UploadCSV() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadCSV, uploading, result, error } = useUploadCSV();
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validar se é um arquivo CSV
    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Por favor, selecione um arquivo CSV válido.');
      return;
    }

    try {
      await uploadCSV(file);
    } catch (err) {
      console.error('Erro no upload:', err);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Upload de Arquivo CSV
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Faça upload de um arquivo CSV com suas compras para análise e estatísticas.
        </p>
      </div>

      {/* Área de Upload */}
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer
          ${dragActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={uploading}
        />

        <div className="space-y-4">
          {uploading ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <p className="text-slate-600 dark:text-slate-400">Processando arquivo...</p>
            </div>
          ) : (
            <>
              <HiCloudUpload className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
              <div>
                <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
                  Clique para selecionar ou arraste um arquivo CSV
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Apenas arquivos .csv são aceitos
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Resultado do Upload */}
      {result && (
        <div className="mt-6 glass-strong rounded-2xl p-6 animate-slide-up">
          <div className="flex items-start space-x-3">
            <HiCheckCircle className="h-6 w-6 text-success-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-success-600 dark:text-success-400 mb-2">
                Upload realizado com sucesso!
              </h3>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <p><strong>Arquivo:</strong> {result.arquivo_original}</p>
                <p><strong>Itens carregados:</strong> {result.total_itens}</p>
                <p><strong>Data:</strong> {new Date(result.data_carregamento).toLocaleString('pt-BR')}</p>
              </div>
              
              {/* Mostrar alguns itens como exemplo */}
              {result.itens && result.itens.length > 0 && (
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    Primeiros itens carregados:
                  </h4>
                  <div className="space-y-2">
                    {result.itens.slice(0, 3).map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                        <div className="flex-1">
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {item.nome_pesquisa}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                          <span>
                            {item.quantidade ? `${item.quantidade} ${item.unidade || ''}` : '1 un'}
                          </span>
                          <span>•</span>
                          <span className="font-medium text-success-600 dark:text-success-400">
                            R$ {(item.preco_total || item.preco || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Erro no Upload */}
      {error && (
        <div className="mt-6 glass-strong rounded-2xl p-6 animate-slide-up border-l-4 border-accent-500">
          <div className="flex items-start space-x-3">
            <HiExclamationCircle className="h-6 w-6 text-accent-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-accent-600 dark:text-accent-400 mb-2">
                Erro no upload
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instruções */}
      <div className="mt-8 glass-strong rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Formato do Arquivo CSV
        </h3>
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p>O arquivo CSV deve conter as seguintes colunas:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Nome Nota:</strong> Nome do produto na nota</li>
            <li><strong>Quantidade:</strong> Quantidade comprada (formato numérico)</li>
            <li><strong>Unidade:</strong> Unidade de medida (UN, KG, PC, etc.)</li>
            <li><strong>Preço Unitário (R$):</strong> Preço por unidade</li>
            <li><strong>Preço Total (R$):</strong> Preço total do item</li>
            <li><strong>Nome Pesquisa:</strong> Nome para busca e análise</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
            Exemplo: Nome Nota,Quantidade,Unidade,Preço Unitário (R$),Preço Total (R$),Nome Pesquisa
          </p>
        </div>
      </div>
    </div>
  );
}
