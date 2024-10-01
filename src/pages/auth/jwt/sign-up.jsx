import { Helmet } from 'react-helmet-async';

import { Box, Button, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { JwtSignUpView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
    <Box
        sx={{
          position: 'absolute',
          top: { xs: 8, md: 16 },
          right: { xs: 8, md: 16 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack items on smaller screens, row for desktop
          alignItems: 'center', // Align items vertically
          justifyContent: { xs: 'center', md: 'flex-start' }, // Center items on mobile, left-align on desktop
          padding: { xs: 2, md: 0 }, // Add padding on mobile
          gap: { xs: 1, md: 0 }, // Add gap between items on mobile, no gap on desktop
          width: { xs: '100%', md: 'auto' }, // Full width on mobile, auto on desktop
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginRight: { xs: 0, md: 1 }, // Remove margin on mobile
            textAlign: { xs: 'center', md: 'left' } // Center text on mobile, left-align on desktop
          }}
        >
          Already a user?
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{
            width: { xs: 'auto', md: 'auto' } // Full width on mobile, auto on desktop
          }}
        >
          Sign In
        </Button>
      </Box>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtSignUpView />
    </>
  );
}
