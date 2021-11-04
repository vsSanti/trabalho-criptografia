import { AxiosResponse } from 'axios';
import React, { createContext, useCallback, useState, useContext } from 'react';

import { Dietitian } from '@types';
import { api, useFetch } from 'services';

const ACCESS_TOKEN = '@NUTRICIONISTA.APP:access_token';
const REFRESH_TOKEN = '@NUTRICIONISTA.APP:refresh_token';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface CredentialsProps {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
}

export interface AuthContextData {
  credentials: CredentialsProps;
  user?: Dietitian;
  loadingSignIn: boolean;
  loadingUser: boolean;
  errorSignIn?: string | boolean;
  signIn: { (credentials: SignInCredentials): Promise<void> };
  signOut: VoidFunction;
  getLoggedUser: { (): Promise<void> };
  refreshToken: { (): Promise<AxiosResponse<CredentialsProps>> };
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<Dietitian>();
  const [credentials, setCredentials] = useState<CredentialsProps>(
    (): CredentialsProps => {
      const access_token = localStorage.getItem(ACCESS_TOKEN) || undefined;
      const refresh_token = localStorage.getItem(REFRESH_TOKEN) || undefined;

      api.defaults.headers.Authorization = access_token;

      return { access_token, refresh_token };
    },
  );

  const {
    post: postSignIn,
    error: errorSignIn,
    loading: loadingSignIn,
  } = useFetch<CredentialsProps>({
    baseURL: 'auth',
  });
  const { get: getUser, loading: loadingUser } = useFetch<Dietitian>({
    baseURL: 'auth',
  });

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      try {
        const response = await postSignIn({
          url: '/tokens/generate/dietitian',
          payload: {
            email,
            password,
          },
        });

        const { access_token, refresh_token, token_type } = response;

        localStorage.setItem(ACCESS_TOKEN, access_token || '');
        localStorage.setItem(REFRESH_TOKEN, refresh_token || '');

        api.defaults.headers.Authorization = `${token_type} ${access_token}`;

        setCredentials({ access_token, refresh_token });
      } catch (error) {
        // TODO
      }
    },
    [postSignIn],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    setUser(undefined);
    setCredentials({});
  }, []);

  const getLoggedUser = useCallback(async (): Promise<void> => {
    try {
      const response = await getUser({ url: '/user/me' });

      setUser(response.data);
    } catch (err) {
      signOut();
    }
  }, [getUser, signOut]);

  const refreshToken = useCallback(async (): Promise<
    AxiosResponse<CredentialsProps>
  > => {
    const token = localStorage.getItem(REFRESH_TOKEN);

    const response = await api.post('/tokens/refresh', {
      refresh_token: token,
    });

    const { access_token, refresh_token } = response.data;

    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);

    api.defaults.headers.Authorization = access_token;

    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      access_token,
      refresh_token,
    }));
    return response;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        credentials,
        user,
        loadingSignIn,
        loadingUser,
        errorSignIn,
        signIn,
        signOut,
        getLoggedUser,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
