import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  Button,
  Tooltip,
  Popover,
  Typography,
  FormControl,
  Autocomplete,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------.

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

  const TransformationName = [
    'Transformation name to the pabbly connect',
    'Transform request payload',
    'Transform request headers',
    'Pabbly chatflow transformation',
    'Transform request query',
  ];
  const transformationstatus = ['All Status', 'In Use', 'Idle'];
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

  const handlePopoverClose = () => setAnchorEl(null);

  const handleFilterClose = () => setFilterAnchorEl(null);

  const [isFilterApplied, setFilterApplied] = useState(false); // Local filter state

  const handleFilterIconClick = (e) => {
    e.stopPropagation();
    if (isFilterApplied) {
      handleFilterClose();
      setFilterApplied(false);
    }
  };

  const handleFilterButtonClick = (e) => {
    if (!isFilterApplied || e.target.tagName !== 'svg') {
      setFilterAnchorEl(e.currentTarget);
    }
  };

  const handleApplyFilter = () => {
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
    setFilterApplied(true);
  };

  const handleFilterName = (event) => {
    onResetPage(); // Reset the page to page 1 when filtering
    filters.setState({ name: event.target.value }); // Set the name filter based on the search input
  };

  const buttonStyle = {
    fontSize: '15px',
    height: '48px',
    textTransform: 'none',
    // padding: '0 16px',
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
          <Tooltip
            title={
              <div style={{ textAlign: 'center' }}>
                Click here to search by transformation name or ID&apos;s.
              </div>
            }
            arrow
            placement="top"
            disableInteractive
          >
            <TextField
              fullWidth
              value={filters.state.name}
              onChange={handleFilterName} // Handle changes for search input
              placeholder="Search your transformation name or ID's..."
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
          <Tooltip title="Filter transformation by status or folders." arrow placement="top">
            <Button
              sx={{
                ...buttonStyle,
                width: isBelow600px ? '158px' : '158px',
                p: isBelow600px ? '0px 8px 0px 8px' : '16px',
                position: 'relative',
                '& .MuiButton-startIcon': {
                  pointerEvents: 'auto',
                  marginRight: '8px',
                  display: 'flex',
                },
              }}
              startIcon={!isFilterApplied && <Iconify icon="mdi:filter" />}
              endIcon={
                isFilterApplied && (
                  <Box
                    component="span"
                    onClick={handleFilterIconClick}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify
                      icon="uil:times"
                      style={{
                        width: 22,
                        height: 22,
                        cursor: 'pointer',
                      }}
                    />
                  </Box>
                )
              }
              onClick={handleFilterButtonClick}
            >
              {isFilterApplied ? 'Filter Applied' : 'Filters'}
            </Button>
          </Tooltip>
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
              value: 'draft',
              label: 'Delete transformation',
              icon: 'solar:trash-bin-trash-bold',
              tooltip: 'Click to delete ',
              color: 'error.main', // New color property for the delete action
              isDelete: true, // Custom property to indicate this is the delete action
            },
          ].map((option) => (
            <React.Fragment key={option.value}>

              <Tooltip title={option.tooltip} arrow placement="left">
                <MenuItem
                  selected={option.value === publish}
                  onClick={() => {
                    handlePopoverClose();
                    onChangePublish(option.value);
                  }}
                  sx={{
                    color: option.label === 'Delete transformation' ? 'error.main' : 'inherit',
                  }}
                >
                  {option.icon && (
                    <Iconify
                      icon={option.icon}
                      width={20}
                      height={20}
                      sx={{
                        mr: 2,
                        color: option.label === 'Delete ' ? 'error.main' : 'inherit',
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

      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '100%',
              md: 650,
            },
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
            },
          }}
        >
          {/* Filter Header */}
          <Box
            sx={{
              borderBottom: '1px dashed #919eab33',
              p: 2,
              display: 'flex',
              height: '100%',
              width: '100%',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: '600' }}>
                Filter Transformation
              </Typography>
            </Box>
            <Iconify
              icon="uil:times"
              onClick={handleFilterClose}
              style={{
                width: 20,
                height: 20,
                cursor: 'pointer',
                color: '#637381',
              }}
            />
          </Box>

          {/* Filter Options */}
          <Box
            sx={{
              p: '16px 16px 0px 16px',
              gap: 2,
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'column',
                  md: 'row',
                },
                gap: 2,
                mb: 2,
              }}
            >
              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Transformation Name
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
                <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  fullWidth
                  label="Equals to"
                  disabled
                  size="small"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
                <Autocomplete
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                  size="small"
                  options={TransformationName}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                  // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'column',
                  md: 'row',
                },
                gap: 2,
                mb: 2,
              }}
            >
              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Transformation ID
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
                <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  fullWidth
                  label="Equals to"
                  disabled
                  size="small"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
                <Autocomplete
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                  size="small"
                  options={transformationstatus}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                  // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>

            {/* Folder */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'column',
                  md: 'row',
                },
                gap: 2,
                mb: 2,
              }}
            >
              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Folder</Typography>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: { xs: 2, sm: 2, md: 0 },
                  width: { xs: '100%', sm: '100%', md: '390px' },
                }}
              >
                <TextField
                  id="select-currency-label-x"
                  variant="outlined"
                  fullWidth
                  label="In"
                  disabled
                  size="small"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
                <Autocomplete
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '14px',
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px',
                    },
                  }}
                  size="small"
                  options={folder}
                  renderInput={(params) => <TextField {...params} label="Select" />}
                  // sx={{ width: 300 }}
                />
              </FormControl>
            </Box>
          </Box>

          {/* Filter Footer */}
          <Box
            sx={{
              p: 2,
              gap: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px dashed #919eab33',
            }}
          >
            {/* <Button variant="outlined" color="inherit" onClick={handleFilterClose}>
              Cancel
            </Button> */}
            <Button variant="contained" color="primary" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
