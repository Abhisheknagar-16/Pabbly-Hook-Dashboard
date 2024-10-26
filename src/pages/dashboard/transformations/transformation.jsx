
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { TransformationTableView } from 'src/sections/table-transformation/view';
// import { OrderListViewTransformation } from 'src/sections/ordertransformation/view';
import { StatsCardTransformation } from 'src/sections/statscard-transformation/view';



// ----------------------------------------------------------------------

const metadata = { title: `Page transformation | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', width: '100%', height: 'auto', minHeight: '100vh' }}>
      <DashboardContent maxWidth="xl">
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StatsCardTransformation/>
      {/* <OrderListViewTransformation/> */}
      <TransformationTableView/>
      </DashboardContent>

    </div>
  );
}
