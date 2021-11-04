import { Layout } from 'antd';
import { FC } from 'react';

import './styles.scss';

const { Header: AntdHeader } = Layout;

export const Header: FC = () => {
  return (
    <AntdHeader id="main-header">
      <div id="user-name">Trabalho de criptografia</div>
    </AntdHeader>
  );
};
