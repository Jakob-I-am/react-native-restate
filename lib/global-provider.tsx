import { createContext, ReactNode, useContext } from 'react';
import { useAppwrite } from './useAppwrite';
import { getCurrentUser } from './appwrite';

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const GLobalContext = createContext<GlobalContextType | undefined>(undefined);

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLoggedIn = !!user;

  return (
    <GLobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GLobalContext.Provider>
  );
}

export function useGlobalContext(): GlobalContextType {
  const context = useContext(GLobalContext);

  if (!context)
    throw new Error('useGlobalContext must be used within a GlobalProvider');

  return context;
}
