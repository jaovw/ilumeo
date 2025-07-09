import { createContext, useContext, useState, type ReactNode } from 'react';

interface Colaborador {
  id: number;
  nome: string;
  matricula: number;
}

interface ColaboradorContextType {
  colaborador: Colaborador | null;
  setColaborador: (colab: Colaborador) => void;
}

const ColaboradorContext = createContext<ColaboradorContextType | undefined>(undefined);

export const ColaboradorProvider = ({ children }: { children: ReactNode }) => {
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);

  return (
    <ColaboradorContext.Provider value={{ colaborador, setColaborador }}>
      {children}
    </ColaboradorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useColaborador = () => {
  const context = useContext(ColaboradorContext);
  if (!context) throw new Error('useColaborador must be used within a ColaboradorProvider');
  return context;
};
