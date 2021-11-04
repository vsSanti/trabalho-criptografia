import { FC } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { MountTransition } from './MountTransition';

type Props = {
  slide?: number;
  slideUp?: number;
};

export const RouteTransition: FC<Props & RouteProps> = ({
  children,
  exact = false,
  path,
  slide = 0,
  slideUp = 0,
  ...rest
}) => (
  <Route exact={exact} path={path} {...rest}>
    <MountTransition slide={slide} slideUp={slideUp}>
      {children}
    </MountTransition>
  </Route>
);
