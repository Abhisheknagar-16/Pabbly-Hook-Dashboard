import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/connections/connection'));
const PageSix = lazy(() => import('src/pages/dashboard/connections2copy/connection'));
// const PageTwo = lazy(() => import('src/pages/dashboard/issues/issue'));
const PageThree = lazy(() => import('src/pages/dashboard/transformations/transformation'));
const PageFour = lazy(() => import('src/pages/dashboard/request/request'));
const PageFive = lazy(() => import('src/pages/dashboard/events/events'));
const PageSeven = lazy(() => import('src/pages/dashboard/timezone/time-zone'));

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
      { path: 'three', element: <PageThree /> },
      { path: 'four', element: <PageFour /> },
      { path: 'five', element: <PageFive /> },
      { path: 'six', element: <PageSix /> },
      { path: 'seven', element: <PageSeven /> },
      // {
      //   path: 'group',
      //   children: [
      //     { element: <PageFour />, index: true },
      //     { path: 'five', element: <PageFive /> },
      //     { path: 'six', element: <PageSix /> },
      //   ],
      // },
    ],
  },
];