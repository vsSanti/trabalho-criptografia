import { Typography } from 'antd';
import { FC } from 'react';

import './styles.scss';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const { Title } = Typography;

export const PageTitle: FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="page-title-component">
      <Title className="title">{title}</Title>
      {subtitle && (
        <Title className="subtitle" level={5} type="secondary">
          {subtitle}
        </Title>
      )}
    </div>
  );
};
