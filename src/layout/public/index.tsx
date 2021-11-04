import { Col, Layout, Row } from 'antd';
import { FC } from 'react';

import { Logo } from 'components';

import './styles.scss';

export const PublicLayout: FC = ({ children }) => {
  return (
    <Layout id="public-layout">
      <Row id="main-row">
        <Col span={8} xs={24} md={14} lg={8} className="content-col">
          <Logo className="logo-img" />

          <div className="content">{children}</div>
        </Col>
      </Row>
    </Layout>
  );
};
