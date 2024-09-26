import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { OrderListView } from 'src/sections/order 3/view';
// import { ProductListView } from 'src/sections/product/view';
import { OverviewCourseView } from 'src/sections/course2/view';


// import { OrderListView } from 'src/sections/order 2/view';
// ----------------------------------------------------------------------

const metadata = { title: `Page five | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', minHeight: '100vh', width: '100%', height: 'auto' }}>
      <DashboardContent maxWidth="xl">
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <OverviewCourseView />
      <OrderListView />
      </DashboardContent>
      {/* <ProductListView /> */}
    </div>
  );
}
