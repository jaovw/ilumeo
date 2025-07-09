import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColaborador } from '../context/ColaboradorContext';
import api from '../service/api';

interface Ponto {
  data: string;
  hora_entrada: string;
  hora_saida: string;
  horas_trabalhadas: string;
}

interface ColaboradorResumo {
  nome: string;
  matricula: number;
  horas_trabalhadas_hoje: string;
  turno_aberto: boolean;
  lista_ponto: Ponto[];
}

const Detail: React.FC = () => {
  const { colaborador } = useColaborador();
  const [resumo, setResumo] = useState<ColaboradorResumo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {

    if (!colaborador) {
      navigate('/');
      return;
    }

    const controller = new AbortController();

    const buscarResumo = async () => {
      try {
        const res = await api.get(`/colaborador/${colaborador?.matricula}/resumo`, {
          signal: controller.signal,
        });
        setResumo(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          console.error('Erro ao buscar resumo', err);
          alert('Erro ao buscar resumo');
        }
      }
    };

    if (colaborador?.matricula) {
      buscarResumo();
    }

    // 🧹 Limpeza
    return () => controller.abort();
  }, [colaborador, navigate]);

  if (!resumo) return <div className="text-white">Carregando...</div>;

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#0d1117] text-white px-4">
      <div className="w-[365px] min-h-[300px] flex flex-col">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-300">Relógio de ponto</p>
            <h1 className="text-3xl font-bold">{resumo.horas_trabalhadas_hoje.replace(':', 'h ')}m</h1>
            <p className="text-sm text-gray-400">Horas de hoje</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold">#{resumo.matricula}</p>
            <p className="text-xs text-gray-400">{resumo.nome}</p>
          </div>
        </div>

        <button 
          className="bg-[#ff9100] text-white font-semibold py-4 rounded-md w-full mb-6"
          onClick={() => navigate('/')}
        >
          Voltar para o início
        </button>

        <p className="text-sm text-gray-300 mb-2">Dias anteriores</p>
        <div className="flex flex-col gap-2">
          {resumo.lista_ponto.map((ponto, index) => (
            <div key={index} className="bg-[#1c1f26] px-4 py-3 rounded-md flex justify-between">
              <span>{new Date(ponto.data).toLocaleDateString('pt-BR')}</span>
              <span className="font-bold">{ponto.horas_trabalhadas.replace(':', 'h ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
