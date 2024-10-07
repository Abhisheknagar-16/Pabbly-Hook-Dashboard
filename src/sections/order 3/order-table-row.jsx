import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Grid, Alert, Drawer, AppBar, Divider,Toolbar,Tooltip, Snackbar, TextField, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

const generateRandomData = () => {
  const names = ['Rajpal Singh Tomar', 'Abhishek Nagar', 'Ankit Mandli', 'Ayush Bisen', 'Nikhil Patel'];

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
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3,
  };
  const date = new Date(dateString);
  return date.toLocaleString('en-US', options).replace(',', '');
};

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

    // State to hold random data
    const [randomData, setRandomData] = useState({});

    // Generate random data on component mount
    useEffect(() => {
      setRandomData(generateRandomData());
    }, []); // Empty dependency array ensures it runs once on mount
  
    const { EventName, Eventdate, EventId, RequestId } = randomData; // Destructure the new ID

  const confirm = useBoolean();
  const popover = usePopover();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

   // Determine attempt count based on status
   const attemptCount = row.status === 'success' ? 1 : row.status === 'rejected' ? 2 : row.status === 'scheduled' ? 3 : 0;

   // Determine button color based on status
   const buttonColor = row.status === 'success' ? 'success' : row.status === 'rejected' ? 'error' : 'info';

   // Tooltip text for the attempt button
  const attemptTooltip = `This is attempt number ${attemptCount} for a ${row.status} event.`;

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Tooltip arrow placement="top" title="Select">  <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        /></Tooltip>
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
                row.status === 'success'
                  ? 'This is a successful event'
                  : row.status === 'rejected'
                    ? 'This event was rejected'
                    : row.status === 'scheduled'
                      ? 'This event is scheduled'
                      : ''
              }
              arrow
              placement='top'
              disableHoverListener={row.status !== 'success' && row.status !== 'rejected'}
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
            <Box component="span"><Tooltip title={`Event Name: ${EventName}`} arrow placement='top'>
              {EventName}
            </Tooltip></Box>
            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
            />
            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
            >
              <Tooltip title={`Event date: ${formatDate(Eventdate)}`} arrow placement='top'>
                {formatDate(Eventdate)}
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
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
   
              <Box sx={{ display: 'flex', alignItems: 'center' }}>

                <Tooltip title="Request ID" arrow placement='top'>
                  <Typography fontSize={14} color="#1c252e">
                    {RequestId}
                  </Typography>
                </Tooltip>
                <Tooltip title="Copy request_id " arrow placement="bottom">

                  <IconButton
                    edge="end"
                    sx={{ color: 'text.disabled' }}
                    onClick={() => navigator.clipboard.writeText(RequestId)}
                  >
                    <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
                  </IconButton>
                </Tooltip>
              </Box>
 
           
              <Box sx={{ display: 'flex', alignItems: 'center', mt: -0.3 }}>
                <Tooltip title="Event ID" arrow placement='top'>
                  <Typography fontSize={12} color="#919eab">
                    {EventId}
                  </Typography>
                </Tooltip>
                <Tooltip title="Copy event_id" arrow placement="bottom">
                  <IconButton
                    edge="end"
                    sx={{ color: 'text.disabled' }}
                    onClick={() => navigator.clipboard.writeText(EventId)}
                  >
                    <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
                  </IconButton>
                </Tooltip>
              </Box>
    
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
      <Tooltip title={attemptTooltip} arrow placement='top'>
          <Button
            variant='outlined'
            color={buttonColor}
            size='small'
            onClick={handleOpenDrawer}
          >
            Attempt {attemptCount}
          </Button>
        </Tooltip>
        <IconButton
          sx={{ mt: -0.2 }}
          color={popover.open ? 'inherit' : 'default'}
          onClick={popover.onOpen}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
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
            {EventName} {/* Display the random name */}
          </Typography>
          <Typography
            sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
          >
            {EventId} {/* Display the random ID */}
            <Tooltip title="Copy event_id " arrow placement="bottom">
              <IconButton
                edge="end"
                sx={{ color: 'text.disabled' }}
                onClick={() => navigator.clipboard.writeText(EventId)}
              >
                <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
              </IconButton>
            </Tooltip>
          </Typography>
        </AppBar>
        <Divider />
        <Box sx={{ width: '90%', mt: 2, ml: 5, bgcolor: '#fff', padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Event History
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={100} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Status</Typography>
            </Grid>

            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <Button
                onClick={handleOpenSnackbar}
                variant="contained"
                size="small"
                // variant="soft"
                color={
                  (row.status === 'success' && 'success') ||
                  (row.status === 'rejected' && 'error') ||
                  (row.status === 'scheduled' && 'info') ||
                  'default'
                }
              >
                {row.status}
              </Button>

              <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity={row.status === 'success' ? 'success' : row.status === 'rejected' ? 'error' : 'info'}
                >
                  {row.status === 'success' ? 'Event successfully setup.' : row.status === 'rejected' ? 'Event is rejected.' : 'Unknown status.'}
                </Alert>
              </Snackbar>
            </Grid>

            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Source</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
             <TextField disabled size="small" fullWidth value={formatDate(Eventdate)} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Content lenght </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled size="small" fullWidth value={EventId} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Content type</Typography>
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
              <Typography variant="body2" sx={{ mt: 1 }}>Method</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled value="Get" fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Body</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <Box
                sx={{
                  position: 'relative',
                  maxHeight: 400,
                  overflowY: 'auto',  // Control vertical overflow
                  overflowX: 'hidden',  // Hide horizontal overflow to avoid scroll
                  border: '1px solid #E5E8EB',
                  borderRadius: 1,
                  // Custom scrollbar styling
                  '&::-webkit-scrollbar': {
                    width: '8px',  // Set the width of the scrollbar
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',  // Color of the scrollbar thumb
                    borderRadius: '10px',  // Border radius for rounded scrollbar
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',  // Color on hover
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',  // Background of the scrollbar track
                    borderRadius: '10px',  // Border radius for the track
                  },
                }}
              >
                <SyntaxHighlighter
                  language="javascript"
                  customStyle={{
                    backgroundColor: 'transparent',
                    wordWrap: 'break-word',  // Ensure long lines wrap
                    whiteSpace: 'pre-wrap',  // Maintain formatting while allowing wrapping
                  }}
                  wrapLongLines  // Ensure code lines don't overflow horizontally
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
                  onClick={() =>
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
                    })
                  }
                >
                  <Tooltip title="Copy request_code" arrow placement="bottom">
                    <Iconify width={16} icon="solar:copy-bold" />
                  </Tooltip>
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{mt:1}}>Query Params</Typography>
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
      </Drawer >
    </>
  );
}
