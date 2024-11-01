
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

// import { StatsCard } from 'src/sections/overview/statscard-connection/view';
import { UpdateConnection } from 'src/sections/overview/update-connection/view';
import { StatsCardUpdateConnection } from 'src/sections/statscard-update-connection/view';

// import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';

// import { BlankView } from 'src/sections/blank/view';

// ------------x----------------------------------------------------------

const metadata = { title: `Page Update-connection | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', width: '100%', height: 'auto' }}>
      <DashboardContent maxWidth="xl">
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <StatsCardUpdateConnection/>
      <UpdateConnection/>
      </DashboardContent>
    </div>
  );
}
