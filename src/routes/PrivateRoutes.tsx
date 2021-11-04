import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { PrivateLayout } from 'layout';

import { AnimatedRoutes, RouteTransition } from './components';
import { PATHS } from './enums';

export const PrivateRoutes: FC = () => {
  return (
    <PrivateLayout>
      <AnimatedRoutes exitBeforeEnter initial={false}>
        {Object.values(PATHS).map((obj) => (
          <RouteTransition key={obj.key} exact path={obj.path} slide={10}>
            <obj.Component />
          </RouteTransition>
        ))}

        <Redirect to="/dashboard" />
      </AnimatedRoutes>
    </PrivateLayout>
  );
};
