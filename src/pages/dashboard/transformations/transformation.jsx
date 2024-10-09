
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { OrderListViewTransformation } from 'src/sections/ordertransformation/view';
import { StatsCardTransformation } from 'src/sections/statscard-transformation/view';



// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', width: '100%', height: 'auto', minHeight: '100vh' }}>
      <DashboardContent maxWidth="xl">
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StatsCardTransformation/>
      <OrderListViewTransformation/>
      </DashboardContent>

    </div>
  );
}
