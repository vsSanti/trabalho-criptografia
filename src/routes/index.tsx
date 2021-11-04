import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import enUS from 'antd/es/locale/en_US';
import { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from 'hooks';
import { Loader } from 'components';
import { api } from 'services';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

const Routes: FC = () => {
  const { i18n } = useTranslation();
  const {
    user,
    getLoggedUser,
    refreshToken,
    credentials,
    loadingUser,
  } = useAuth();

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error?.response?.config?.url !== '/tokens/refresh' &&
          error?.response?.status === 401
        ) {
          return refreshToken();
        }

        return Promise.reject(error);
      },
    );

    const { access_token, refresh_token } = credentials;
    if (!access_token || !refresh_token) return;

    getLoggedUser();
  }, [credentials, getLoggedUser, refreshToken]);

  const routes = useMemo(() => {
    const { access_token, refresh_token } = credentials;

    if ((loadingUser || !user) && access_token && refresh_token) {
      return <Loader loading />;
    }

    return user ? <PrivateRoutes /> : <PublicRoutes />;
  }, [credentials, loadingUser, user]);

  return (
    <ConfigProvider locale={i18n.language === 'pt-BR' ? ptBR : enUS}>
      {routes}
    </ConfigProvider>
  );
};

export { Routes };
