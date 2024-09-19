import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OrderListView } from 'src/sections/order 5/view';
import { OrderListView0 } from 'src/sections/order 6/view';
import { OverviewCourseView } from 'src/sections/course4/view';





// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', width: '100%', minHeight: '100vh', height: 'auto' }}>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <OverviewCourseView />
      <OrderListView />
      <OrderListView0 />
    </div>
  );
}
