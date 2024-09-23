import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { JwtSignInView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div style={{ backgroundColor: '#F5fffa', width: '100%', height: 'auto' }}>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtSignInView />
   </div>
  );
}
