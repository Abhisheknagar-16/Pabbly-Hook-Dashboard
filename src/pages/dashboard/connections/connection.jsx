
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { StatsCard } from 'src/sections/overview/statscard-connection/view';
import { SetupConnectionForm } from 'src/sections/overview/setup-connection-form/view';
// import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';

// import { BlankView } from 'src/sections/blank/view';

// ------------x----------------------------------------------------------

const metadata = { title: `Pabbly Hook | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', width: '100%', minHeight: '100vh', height: 'auto' }}>
    <DashboardContent maxWidth="xl" >
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      {/* <BlankView title="Page two" /> */}
      <StatsCard />
      <SetupConnectionForm/>
      </DashboardContent>
      </div>
    
  );
}
