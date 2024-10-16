import Box from '@mui/material/Box';
// import { Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

// import { FormDialog } from 'src/sections/dialog-view/form-dialog';

// import { CourseWidgetSummary } from '../course-widget-summary';

// ----------------------------------------------------------------------

export function StatsCardTimezone() {
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl" sx={{ pb: { xs: 2, xl: 1}, px: { xs: 0, sm: 0, xl: 0 } }}>
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
            pt:3,
            pb:1,
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
                <Typography sx={{mt:-0.2,mb:0.2}} variant="h4">Time Zone</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                 Select your account&apos;s time zone from here. By selecting your account time zone from the settings menu, you can ensure that all of your works and task executions are displayed at the correct time for your location. &nbsp;
                 {/* <a href="https://www.youtube.com/playlist?list=PLgffPJ6GjbaIZTlTtPyVtCLJ43RyaLS-U" target="_blank"
                    rel="noopener noreferrer" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                    Learn more
                  </a> */}
                </Typography>
              </div>
              <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                {/* <FormDialog /> */}
              </Box>
            </Box>
          </Box>

          {/* <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: { sm: 'repeat(2, 1fr)', xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
            }}
          >
            <Tooltip title="Number of total connections." arrow placement='top'>
              <div>
                <CourseWidgetSummary
                  title="Total Connections"
                  total={232}
                  icon={`${CONFIG.site.basePath}/assets/icons/courses/connections.png`}
                />
              </div>
            </Tooltip>


            <Tooltip title="Number of total request." arrow placement='top'>
              <div>
                <CourseWidgetSummary
                  title="Total Request"
                  total={986470}
                  color="secondary"
                  icon={`${CONFIG.site.basePath}/assets/icons/courses/total-events.png`}
                />
              </div>
            </Tooltip>

            <Tooltip title="Number of total events." arrow placement='top'>
              <div>
                <CourseWidgetSummary
                  title="Total Events"
                  total={986414}
                  color="success"
                  icon={`${CONFIG.site.basePath}/assets/icons/courses/request.png`}
                />
              </div>
            </Tooltip>
          </Box> */}

        </Box>

      </Box>
    </DashboardContent>
  );
}