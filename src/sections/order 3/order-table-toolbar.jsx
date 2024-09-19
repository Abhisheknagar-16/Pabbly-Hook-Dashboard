import dayjs from 'dayjs';
import * as React from 'react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { Tooltip, FormLabel, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
// ----------------------------------------------------------------------
const filterStatusOptions = [
  { value: 'success', label: 'Success' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Scheduled', label: 'Scheduled' },
];

export function OrderTableToolbar({ filters, onResetPage, dateError }) {
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [selectedFilter, setSelectedFilter] = React.useState('equals_to');
  const [selectedStatusFilter, setSelectedStatusFilter] = React.useState('all');
  const [connectionValue, setConnectionValue] = React.useState('');
  const [requestIdValue, setRequestIdValue] = React.useState('');
  const [EventIdValue, setEventIdValue] = React.useState('');

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatusFilter(event.target.value);
  };

  const handleConnectionChange = (event) => {
    setConnectionValue(event.target.value);
  };

  const handleRequestIdChange = (event) => {
    setRequestIdValue(event.target.value);
  };

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
          direction={{ xs: 'column', md: 'row' }}
          spacing={1}
          flexGrow={1}
          sx={{ width: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography>
            <Tooltip arrow title="List of all event requests and their status." placement="top">
              <b>Events</b>
            </Tooltip>
          </Typography>

          {/* Stack for Filters and Search */}
          {/* <Stack ml={{ xs: 0, md: 'auto' }} direction="row" alignItems="center" spacing={1} flexWrap="wrap">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDate}
                minDate={dayjs('2017-01-01')}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { fullWidth: false } }}
                sx={{ width: { xs: '100%', sm: '191px' }, mb: { xs: 2, md: 0 } }} // Responsive width
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={endDate}
                minDate={dayjs('2017-01-01')}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { fullWidth: false } }}
                sx={{ width: { xs: '100%', sm: '191px' }, mb: { xs: 2, md: 0 } }} // Responsive width
              />
            </LocalizationProvider>

            <Tooltip title="Click here to search by event name or ID's." arrow placement="top">
              <TextField
                sx={{ width: { xs: '100%', sm: '384px' }, mr: { xs: 0, md: '7.5px' }, mb: { xs: 2, md: 0 } }} // Responsive width
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
          </Stack> */}

          {/* Filter Button */}
          <Stack>
            <Tooltip placement="top" arrow title="Filter requests by status or name.">
              <IconButton
                onClick={popover.onOpen}
                sx={{
                  mt: 0.9,
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'transparent', // Ensures there's no background ellipse
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 2,
                      left: 0,
                      width: '100%',
                      height: '80%',
                      backgroundColor: '#919eab14', // Square background on hover
                      borderRadius: '5px', // Ensures the shape is square, not rounded
                      zIndex: -1, // Places the background behind the content
                    },
                  },
                }}
              >
                <Iconify icon="solar:filter-bold" sx={{ mt: -0.4, color: 'black' }} />
                <Typography sx={{ color: 'black', fontWeight: '700', ml: 1, mt: -0.4 }}>
                  Filter
                </Typography>
              </IconButton>
            </Tooltip>
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
        <MenuList sx={{ height: 'auto', width: 'auto' }}>
          <Box sx={{ padding: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h4 style={{ padding: 5, margin: 0 }}>Filter Events</h4>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ ml: 3, fontSize: 16, mt: 1 }}>Date Range</FormLabel>
                    <FormLabel sx={{ ml: 3, fontSize: 16, mt: 3 }}>Connection</FormLabel>
                    <FormLabel sx={{ ml: 3, fontSize: 16, mt: 3 }}>Request ID</FormLabel>
                    <FormLabel sx={{ ml: 3, fontSize: 16, mt: 3 }}>Status</FormLabel>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Grid container spacing={1} direction="column">
                    {['Between', 'Equal to', 'Equal to', 'Equal to'].map((label, index) => (
                      <Grid item xs={12} key={index}>
                        <FormControl fullWidth>
                          <Button
                            variant="outlined"
                            style={{ fontSize: '14px', padding: '8px 40px' }}
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
                    <Grid item xs={12}>
                      <Stack direction="column" spacing={1} flexGrow={1} sx={{ width: '100%' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label=""
                            value={startDate}
                            minDate={dayjs('2017-01-01')}
                            onChange={(newValue) => setStartDate(newValue)}
                            slotProps={{ textField: { fullWidth: true } }}
                          />
                        </LocalizationProvider>
                      </Stack>
                    </Grid>

                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        label="Request ID"
                        value={requestIdValue}
                        onChange={handleRequestIdChange}

                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Event ID"
                        value={EventIdValue}
                        onChange={handleEventIdChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Select
                          value={selectedStatusFilter}
                          onChange={handleStatusChange}
                        >
                          {filterStatusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', }}>
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
