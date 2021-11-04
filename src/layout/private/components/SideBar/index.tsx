import { Layout, Menu } from 'antd';
import { FC, useEffect, useState } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LanguageSelector, Logo } from 'components';
import { PATHS } from 'routes/enums';

import './styles.scss';

const { Sider } = Layout;

const SideBar: FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

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
        <NavLink to="/dashboard">
          <Logo className="logo-img" onlyLetter={isCollapsed} />
        </NavLink>
      </div>

      <Menu mode="inline" selectedKeys={[selectedKey]}>
        {Object.values(PATHS).map((obj) => (
          <Menu.Item key={obj.key} icon={<obj.Icon />}>
            <NavLink to={obj.path}>{t(obj.name)}</NavLink>
          </Menu.Item>
        ))}
      </Menu>

      <LanguageSelector />
    </Sider>
  );
};

export { SideBar };
