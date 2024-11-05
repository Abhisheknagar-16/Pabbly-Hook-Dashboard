import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Button, Tooltip, Popover, Divider, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function OrderTableToolbar({ filters, onResetPage, publish, onChangePublish, numSelected }) {
  const theme = useTheme();
  const isBelow900px = useMediaQuery(theme.breakpoints.down('md'));
  const isBelow600px = useMediaQuery(theme.breakpoints.down('sm'));
  const confirm = useBoolean();

  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  const sortconnection = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
  const connectionstatus = ['All Status', 'Active', 'Inactive'];
  const folder = [
    'Pabbly Connect',
    'Main Folder',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
  ];

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);

  const handleApplyFilter = () => {
    console.log('Applying filter:', { column: selectedColumn, operator, value: filterValue });
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
  };

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
  };

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    padding: '0 16px',
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems="center"
        direction={isBelow600px ? 'column' : 'row'}
        sx={{ p: 2.5, width: '100%' }}
      >
        <Box sx={{ width: '100%' }}>
          <Tooltip title="Click here to search the connection." disableInteractive arrow placement="top">
            <TextField
              fullWidth
              value={filters.state.name}
              onChange={handleFilterName} // Handle changes for search input
              placeholder="Search by Connetion name or ID's..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'row',
            width: isBelow600px ? '100%' : 'auto',
            justifyContent: 'flex-end', // Aligns buttons to the right
          }}
        >
          {numSelected > 0 && (
            <Tooltip
              title="Click here to modify connection status, or to move and delete connection."
              arrow
              disableInteractive
              placement="top"
            >
              <Button
                endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                onClick={handlePopoverOpen}
                // variant="outlined"
                color="primary"
                sx={{
                  ...buttonStyle,
                  width: isBelow600px ? '155px' : '155px', // Fixed width for "Select Action"
                }}
              >
                Select Action
              </Button>
            </Tooltip>
          )}
        </Box>
      </Stack>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuList>
          {[
            {
              value: 'published',
              label: 'Move Connection',
              icon: 'fluent:folder-move-16-filled',
              tooltip: 'Move to Connection',
            },
            // {
            //   value: 'draft',
            //   label: 'Enable Connection',
            //   icon: 'line-md:switch-off-filled-to-switch-filled-transition',
            //   tooltip: 'Click to enable connections',
            // },
            {
              value: 'published',
              label: 'Disable Connection',
              icon: 'line-md:switch-filled-to-switch-off-filled-transition',
              tooltip: 'Click to disable connections',
            },
            {
              value: 'draft',
              label: 'Delete Connection',
              icon: 'solar:trash-bin-trash-bold',
              tooltip: 'Click to delete connections',
              color: 'error.main', // New color property for the delete action
              isDelete: true, // Custom property to indicate this is the delete action
            },
          ].map((option) => (
            <React.Fragment key={option.value}>
              {/* Render Divider above the "Delete Connection" item */}
              {option.isDelete && <Divider sx={{ borderStyle: 'dashed' }} />}

              <Tooltip title={option.tooltip} arrow placement="left">
                <MenuItem
                  selected={option.value === publish}
                  onClick={() => {
                    handlePopoverClose();
                    onChangePublish(option.value);
                  }}
                  sx={{
                    color: option.label === 'Delete Connection' ? 'error.main' : 'inherit',
                  }}
                >
                  {option.icon && (
                    <Iconify
                      icon={option.icon}
                      width={20}
                      height={20}
                      sx={{
                        mr: 2,
                        color: option.label === 'Delete Connection' ? 'error.main' : 'inherit',
                      }}
                    />
                  )}
                  {option.label}
                </MenuItem>
              </Tooltip>
            </React.Fragment>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}
