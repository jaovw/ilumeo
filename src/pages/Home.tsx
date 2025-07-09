import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import { useColaborador } from '../context/ColaboradorContext';

const Home: React.FC = () => {
  const [matricula, setMatricula] = useState('');
  const navigate = useNavigate();
  const { setColaborador } = useColaborador();

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const buscarColaborador = async () => {
    if (!matricula.trim()) {
      alert('Digite a matrícula do colaborador.');
      return;
    }

    try {
      const response = await api.get(`/colaborador/${matricula}`);
      const colaborador = response.data;

      if (!isMounted.current) return; // Evita memory leak

      if (colaborador?.id) {
        setColaborador(colaborador);
        navigate(`/${colaborador.matricula}`);
      } else {
        alert('⚠️ Colaborador não encontrado.');
      }
    } catch (error) {
      if (!isMounted.current) return; // Evita memory leak
      alert('❌ Erro ao buscar colaborador.');
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#0d1117]">
      <div className="w-[365px] h-[300px] bg-transparent rounded-md p-6 flex flex-col justify-center">
        <p className="text-xl font-medium text-white mb-6">
          Ponto <strong className="font-semibold">Ilumeo</strong>
        </p>

        <div className="flex flex-col w-full mb-6">
          <label htmlFor="matricula" className="text-base text-gray-400 mb-2">
            Matrícula do colaborador
          </label>
          <input
            id="matricula"
            type="number"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className="bg-[#1c1f26] text-white text-lg p-4 placeholder-white focus:ring-0 focus:outline-none"
          />
        </div>

        <button
          onClick={buscarColaborador}
          className="bg-[#ff9100] text-white font-semibold px-6 py-4 rounded-md hover:bg-orange-600 transition-colors"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Home;
