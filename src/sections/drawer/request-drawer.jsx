import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import {
  Box,
  Grid,
  Card,
  Alert,
  Drawer,
  Divider,
  Toolbar,
  Tooltip,
  Snackbar,
  useTheme,
  TextField,
  IconButton,
  Typography,
  Backdrop as MuiBackdrop,
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

  const statuses = ['Accepted', 'Blocked'];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  // Generate a random date
  const randomDate = new Date(Date.now() - Math.random() * 10000000000).toISOString();

  // Generate a random Request ID
  const randomRequestId = `req_66fe${Math.random().toString(36).substring(2, 36)}`;

  return {
    RequestName: randomName,
    Requestdate: randomDate,
    status: randomStatus,
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
const CustomBackdrop = (props) => (
  <MuiBackdrop
    {...props}
    sx={{ backgroundColor: 'transparent' }} // Make the backdrop transparent
  />
);

export function RequestDrawer({ open, onClose, row, RequestName, Requestdate, RequestId }) {
  const theme = useTheme();

  const [randomData, setRandomData] = useState({});

  useEffect(() => {
    setRandomData(generateRandomData());
  }, []); // Empty dependency array ensures it runs once on mount

  //   const { RequestName, Requestdate, RequestId } = randomData; // Destructure the new ID

  const [openCopySnackbar, setOpenCopySnackbar] = React.useState(false);

  const handleOpenCopySnackbar = () => {
    setOpenCopySnackbar(true);
  };

  const handleCloseCopySnackbar = () => {
    setOpenCopySnackbar(false);
  };

  const [openCopyCodeSnackbar, setOpenCopyCodeSnackbar] = React.useState(false);

  const handleOpenCopyCodeSnackbar = () => {
    setOpenCopyCodeSnackbar(true);
  };

  const handleCloseCopyCodeSnackbar = () => {
    setOpenCopyCodeSnackbar(false);
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
      ModalProps={{
        BackdropComponent: CustomBackdrop,
      }}
    >
      {/* <Card component="ul" position="relative" float="left"> */}
      <Box
        display="flex"
        sx={{
          py: 2,
          pr: 1,
          pl: 2.5,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '1px dashed #919eab33',
          borderBottomRightRadius: '0px',
          borderBottomLeftRadius: '0px',
          // p: 3,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          bgcolor: '#fff',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="center"
            sx={{
              position: 'absolute',
              top: 0, // Default for larger screens
              right: 8, // Default for larger screens
              [theme.breakpoints.down('sm')]: {
                top: -8, // Adjust top position for mobile
                right: 8, // Adjust right position for mobile
              },
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
          {RequestName} {/* Display the random name */}
        </Typography>
        <Typography
          sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
        >
          Request ID - {RequestId} {/* Display the random ID */}
          <Tooltip title="Copy request_id " arrow placement="bottom">
            <IconButton
              edge="end"
              sx={{ color: 'text.disabled' }}
              onClick={() => {
                navigator.clipboard.writeText(RequestId); // Use the random ID
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
              Request id copied successfully.
            </Alert>
          </Snackbar>
        </Typography>
        <Typography
          sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
        >
          Executed at {formatDate(Requestdate)}
        </Typography>
      </Box>
      {/* <Divider /> */}
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Card sx={{ m: 3, bgcolor: '#fff', padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            <Tooltip
              title="Detailed information for the selected webhook request."
              disableInteractive
              placement="top"
              arrow
            >
              Request History
            </Tooltip>
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={100} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2">
                <Tooltip
                  title="Shows the current state of your request (e.g., Accepted, Pending, Failed)."
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
                  row.status === 'Accepted'
                    ? 'This is an accepted request'
                    : row.status === 'Blocked'
                      ? 'This request is blocked'
                      : ''
                }
                arrow
                placement="top"
                disableHoverListener={row.status !== 'Accepted' && row.status !== 'Blocked'}
                disableInteractive
              >
                <Label
                  size="small"
                  variant="soft"
                  color={
                    (row.status === 'Accepted' && 'success') ||
                    (row.status === 'Blocked' && 'error') ||
                    'default'
                  }
                >
                  {row.status}
                </Label>
              </Tooltip>

              {/* <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity={
                    row.status === 'Accepted'
                      ? 'success'
                      : row.status === 'Blocked'
                        ? 'error'
                        : 'info'
                  }
                  sx={{
                    width: '100%',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {row.status === 'Accepted'
                    ? 'Request successfully setup.'
                    : row.status === 'Blocked'
                      ? 'Request is blocked.'
                      : 'Unknown status.'}
                </Alert>
              </Snackbar> */}
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Tooltip
                  title="Identifies the origin of the request using a unique identifier code."
                  disableInteractive
                  placement="top"
                  arrow
                >
                  Source
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField
                disabled
                value="PostmanRuntime/7.42.0"
                fullWidth
                variant="outlined"
                size="small"
              />
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
              <TextField
                disabled
                value="https://webhook.site/13d732dc-21cf-4f72-b076-4821c21a8b46"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Tooltip
                  title="Displays the size of the request content in bytes/characters."
                  disableInteractive
                  placement="top"
                  arrow
                >
                  Content lenght{' '}
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled size="small" fullWidth value="37" />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Tooltip
                  title="Indicates the format of the request data (e.g., application/json, text/plain)"
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
                value="application/json"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>{' '}
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Tooltip
                  title="Shows which HTTP method was used to make the request (GET, POST, PUT, DELETE, etc.)."
                  disableInteractive
                  placement="top"
                  arrow
                >
                  Method
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled value="POST" fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Tooltip
                  title="Contains the actual data/payload sent with the request."
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
                  {`(request, context) => {
    // Initialize a counter
    let itemCounter = 0;
    // Process a list of items
    request.payload.items = request.payload.items || [];
    request.payload.items.forEach(item => {
      if (item.status === 'active') {
        itemCounter++;
        item.updated_at = new Date().toISOString();
      } else {
        item.status = 'inactive';
      }
    });

    // Add a summary field
    request.payload.summary = {
      activeItemCount: itemCounter,
      totalItems: request.payload.items.length
    };

    // Add a new header
    request.headers['X-Item-Count'] = itemCounter.toString();

    // Process query parameters
    request.queryParams.processedAt = new Date().toISOString();

    // Error handling for missing fields
    if (!request.payload.items.length) {
      throw new Error('No items to process');
    }

    return request;
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
                    // Copy text to clipboard
                    navigator.clipboard.writeText((request, context) => {
                      // Initialize a counter
                      let itemCounter = 0;
                      // Process a list of items
                      request.payload.items = request.payload.items || [];
                      request.payload.items.forEach((item) => {
                        if (item.status === 'active') {
                          itemCounter += 1; // Avoiding ++ operator
                          item.updated_at = new Date().toISOString();
                        } else {
                          item.status = 'inactive';
                        }
                      });

                      // Add a summary field
                      request.payload.summary = {
                        activeItemCount: itemCounter,
                        totalItems: request.payload.items.length,
                      };

                      // Add a new header
                      request.headers['X-Item-Count'] = itemCounter.toString();

                      // Process query parameters
                      request.queryParams.processedAt = new Date().toISOString();

                      // Error handling for missing fields
                      if (!request.payload.items.length) {
                        throw new Error('No items to process');
                      }

                      return request;
                    });

                    // Open Snackbar
                    handleOpenCopyCodeSnackbar();
                  }}
                >
                  <Tooltip title="Copy request_code" arrow placement="top">
                    <Iconify width={16} icon="solar:copy-bold" />
                  </Tooltip>
                </IconButton>
                <Snackbar
                  open={openCopyCodeSnackbar}
                  autoHideDuration={1000}
                  onClose={handleCloseCopyCodeSnackbar}
                  message="This is an error Alert."
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  // sx={{
                  //   boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
                  //   mt: 6.5,
                  // }}
                >
                  <Alert
                    onClose={handleCloseCopyCodeSnackbar}
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
                    Request code copied successfully.
                  </Alert>
                </Snackbar>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Tooltip
                  title='Lists any parameters included in the request URL after the "?" symbol'
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
                        onClick={() => {
                          navigator.clipboard.writeText('NA');
                          handleOpenCopyCodeSnackbar();
                        }}
                      >
                        <Iconify sx={{ mt: -0.2 }} width={15} icon="solar:copy-bold" />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Drawer>
  );
}
