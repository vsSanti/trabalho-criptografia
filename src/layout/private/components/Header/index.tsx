import { Button, Layout } from 'antd';
import { FC } from 'react';

import { useAuth } from 'hooks';

import './styles.scss';
import { Translator } from 'components';

const { Header: AntdHeader } = Layout;

export const Header: FC = () => {
  const { user, signOut } = useAuth();

  return (
    <AntdHeader id="main-header">
      <div id="user-name">
        <Translator path="global.hello" />, {user?.name}
      </div>
      <Button onClick={signOut} type="link">
        <Translator path="global.signout" />
      </Button>
    </AntdHeader>
  );
};
