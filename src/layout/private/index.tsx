import { Layout } from 'antd';
import { FC } from 'react';

import { Header } from './components';

import './styles.scss';

const { Content, Footer } = Layout;

export const PrivateLayout: FC = ({ children }) => {
  return (
    <Layout id="private-layout">
      {/* <SideBar /> */}
      <Layout id="content-layout">
        <Header />
        <Content className="content">{children}</Content>
        <Footer>
          Segurança em Teconolgia da Informação © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
