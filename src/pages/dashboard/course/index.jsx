import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { StatsCard } from 'src/sections/overview/statscard-connection/view';



// ----------------------------------------------------------------------

const metadata = { title: `Course | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StatsCard />
    </>
  );
}
