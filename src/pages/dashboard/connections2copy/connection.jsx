
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { StatsCard } from 'src/sections/overview/statscard-connection/view';
import { OverviewEcommerceView } from 'src/sections/overview/e-commerce copy/view';
// import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';

// import { BlankView } from 'src/sections/blank/view';

// ------------x----------------------------------------------------------

const metadata = { title: `Page Setup Connection Form | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', width: '100%', height: 'auto' }}>
      <DashboardContent maxWidth="xl">
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      {/* <BlankView title="Page two" /> */}
      <StatsCard />
      <OverviewEcommerceView />
      </DashboardContent>
    </div>
  );
}
