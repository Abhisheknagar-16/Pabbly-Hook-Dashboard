import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { OrderListView } from 'src/sections/order 4/view';
import { OverviewCourseView } from 'src/sections/course3/view';



// import { BlankView } from 'src/sections/blank/view';



// ----------------------------------------------------------------------

const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', width: '100%', height: 'auto', minHeight: '100vh' }}>
      <DashboardContent maxWidth="xl">
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <OverviewCourseView />
      <OrderListView />
      </DashboardContent>

    </div>
  );
}

