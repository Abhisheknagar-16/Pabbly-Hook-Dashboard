import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { HomeTableView } from 'src/sections/orderhome/view';

// ----------------------------------------------------------------------

const metadata = { title: `Order list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <HomeTableView/>
    </>
  );
}
