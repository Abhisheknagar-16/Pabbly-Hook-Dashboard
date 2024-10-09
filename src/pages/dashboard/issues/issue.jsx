import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { OrderListViewIssue } from 'src/sections/orderissue/view';
import { StatsCardissue } from 'src/sections/statscard-issue/view';



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
      <StatsCardissue/>
      <OrderListViewIssue/>
      </DashboardContent>

    </div>
  );
}

