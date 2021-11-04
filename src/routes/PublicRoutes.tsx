import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { PublicLayout } from 'layout';
import { SignIn } from 'pages';

import { AnimatedRoutes, RouteTransition } from './components';

export const PublicRoutes: FC = () => {
  return (
    <PublicLayout>
      <AnimatedRoutes exitBeforeEnter initial={false}>
        <RouteTransition exact path="/signin" slide={10}>
          <SignIn />
        </RouteTransition>

        <Redirect to="/signin" />
      </AnimatedRoutes>
    </PublicLayout>
  );
};
