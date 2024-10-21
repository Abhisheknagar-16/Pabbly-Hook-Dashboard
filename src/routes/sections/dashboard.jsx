import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/connections/connection'));
const PageCreateConnection = lazy(() => import('src/pages/dashboard/Createconnections/create-connection'));
// const PageTwo = lazy(() => import('src/pages/dashboard/issues/issue'));
const PageTransformation = lazy(() => import('src/pages/dashboard/transformations/transformation'));
const PageRequest = lazy(() => import('src/pages/dashboard/request/request'));
const PageEvent = lazy(() => import('src/pages/dashboard/events/events'));
const PageTimezone = lazy(() => import('src/pages/dashboard/timezone/time-zone'));
const PageUpdateConnection = lazy(() => import('src/pages/dashboard/Updateconnection/update-connection'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      // { path: 'two', element: <PageTwo /> },
      { path: 'transformation', element: <PageTransformation /> },
      { path: 'request', element: <PageRequest /> },
      { path: 'event', element: <PageEvent /> },
      { path: 'CreateConnection', element: <PageCreateConnection /> },
      { path: 'settings/timezone', element: <PageTimezone /> },
      { path: 'updateconnection', element: <PageUpdateConnection /> },
      {
        path: 'settings',
        children: [
          { element: <PageTimezone />, index: true },
          // { path: 'five', element: <PageFive /> },
          // { path: 'six', element: <PageSix /> },
        ],
      },
    ],
  },
];