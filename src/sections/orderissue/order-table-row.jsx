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
  AppBar,
  Divider,
  Toolbar,
  Tooltip,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// Random data generator
const generateRandomData = () => {
  const names = ['Rajpal Singh Tomar', 'Abhishek Nagar', 'Ankit Mandli', 'Ayush Bisen', 'Nikhil Patel'];

  const randomName = names[Math.floor(Math.random() * names.length)];

  // Generate a random date
  const randomDate = new Date(Date.now() - Math.random() * 10000000000).toISOString();

    // Generate a random Issue ID
    const randomIssueID = `isu_66fe${Math.random().toString(36).substring(2, 36)}`;

  return {
    IssueName: randomName,
    IssueApplied: randomDate,
    IssueID: randomIssueID, // Add the random ID to the returned object
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
  const confirm = useBoolean();
  const popover = usePopover();

  // State to hold random data
  const [randomData, setRandomData] = useState({});

  // Generate random data on component mount
  useEffect(() => {
    setRandomData(generateRandomData());
  }, []); // Empty dependency array ensures it runs once on mount

  const { IssueName, IssueApplied, IssueID} = randomData;

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
        <Tooltip title="Select" arrow placement="top">
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
            <Box component="span"><Tooltip title={`Issue Name: ${IssueName}`} arrow placement='top'>
              {IssueName}
            </Tooltip></Box>
            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
            >
              <Tooltip title={`Issue Applied: ${formatDate(IssueApplied)}`} arrow placement='top'>
                {formatDate(IssueApplied)}
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
            <Box component="span">
            <Tooltip title={`Issue ID: ${IssueID}`} arrow placement="top">{IssueID}</Tooltip>
              <Tooltip title="Copy issue_id " arrow placement="bottom">
                <IconButton
                  edge="end"
                  sx={{ color: 'text.disabled' }}
                  onClick={() => navigator.clipboard.writeText('isu_66c87b54a2b7dc2c1740d639')}
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

      <TableCell align="right">
        <Tooltip title="Tap to view full issue details" arrow placement="top">
          <Box
            component="span"
            sx={{ color: 'primary.main', cursor: 'pointer' }}
            onClick={handleOpenDrawer}
          >
            {'(issue, context) =>'}
          </Box></Tooltip>
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
                top: 1, // Adjust top position as needed
                right: 28, // Adjust right position as needed
              }}
              onClick={handleCloseDrawer}
            >
              <Iconify icon="mingcute:close-line" />
            </IconButton>
            {/* You can uncomment this Button if you need a Save button */}
            {/* <Button autoFocus color="inherit" variant="contained" onClick={dialog.onFalse}>
            Save
          </Button> */}
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
           {IssueName}
          </Typography>
          <Typography
            sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
          >
            {IssueID}
            <Tooltip title="Copy issue_id " arrow placement="bottom">
              <IconButton
                edge="end"
                sx={{ color: 'text.disabled' }}
                onClick={() => navigator.clipboard.writeText('isu_66c87b54a2b7dc2c1740d639')}
              >
                <Iconify sx={{ mt: -0.2 }} width={15} icon="solar:copy-bold" />
              </IconButton>
            </Tooltip>
          </Typography>
        </AppBar>
        <Divider />
        <Box sx={{ width: '90%', mt: 2, ml: 5, bgcolor: '#fff', padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Issue Details
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={100} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Name</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <TextField 
               disabled size="small" fullWidth value={IssueName} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Applied At</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <TextField disabled size="small" fullWidth value={formatDate(IssueApplied)} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>ISU ID</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <TextField 
               disabled size="small" fullWidth value={IssueID} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Last Updated At</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField
                disabled
                value="2024-08-23T12:06:44.930Z"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Issue Code</Typography>
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
                  {`(issue, context) => {
    // Initialize a counter
    let itemCounter = 0;
    // Process a list of items
    issue.payload.items = issue.payload.items || [];
    issue.payload.items.forEach(item => {
      if (item.status === 'active') {
        itemCounter++;
        item.updated_at = new Date().toISOString();
      } else {
        item.status = 'inactive';
      }
    });

    // Add a summary field
    issue.payload.summary = {
      activeItemCount: itemCounter,
      totalItems: issue.payload.items.length
    };

    // Add a new header
    issue.headers['X-Item-Count'] = itemCounter.toString();

    // Process query parameters
    issue.queryParams.processedAt = new Date().toISOString();

    // Error handling for missing fields
    if (!request.payload.items.length) {
      throw new Error('No items to process');
    }

    return issue;
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
                    navigator.clipboard.writeText((issue, context) => {
                      // Initialize a counter
                      let itemCounter = 0;
                      // Process a list of items
                      issue.payload.items = issue.payload.items || [];
                      issue.payload.items.forEach((item) => {
                        if (item.status === 'active') {
                          itemCounter += 1; // Avoiding ++ operator
                          item.updated_at = new Date().toISOString();
                        } else {
                          item.status = 'inactive';
                        }
                      });

                      // Add a summary field
                      issue.payload.summary = {
                        activeItemCount: itemCounter,
                        totalItems: issue.payload.items.length,
                      };

                      // Add a new header
                      issue.headers['X-Item-Count'] = itemCounter.toString();

                      // Process query parameters
                      issue.queryParams.processedAt = new Date().toISOString();

                      // Error handling for missing fields
                      if (!issue.payload.items.length) {
                        throw new Error('No items to process');
                      }

                      return issue;
                    })
                  }
                >
                  <Tooltip title="Copy issue_code" arrow placement="bottom">
                    <Iconify width={16} icon="solar:copy-bold" />
                  </Tooltip>
                </IconButton>
              </Box>
            </Grid>

          </Grid>
        </Box>
        {/* </Card> */}
      </Drawer>
    </>
  );
}
