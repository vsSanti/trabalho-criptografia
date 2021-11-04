import { FC } from 'react';

import './styles.scss';

interface LoaderProps {
  loading?: boolean;
}

export const Loader: FC<LoaderProps> = ({ loading = false }) => {
  return (
    <>
      {loading && (
        <>
          <div className="dual-ring-loader-container" />
          <div className="dual-ring-loader" />
        </>
      )}
    </>
  );
};
