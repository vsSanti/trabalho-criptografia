import { Layout } from 'antd';
import { FC } from 'react';

import { Header, SideBar } from './components';

import './styles.scss';

const { Content, Footer } = Layout;

export const PrivateLayout: FC = ({ children }) => {
  return (
    <Layout id="private-layout">
      <SideBar />
      <Layout id="content-layout">
        <Header />
        <Content className="content">{children}</Content>
        <Footer>Criptografia © {new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
};
