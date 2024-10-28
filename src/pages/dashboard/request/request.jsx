import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { RequestTableView } from 'src/sections/request-table/view';
import { StatsCardRequest } from 'src/sections/statscard-request/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', width: '100%', minHeight: '100vh', height: 'auto' }}>
      <DashboardContent maxWidth="xl">
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <StatsCardRequest/>
      <RequestTableView/>
      </DashboardContent>
    </div>
  );
}
