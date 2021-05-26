import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

import auth from '../config/authConfig';
import api from '../services/api';
import Storage from '../utils/myStorage';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  checkStorageExpired(): Promise<boolean>;
  updateUser(user: User): Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {

      const token = await Storage.getItem('@Appmobile:token');
      const user = await Storage.getItem('@Appmobile:user');

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        setData({ token, user: JSON.parse(user) });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const sessionResponse = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = sessionResponse.data;

    await Storage.setItem('@Appmobile:token', token, auth.expiresIn);
    await Storage.setItem(
      '@Appmobile:user',
      JSON.stringify(user),
      auth.expiresIn,
    );

    api.defaults.headers.authorization = `Bearer ${token}`;
    api.request.user = user;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {

    await Storage.removeItem('@Appmobile:token');
    await Storage.removeItem('@Appmobile:user');

    setData({} as AuthState);
  }, []);

  const checkStorageExpired = useCallback(async () => {
    const token = await Storage.getItem('@Appmobile:token');
    const user = await Storage.getItem('@Appmobile:user');

    if (!token || !user) {
      return true;
    }
    return false;
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await Storage.setItem(
        '@Appmobile:user',
        JSON.stringify(user),
        auth.expiresIn,
      );

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        checkStorageExpired,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
