
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OrderListView } from 'src/sections/order 2/view';
import { OverviewCourseView } from 'src/sections/course1/view';



// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F3F7FA', width: '100%', height: 'auto', minHeight: '100vh' }}>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewCourseView />
      <OrderListView />

    </div>
  );
}
