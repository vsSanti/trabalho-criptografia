import { CalendarOutlined, DashboardOutlined } from '@ant-design/icons';

import { Dashboard, Schedule } from 'pages';

const PATHS = {
  DASHBOARD: {
    path: '/dashboard',
    key: 'dashboard',
    name: 'pages.dashboard.title',
    Component: Dashboard,
    Icon: DashboardOutlined,
  },
  SCHEDULE: {
    path: '/schedule',
    key: 'page-3',
    name: 'pages.schedule.title',
    Component: Schedule,
    Icon: CalendarOutlined,
  },
};

export { PATHS };
