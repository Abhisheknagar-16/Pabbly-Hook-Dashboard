import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import {
  Grid,
  Alert,
  AppBar,
  Divider,
  Tooltip,
  Toolbar,
  useTheme,
  Snackbar,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

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

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  // State to hold random data
  const [randomData, setRandomData] = useState({});

  // Generate random data on component mount
  useEffect(() => {
    setRandomData(generateRandomData());
  }, []); // Empty dependency array ensures it runs once on mount

  const { RequestName, Requestdate, RequestId } = randomData; // Destructure the new ID

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const evtItems = [
    { id: 1, label: '(request,context) =>' },

    // Add more items as needed
  ];
  // Function to copy text to clipboard
  const handleCopy = (text) => {};
  const confirm = useBoolean();
  const popover = usePopover();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const renderPrimary = (
    <TableRow hover
    selected={selected}
    sx={{
      '&:hover .copy-button': {
        opacity: 1,
      },
    }}>
      <TableCell padding="checkbox">
        <Tooltip arrow placement="top" title="Select">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </Tooltip>
      </TableCell>

      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
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
            {/* <Box component="span">
              <Tooltip
                title={`Request Name: ${RequestName}`}
                disableInteractive
                arrow
                placement="top"
              >
                {RequestName}
              </Tooltip>
            </Box> */}
            <Box component="span" sx={{ color: 'text.disabled' }}>
              <Tooltip
                title={
                  <div style={{ textAlign: 'center' }}>
                    {`Request created: ${formatDate(Requestdate)} (UTC+00:00) America/Danmarkshavn`}
                  </div>
                }
                disableInteractive
                arrow
                placement="top"
              >
                {formatDate(Requestdate)}
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack spacing={1} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">
              <Tooltip
                title={`Request Name: ${RequestName}`}
                disableInteractive
                arrow
                placement="top"
              >
                {RequestName}
              </Tooltip>
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }} />
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack spacing={2} direction="row" alignItems="right">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-end',
            }}
          >
            <Box component="span" onClick={handleOpenDrawer}>
            <a style={{ textDecoration: 'none', color: '#078dee' }}>
              <Tooltip title={`Request ID: ${RequestId}`} disableInteractive arrow placement="top">
                {RequestId}
              </Tooltip>
              </a>
              <Tooltip title="Copy request_id" arrow placement="bottom">
                <IconButton
                  className="copy-button"
                  color={popover.open ? 'inherit' : 'default'}
                  sx={{
                   width: '20px',
                   height: '20px',
                   opacity: 0,
                   transition: 'opacity 0.3s',
                   right: 0,
                 }}
                  onClick={() => navigator.clipboard.writeText(RequestId)} // Use the random ID
                >
                  <Iconify sx={{ mt: -0.2}} width={14} icon="solar:copy-bold" />
                </IconButton>
              </Tooltip>
            </Box>
            {/* <Box component="span" sx={{ color: 'text.disabled' }} /> */}
          </Stack>
        </Stack>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              onViewRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
        </MenuList>
      </CustomPopover>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
      {/* request drawer which is on click to open the drawer */}
      <Drawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
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
        {/* <Card component="ul" position="relative" float="left"> */}
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
              onClick={handleCloseDrawer}
            >
              <Iconify icon="mingcute:close-line" />
            </IconButton>
          </Toolbar>
          <Typography
            sx={{
              mt: -8,
              flex: 1,
              ml: 2,
              color: 'primary',
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
                onClick={() => navigator.clipboard.writeText(RequestId)}
              >
                <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography
            sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
          >
            Executed at {formatDate(Requestdate)}
          </Typography>
        </AppBar>
        <Divider />
        <Box sx={{ width: '90%', mt: 2, ml: 5, bgcolor: '#fff', padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Request History
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={100} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Status
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <Button
                onClick={handleOpenSnackbar}
                variant="soft"
                size="small"
                color={
                  row.status === 'Accepted'
                    ? 'success'
                    : row.status === 'Blocked'
                      ? 'error'
                      : 'default'
                } // Conditionally set the button color
              >
                {row.status}
              </Button>

              <Snackbar
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
              </Snackbar>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Source
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled size="small" fullWidth value={formatDate(Requestdate)} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Content lenght{' '}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled size="small" fullWidth value={RequestId} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Content type
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
                Method
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled value="Get" fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Body
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
                  onClick={() =>
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
                    })
                  }
                >
                  <Tooltip title="Copy request_code" arrow placement="top">
                    <Iconify width={16} icon="solar:copy-bold" />
                  </Tooltip>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
