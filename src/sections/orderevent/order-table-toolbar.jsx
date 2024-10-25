import dayjs from 'dayjs';
import * as React from 'react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Tooltip, FormLabel, Typography, InputAdornment } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
const Selectstatus = [
  {
    value: 'USD',
    label: 'Select Status',
  },
  {
    value: 'EUR',
    label: 'Success',
  },
  {
    value: 'mur',
    label: 'Rejected',
  },
  {
    value: 'Eup',
    label: 'Scheduled',
  },
];

export function OrderTableToolbar({ filters, onResetPage, dateError }) {
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [EventIdValue, setEventIdValue] = React.useState('');

  const handleEventIdChange = (event) => {
    setEventIdValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Form submitted!');
  };

  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

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
            <Tooltip title="List of all events ID's and there status." arrow placement="top">
              Event
            </Tooltip>
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip title="Click here to event by request name or ID's." arrow placement="top">
              <TextField
                sx={{
                  width: { xs: '100%', sm: '300px', md: '394px' }, // Responsive width for TextField
                }}
                value={filters.state.name}
                onChange={handleFilterName}
                placeholder="Search your event name or ID's"
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
            <Tooltip
                    title={
                      <div style={{ textAlign: 'center' }}>
                       Filter events by date, connection, request ID and folder.
                      </div>
                    }
                    arrow
                    placement="top">
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
                  Filter Events
                </Typography>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl>
                    <FormLabel sx={{ ml: 2.4, fontSize: 16, mt: 1 }}>Date Range</FormLabel>
                    <FormLabel sx={{ ml: 2.4, fontSize: 16, mt: 3 }}>Connection</FormLabel>
                    <FormLabel sx={{ ml: 2.4, fontSize: 16, mt: 3 }}>Request ID</FormLabel>
                    {/* <FormLabel sx={{ ml: 2.4, fontSize: 16, mt: 3 }}>Status</FormLabel> */}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Grid container spacing={1} direction="column">
                    {['Between', 'Equal to', 'Equal to'].map((label, index) => (
                      <Grid item xs={12} key={index} ml={2}>
                        <FormControl fullWidth>
                          <Button
                            variant="outlined"
                            style={{ fontSize: '14px', padding: '7.4px 40px' }}
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
                    <Grid item xs={12} ml={2}>
                      <Stack direction="row" spacing={2} flexGrow={1}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Start Date"
                            value={startDate}
                            minDate={dayjs('2017-01-01')}
                            onChange={(newValue) => setStartDate(newValue)}
                            slotProps={{
                              textField: {
                                // fullWidth: true,
                                sx: {
                                  height: '44px', // Adjust the height as desired
                                  '& .MuiInputBase-root': {
                                    height: '100%', // Ensures the inner input adjusts with the outer height
                                  },
                                  '& .MuiInputBase-input': {
                                    padding: '12px 14px', // Adjust padding to fit the new height
                                  },
                                },
                              },
                            }}
                          />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="End Date"
                            value={endDate}
                            minDate={dayjs('2017-01-01')}
                            onChange={(newValue) => setEndDate(newValue)}
                            slotProps={{
                              textField: {
                                // fullWidth: true,
                                sx: {
                                  height: '44px', // Adjust the height as desired
                                  '& .MuiInputBase-root': {
                                    height: '100%', // Ensures the inner input adjusts with the outer height
                                  },
                                  '& .MuiInputBase-input': {
                                    padding: '12px 14px', // Adjust padding to fit the new height
                                  },
                                },
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Grid>

                    <Grid item xs={8} ml={2}>
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

                    <Grid item xs={12} ml={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Request ID"
                        value={EventIdValue}
                        onChange={handleEventIdChange}
                      />
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
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
