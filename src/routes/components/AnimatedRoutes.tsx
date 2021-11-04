import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Switch, useLocation } from 'react-router-dom';

type RoutesProps = {
  exitBeforeEnter?: boolean;
  initial?: boolean;
};

export const AnimatedRoutes: FC<RoutesProps> = ({
  children,
  exitBeforeEnter = true,
  initial = false,
}) => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
      <Switch location={location} key={location.pathname}>
        {children}
      </Switch>
    </AnimatePresence>
  );
};
