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
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import {Tooltip, FormLabel, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------
const filterStatusOptions = [
  { value: 'Select Connection', label: 'Select Connection' },
  { value: 'Select Connection', label: 'Select Connection' },
  { value: 'Select Connection', label: 'Select Connection' },
  { value: 'Select Connection', label: 'Select Connection' },
  { value: 'Select Connection', label: 'Select Connection' },
  { value: 'Select Connection', label: 'Select Connection' },
  { value: 'Select Connection', label: 'Select Connection' },

];

export function OrderTableToolbar({ filters, onResetPage }) {
  const [selectedFilter, setSelectedFilter] = React.useState('equals_to');
  const [selectedStatusFilter, setSelectedStatusFilter] = React.useState('select connection');
  const [connectionValue, setConnectionValue] = React.useState('');
  const [requestIdValue, setRequestIdValue] = React.useState('');
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [EventIdValue, setEventIdValue] = React.useState('');
  const handleEventIdChange = (event) => {
    setEventIdValue(event.target.value);
  };

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

  const handleSubmit = () => {
    // Your form submission logic here
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
        sx={{ p: 2.5, pr: { xs: 2.5, md: 3 } }}
      >
        <Stack direction="row" mt={1} justifyContent="space-between" spacing={1} flexGrow={1} sx={{ width: 1 }}>
        <Tooltip title="Folder Name: Home" arrow placement='top'>
          <Typography mt={0.8}>
            <b> Home</b>
          </Typography>
          </Tooltip>

          <Tooltip title="Filter connection by status or folders." arrow placement='top'>
          <IconButton
            onClick={popover.onOpen}
            sx={{
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
            <Iconify icon="solar:filter-bold" sx={{ color: 'black' }} />
            <Typography sx={{ color: 'black', fontSize: '13px', fontWeight: '700', ml: 1, }}>
              Filter
            </Typography>
          </IconButton>
          </Tooltip>
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
                <h4 style={{ padding: 5, margin: 0 }}>Filter Home</h4>
              </Grid>

              <Grid container spacing={2}>
                {/* Left Side - Form Labels */}
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ ml: 3, fontSize: 16, mt: 1 }}>Connection Name </FormLabel>
                    <FormLabel sx={{ ml: 3, fontSize: 16, mt: 3 }}>Connection Status</FormLabel>
                    <FormLabel sx={{ ml: 3, fontSize: 16, mt: 3 }}>Folder</FormLabel>

                  </FormControl>
                </Grid>

                {/* Button Controls */}
                <Grid item xs={12} sm={3}>
                  <Grid container spacing={1} direction="column">
                    {['Equal to', 'Equal to', 'in'].map((label, index) => (
                      <Grid item xs={12} key={index}>
                        <FormControl fullWidth>
                          <Button
                            variant="outlined"
                            style={{
                              fontSize: '13px',
                              padding: '18px',
                              textAlign: 'right',  // Aligns text to the left
                              justifyContent: 'flex-start'  // Ensurealignment to the left within the button
                            }}
                          >
                            {label}
                          </Button>
                        </FormControl>
                      </Grid>
                    ))}

                  </Grid>
                </Grid>

                {/* Right Side - Form Controls */}
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1} direction="column">
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

              {/* Apply Filter Button */}
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
