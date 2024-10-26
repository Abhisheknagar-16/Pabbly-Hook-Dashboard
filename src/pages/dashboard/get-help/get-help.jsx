// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-modal-video/css/modal-video.min.css';

import { useTheme } from '@mui/material/styles';
import { Box, Button, Tooltip, Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

// import PageHeader from 'src/components/page-header/page-header';

import PageHeader from 'src/components/Pageheader/pageheader';

import GetHelpBigCard from 'src/sections/get-help/components/big-card';
import { VideoPlayList } from 'src/sections/get-help/components/video-playlist';

// ----------------------------------------------------------------------

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dialog = useBoolean();

  return (
    <div style={{ backgroundColor: '#F3F7FA', width: '100%', minHeight: '100vh', height: 'auto' }}>
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 0, mt: "35px"
        }}
      >
        <PageHeader
          title="Help & Tutorials"
          Subheading="Tell us about your problem, and we’ll find you a solution."
          link_added="#"
        />
      </Box>

      <GetHelpBigCard />

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mt: 3,
        }}
      >
        <Typography variant="h4">Tutorials</Typography>
        <Tooltip
          title={
            <div style={{ textAlign: 'center' }}>Click here to access over 6000+ detailed tutorials on our YouTube channel.</div>
        }

          arrow
          placement="top"
        >
          <Button
  onClick={() => {
    dialog.onTrue();
    window.open("https://www.youtube.com/@Pabbly", "_blank");
  }}
  sx={{ mt: isMobile ? 2 : 0 }}
  size="large"
  variant="outlined"
  color="primary"
>
  Watch all tutorials
</Button>
        </Tooltip>
      </Box>

      <VideoPlayList />
    </DashboardContent>
    </div>
  );
}
