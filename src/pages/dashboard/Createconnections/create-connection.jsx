
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { CreateConnection } from 'src/sections/overview/create-connection/view';
import { StatsCardCreatedConnection } from 'src/sections/statscard-create-connection/view';

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
      <StatsCardCreatedConnection/>
      <CreateConnection/>
      </DashboardContent>
    </div>
  );
}
