import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
// import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

// import { fDate, fTime } from 'src/utils/format-time';

import {
  Grid,
  Alert,
  AppBar,
  Divider,
  Tooltip,
  Toolbar,
  Snackbar,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// import { AppBar } from 'src/theme/core/components/appbar';
// import { Typography } from 'src/theme/core';

// import { FullScreenDialog } from '../dialog-view/full-screen-dialog';
export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const evtItems = [
    { id: 1, text: 'req_66c87b54a2b7dc2c1740d639', label: '(request,context) =>' },

    // Add more items as needed
  ];
  // Function to copy text to clipboard
  const handleCopy = (text) => { };
  const confirm = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Tooltip arrow placement="top" title="Select"><Checkbox
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
                row.status === 'Accepted'
                  ? 'This is an accepted request'
                  : row.status === 'Blocked'
                    ? 'This request is blocked'
                    : ''
              }
              arrow
              placement='top'
              disableHoverListener={row.status !== 'Accepted' && row.status !== 'Blocked'}
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
           <Box sx={{ mt: 0}} fontSize={14}>Ankit Singh Parmar</Box>  
            <Box
              component="span"
              sx={{ color: 'text.disabled', mt: 0, fontSize: '12px', fontWeight: 400 }}
            >
              Aug 23, 2024 17:36:44.929
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
            <Box component="span">
            <Tooltip title="Request ID " arrow placement="top">req_66c87b54a2b7dc2c1740d639</Tooltip>
              <Tooltip title="Copy request_id " arrow placement="bottom">
                <IconButton
                  edge="end"
                  sx={{ color: 'text.disabled' }}
                  onClick={() => navigator.clipboard.writeText('req_66c87b54a2b7dc2c1740d639')}
                >
                  <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
            />
          </Stack>
        </Stack>
      </TableCell>
     
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-end',
            }}
          >
            {evtItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Tap to view full request details " arrow placement="top">
                <Typography onClick={handleOpenDrawer} fontSize={14} color="primary.main">
                  {item.label}
                </Typography>
                </Tooltip>
              </Box>
            ))}
            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
            />
          </Stack>
        </Stack>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral', width: '100%' }}
        >
          <Paper sx={{ m: 1.5 }}>
            {row.items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                  },
                }}
              >
                <ListItemText
                  primary="Verification Token:************"
                  secondary={item.sku}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                    mt: 0.5,
                  }}
                />
              </Stack>
            ))}
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow >
  );
  return (
    <>
      {renderPrimary}
      {renderSecondary}
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
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            Rajpal Singh Tomar
          </Typography>
          <Typography
            sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '14px', fontWeight: 400 }}
          >
            req_66c87b54a2b7dcc1740d639
            <Tooltip title="Copy request_id " arrow placement="bottom">
                  <IconButton
                    edge="end"
                    sx={{ color: 'text.disabled' }}
                    onClick={() => navigator.clipboard.writeText('req_66c87b54a2b7dc2c1740d639')}
                  >
                    <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
                  </IconButton>
                </Tooltip>
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
              <Typography variant="body2" sx={{mt:1}}>Status</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <Button onClick={handleOpenSnackbar} variant="contained" color="success" size="small">
                Accepted
              </Button>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message="This is an successfully setup."
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',  // Changed to 'center' from 'mid 10%' to use a valid Material-UI position
                }}
              >
                <Alert onClose={handleCloseSnackbar} severity="success">
                  Request successfully setup.
                </Alert>
              </Snackbar>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{mt:1}}>Source</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField
                disabled
                value="2024-08-23T12:06:44.929Z"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{mt:1}}>Content lenght </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField
                disabled
                value="req_66c87b54a2b7dc2c1740d639"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{mt:1}}>Content type</Typography>
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
              <Typography variant="body2" sx={{mt:1}}>Method</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled value="Get" fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{mt:1}}>Body</Typography>
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
                  <Tooltip title="Copy request_code" arrow placement="bottom">
                    <Iconify width={16} icon="solar:copy-bold" />
                  </Tooltip>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Drawer >
    </>
  );
}
