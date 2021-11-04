import { Layout, Menu } from 'antd';
import { FC, useEffect, useState } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

import { PATHS } from 'routes/enums';

import './styles.scss';

const { Sider } = Layout;

const SideBar: FC = () => {
  const location = useLocation();

  const [selectedKey, setSelectedKey] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const selectedPath = Object.values(PATHS).find((route) =>
      matchPath(location.pathname, route.path),
    );

    setSelectedKey(selectedPath?.key || 'dashboard');
  }, [location?.pathname]);

  return (
    <Sider
      id="side-bar"
      theme="light"
      width={300}
      collapsible
      collapsed={isCollapsed}
      onCollapse={(collapsed) => {
        setIsCollapsed(collapsed);
      }}
    >
      <div className="logo-container">
        <NavLink to="/dashboard">Trabalho 4 STI</NavLink>
      </div>

      <Menu mode="inline" selectedKeys={[selectedKey]}>
        {Object.values(PATHS).map((path) => (
          <Menu.Item key={path.key} icon={<path.Icon />}>
            <NavLink to={path.path}>{path.name}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export { SideBar };
