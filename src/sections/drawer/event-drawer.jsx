import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import {
  Box,
  Grid,
  Alert,
  AppBar,
  Drawer,
  Divider,
  Toolbar,
  Tooltip,
  useTheme,
  Snackbar,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

const generateRandomData = () => {
  const names = [
    'Rajpal Singh Tomar',
    'Abhishek Nagar',
    'Ankit Mandli',
    'Ayush Bisen',
    'Nikhil Patel',
  ];

  const statuses = ['success', 'rejected'];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  // Generate a random date
  const randomDate = new Date(Date.now() - Math.random() * 10000000000).toISOString();

  // Generate a random Event ID
  const randomRequestId = `req_66fe${Math.random().toString(36).substring(2, 36)}`;

  // Generate a random Event ID
  const randomEventId = `evt_66fe${Math.random().toString(36).substring(2, 36)}`;

  return {
    EventName: randomName,
    Eventdate: randomDate,
    status: randomStatus,
    EventId: randomEventId,
    RequestId: randomRequestId,
  };
};

// Date formatting function
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24-hour format
  };
  const date = new Date(dateString);
  return date.toLocaleString('en-US', options).replace(',', '');
};

export function EventsDrawer({ open, onClose, row, EventName, Eventdate, EventId, RequestId }) {
  const theme = useTheme();

  const [randomData, setRandomData] = useState({});

  useEffect(() => {
    setRandomData(generateRandomData());
  }, []); // Empty dependency array ensures it runs once on mount

  const [openCopySnackbar, setOpenCopySnackbar] = React.useState(false);

  const handleOpenCopySnackbar = () => {
    setOpenCopySnackbar(true);
  };

  const handleCloseCopySnackbar = () => {
    setOpenCopySnackbar(false);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 700, md: 850 }, // Adjust width based on screen size
          '@media (max-width: 300px)': {
            padding: '16px',
          },
        },
      }}
    >
      <AppBar
        sx={{ bgcolor: '#fff', padding: 2 }}
        position="relative"
        color="default"
        display="flex"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{
              position: 'absolute',
              top: 12, // Adjust top position as needed
              right: 28, // Adjust right position as needed
            }}
            onClick={onClose}
          >
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Toolbar>
        <Typography
          sx={{
            mt: -8,
            flex: 1,
            ml: 2,
            color: '#078dee',
            fontSize: '24px',
            fontWeight: 700,
          }}
        >
          {EventName} {/* Display the random name */}
        </Typography>
        <Typography
          sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
        >
          Event ID - {EventId} {/* Display the random ID */}
          <Tooltip title="Copy event_id " arrow placement="bottom">
            <IconButton
              edge="end"
              sx={{ color: 'text.disabled' }}
              onClick={() => {
                navigator.clipboard.writeText(EventId); // Use the random ID
                handleOpenCopySnackbar();
              }}
            >
              <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
            </IconButton>
          </Tooltip>
          <Snackbar
            open={openCopySnackbar}
            autoHideDuration={1000}
            onClose={handleCloseCopySnackbar}
            message="This is an error Alert."
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            // sx={{
            //   boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
            //   mt: 6.5,
            // }}
          >
            <Alert
              onClose={handleCloseCopySnackbar}
              severity="success"
              sx={{
                width: '100%',
                fontSize: '14px',
                fontWeight: 'bold',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
                // mt: 6.5,
              }}
            >
              Event id copied successfully.
            </Alert>
          </Snackbar>
        </Typography>
        <Typography
          sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
        >
          Executed at {formatDate(Eventdate)}
        </Typography>
      </AppBar>
      <Divider />
      <Box sx={{ width: '90%', mt: 2, ml: 5, bgcolor: '#fff', padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          <Tooltip
            title="Detailed information for the selected webhook event."
            disableInteractive
            placement="top"
            arrow
          >
            Event History
          </Tooltip>
        </Typography>
        <Divider />
        <Grid container spacing={2} mt={2}>
          <Grid item xs={100} sm={4} md={3} lg={2} xl={2}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Tooltip
                title="Shows whether the event succeeded, failed, or is in an unknown state."
                disableInteractive
                placement="top"
                arrow
              >
                Status
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <Tooltip
              title={
                row.status === 'success'
                  ? 'This is an successful event'
                  : row.status === 'rejected'
                    ? 'This event is rejected'
                    : row.status === 'scheduled'
                      ? 'This event is scheduled'
                      : ''
              }
              arrow
              disableInteractive
              placement="top"
              disableHoverListener={
                row.status !== 'success' && row.status !== 'rejected' && row.status !== 'scheduled'
              }
            >
              <Label
                variant="soft"
                color={
                  (row.status === 'success' && 'success') ||
                  (row.status === 'rejected' && 'error') ||
                  (row.status === 'scheduled' && 'info') ||
                  'default'
                }
              >
                {row.status}
              </Label>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Tooltip
                title="Shows which connection or integration triggered this event."
                disableInteractive
                placement="top"
                arrow
              >
                Source
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <TextField disabled
              value="PostmanRuntime/7.42.0"
              fullWidth
              variant="outlined"
              size="small" />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Tooltip
                title="Shows which connection or integration triggered this event."
                disableInteractive
                placement="top"
                arrow
              >
                Destination URL
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <TextField disabled
              value="https://webhook.site/13d732dc-21cf-4f72-b076-4821c21a8b46"
              fullWidth
              variant="outlined"
              size="small" />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Tooltip
                title="Shows how much data was processed in the event."
                disableInteractive
                placement="top"
                arrow
              >
                Content lenght{' '}
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <TextField disabled size="small" fullWidth value={EventId} />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Tooltip
                title="Indicates what kind of data format was involved in the event."
                disableInteractive
                placement="top"
                arrow
              >
                Content type
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <TextField
              disabled
              value="2024-08-23T12:06:44.930Z"
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>{' '}
          <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Tooltip
                title="Shows which type of request action was used in this event."
                disableInteractive
                placement="top"
                arrow
              >
                Method
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <TextField disabled value="Get" fullWidth variant="outlined" size="small" />
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Tooltip
                title="Contains any data that was sent during this event."
                disableInteractive
                placement="top"
                arrow
              >
                Body
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <Box
              sx={{
                position: 'relative',
                maxHeight: 400,
                overflowY: 'auto', // Control vertical overflow
                overflowX: 'hidden', // Hide horizontal overflow to avoid scroll
                border: '1px solid #E5E8EB',
                borderRadius: 1,
                // Custom scrollbar styling
                '&::-webkit-scrollbar': {
                  width: '8px', // Set the width of the scrollbar
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888', // Color of the scrollbar thumb
                  borderRadius: '10px', // Border radius for rounded scrollbar
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#555', // Color on hover
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1', // Background of the scrollbar track
                  borderRadius: '10px', // Border radius for the track
                },
              }}
            >
              <SyntaxHighlighter
                language="javascript"
                customStyle={{
                  backgroundColor: 'transparent',
                  wordWrap: 'break-word', // Ensure long lines wrap
                  whiteSpace: 'pre-wrap', // Maintain formatting while allowing wrapping
                }}
                wrapLongLines // Ensure code lines don't overflow horizontally
              >
                {`(event, context) => {
    // Initialize a counter
    let itemCounter = 0;
    // Process a list of items
    event.payload.items = event.payload.items || [];
    event.payload.items.forEach(item => {
      if (item.status === 'active') {
        itemCounter++;
        item.updated_at = new Date().toISOString();
      } else {
        item.status = 'inactive';
      }
    });

    // Add a summary field
    event.payload.summary = {
      activeItemCount: itemCounter,
      totalItems: event.payload.items.length
    };

    // Add a new header
    event.headers['X-Item-Count'] = itemCounter.toString();

    // Process query parameters
    event.queryParams.processedAt = new Date().toISOString();

    // Error handling for missing fields
    if (!event.payload.items.length) {
      throw new Error('No items to process');
    }

    return event;
  }`}
              </SyntaxHighlighter>

              {/* Copy button */}
              <IconButton
                edge="end"
                sx={{
                  position: 'absolute',
                  top: 15, // Adjust as needed
                  right: 10, // Adjust as needed
                  color: 'text.disabled',
                }}
                onClick={() => {
                  navigator.clipboard.writeText((event, context) => {
                    // Initialize a counter
                    let itemCounter = 0;
                    // Process a list of items
                    event.payload.items = event.payload.items || [];
                    event.payload.items.forEach((item) => {
                      if (item.status === 'active') {
                        itemCounter += 1; // Avoiding ++ operator
                        item.updated_at = new Date().toISOString();
                      } else {
                        item.status = 'inactive';
                      }
                    });

                    // Add a summary fieldevent
                    event.payload.summary = {
                      activeItemCount: itemCounter,
                      totalItems: event.payload.items.length,
                    };

                    // Add a new header
                    event.headers['X-Item-Count'] = itemCounter.toString();

                    // Process query parameters
                    event.queryParams.processedAt = new Date().toISOString();

                    // Error handling for missing fields
                    if (!event.payload.items.length) {
                      throw new Error('No items to process');
                    }

                    return event;
                  });
                  // Open Snackbar
                  handleOpenCopySnackbar();
                }}
              >
                <Tooltip title="Copy request_code" arrow placement="bottom">
                  <Iconify width={16} icon="solar:copy-bold" />
                </Tooltip>
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Tooltip
                title="Shows any additional parameters that were included with the event."
                disableInteractive
                placement="top"
                arrow
              >
                Query Params
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <TextField
              disabled
              value="NA"
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <Tooltip title="Copy Text " arrow placement="bottom">
                    <IconButton
                      edge="end"
                      sx={{ color: 'text.disabled' }}
                      onClick={() => navigator.clipboard.writeText('NA')}
                    >
                      <Iconify sx={{ mt: -0.2 }} width={15} icon="solar:copy-bold" />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
}
