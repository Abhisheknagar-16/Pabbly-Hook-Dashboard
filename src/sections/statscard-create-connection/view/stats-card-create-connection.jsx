import React from 'react';

import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { CourseWidgetSummary } from '../course-widget-summary';

// ----------------------------------------------------------------------

export function StatsCardCreatedConnection() {
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl" sx={{ pb: { xs: 2, xl: 1 }, px: { xs: 0, sm: 0, xl: 0 } }}>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Box
          sx={{
            gap: 4,
            display: 'flex',
            minWidth: { lg: 0 },
            pt: 3,
            pb: 1,
            flexDirection: 'column',
            flex: { lg: '1 1 auto' },
            // px: { xs: 3, sm: 3,  },
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'left',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <div>
                <Typography sx={{ mt: -0.2, mb: 0.2 }} variant="h4">
                  Connections
                </Typography>
                {/* <Tooltip title="Create a connection to experience the full benefits of Pabbly Hook." arrow placement='top'> */}
                <Typography sx={{ color: 'text.secondary' }}>
                  Create and manage all of your connection in one place with Pabbly Hook dashboard.
                  &nbsp;
                  <a
                    href="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U"
                    style={{ color: '#078DEE', textDecoration: 'underline' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                  </a>
                </Typography>
                {/* </Tooltip> */}
              </div>
              {/* <Box sx={{ mt: { xs: 2, sm: 1.8 } }}>
                <CreateConnectionFormDialog/>
              </Box> */}
            </Box>
          </Box>

          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                sm: 'repeat(2, 1fr)',
                xs: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >
            <Tooltip
              title="Number of connections created in your account."
              disableInteractive
              arrow
              placement="top"
            >
              <div>
                <CourseWidgetSummary
                  title="Total Connections"
                  total={232}
                  icon={`${CONFIG.site.basePath}/assets/icons/courses/connectionicon.png`}
                />
              </div>
            </Tooltip>

            <Tooltip
              disableInteractive
              title="When the source sends a webhook event to Pabbly Hooks, Pabbly generates a request in response."
              arrow
              placement="top"
            >
              <div>
                <CourseWidgetSummary
                  title="Total Requests (Webhooks Received)"
                  total={986470}
                  color="secondary"
                  icon={`${CONFIG.site.basePath}/assets/icons/courses/requesticon.png`}
                />
              </div>
            </Tooltip>

            <Tooltip
              disableInteractive
              title="When Pabbly Hooks forwards a webhook event to the destination, it generates an event upon receiving the response. This event is created regardless of the response status code by the destination. (2XX, 3XX, 4XX, or 5XX)."
              arrow
              placement="top"
            >
              <div>
                <CourseWidgetSummary
                  title="Total Events (Webhooks Forwarded)"
                  total={986414}
                  color="success"
                  icon={`${CONFIG.site.basePath}/assets/icons/courses/eventicon.png`}
                />
              </div>
            </Tooltip>

            {/* <Tooltip title="Number of total free tasks." arrow placement='top'>
              <div>
                <CourseWidgetSummary
                  title="Free Task consumed"
                  total={200}
                  color="info"
                  icon={`${CONFIG.site.basePath}/assets/icons/courses/free.png`}
                />
              </div>
            </Tooltip> */}
          </Box>
        </Box>
      </Box>
    </DashboardContent>
  );
}
