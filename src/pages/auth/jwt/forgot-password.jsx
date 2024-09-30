import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { JwtForgotpassword } from 'src/sections/auth/jwt/jwt-forgot-password';

// ----------------------------------------------------------------------

const metadata = { title: `Forgot password | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return (
    // <div style={{ backgroundColor: '#F5fffa', width: '100%', height: 'auto' }}>
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

     <JwtForgotpassword/>
     </>
  //  </div>
  );
}
