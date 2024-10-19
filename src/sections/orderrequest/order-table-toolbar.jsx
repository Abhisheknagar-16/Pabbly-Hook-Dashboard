import * as React from 'react';
import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Grid, Button, Tooltip, FormLabel, Typography, FormControl } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const Strategy = [
  {
    value: 'USD',
    label: 'Select Connection',
  },
  {
    value: 'EUR',
    label: 'Test 1',
  },
  {
    value: 'FUR',
    label: 'Test 2',
  },
  {
    value: 'DUR',
    label: 'Test 3',
  },
  {
    value: 'INR',
    label: 'Test 4',
  },
];

const selectfolder = [
  {
    value: 'USD',
    label: 'Select Folder',
  },
  {
    value: 'EUR',
    label: 'Home',
  },
  {
    value: 'tUR',
    label: 'test',
  },
];

export function OrderTableToolbar({ filters, onResetPage, dateError }) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleSubmit = () => {
    console.log('Form submitted!');
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2} // Adjust spacing between elements
          sx={{ width: '100%' }} // Ensures the stack takes full width
        >
          <Typography variant="h6" fontWeight={700} lineHeight={2}>
            <Tooltip title="List of all request ID's and there status." arrow placement="top">
              Request
            </Tooltip>
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip title="Click here to request by request name or ID's." arrow placement="top">
              <TextField
                sx={{
                  width: { xs: '100%', sm: '300px', md: '394px' }, // Responsive width for TextField
                }}
                value={filters.state.name}
                onChange={handleFilterName}
                placeholder="Search your request name or ID's"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Tooltip>

            <Stack>
              <Tooltip placement="top" arrow title="Filter request by status or name.">
                <Button size="small" onClick={popover.onOpen} sx={{ mr: 1.2 }}>
                  <Iconify icon="solar:filter-bold" sx={{ color: 'black' }} />
                  <Typography sx={{ variant: 'h6', fontWeight: '700', ml: 1, mr: 0.2 }}>
                    Filter
                  </Typography>
                </Button>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'bottom-top' } }}
      >
        {/* //////////////////////Custom filter popover////////////////////// */}
        <MenuList
          sx={{
            height: 'auto',
            width: {
              xs: '100%', // Full width for mobile screens
              sm: '100%', // Full width for tablet screens
              md: '762px', // Original width for larger screens
            },
          }}
        >
          <Box sx={{ padding: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight={700} ml={0.5}>
                  Filter Request
                </Typography>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ ml: 2.4, fontSize: 16, mt: 1 }}>Connection Name</FormLabel>
                    {/* <FormLabel sx={{ ml: 2.4, fontSize: 16, mt: 3 }}>Request ID</FormLabel> */}
                    <FormLabel sx={{ ml: 2.4, fontSize: 16, mt: 2.5 }}>Connection Folder</FormLabel>
                    {/* <FormLabel sx={{ ml: 3, fontSize: 16, mt: 3 }}>Status</FormLabel> */}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Grid container spacing={1} direction="column">
                    {['Equal to', 'In'].map((label, index) => (
                      <Grid item xs={12} key={index} ml={2}>
                        <FormControl fullWidth>
                          <Button
                            variant="outlined"
                            style={{ fontSize: '12.5px', padding: '8px 40px' }}
                          >
                            {label}
                          </Button>
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1} direction="column">
                    <Grid item xs={12} sm={6} sx={{ ml: 2 }}>
                      <TextField
                        id="outlined-select-numbers"
                        size="small"
                        select
                        fullWidth
                        defaultValue="USD"
                      >
                        {Strategy.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    {/* <Grid item xs={12} ml={2}>
                      <TextField
                        size='small'
                        id="outlined-select-numbers"
                        select
                        fullWidth
                        defaultValue="USD"
                      >
                        {Selectstatus.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid> */}

                    <Grid item xs={12} ml={2}>
                      <TextField
                        size="small"
                        id="outlined-select-numbers"
                        select
                        fullWidth
                        defaultValue="USD"
                      >
                        {selectfolder.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1, mt: 1 }}>
                <Button variant="contained" onClick={handleSubmit} size="small">
                  Apply Filter
                </Button>
              </Grid>
            </Grid>
          </Box>
        </MenuList>
      </CustomPopover>
    </>
  );
}
