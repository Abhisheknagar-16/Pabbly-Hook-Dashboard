import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { OrderListViewEvent } from 'src/sections/orderevent/view';
import { StatsCardEvent } from 'src/sections/statscard-event/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page five | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', minHeight: '100vh', width: '100%', height: 'auto' }}>
      <DashboardContent maxWidth="xl">
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <StatsCardEvent/>
      <OrderListViewEvent/>
      </DashboardContent>
    </div>
  );
}
