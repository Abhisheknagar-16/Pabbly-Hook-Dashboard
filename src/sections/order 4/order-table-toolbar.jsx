// import dayjs from 'dayjs';
import * as React from 'react';
import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Box,Grid, Button, Tooltip,FormLabel,IconButton, Typography,FormControl, } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { formHelperTextClasses } from '@mui/material/FormHelperText';

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
    label: 'Active',
  },
  {
    value: 'tUR',
    label: 'Inactive',
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
    spacing={2}
    sx={{ width: '100%' }}
  >
    <Typography variant="h6" fontWeight={700} lineHeight={2}>
      <Tooltip title="List of all issue ID's and their status." arrow placement="top">
        Issues
      </Tooltip>
    </Typography>

    <Stack direction="row" alignItems="center" spacing={2}>
      <Tooltip title="Click here to search by issue name or ID's." arrow placement="top">
        <TextField
         sx={{
          width: { xs: '100%', sm: '300px', md: '394px' },  // Responsive width for TextField
        }}
          value={filters.state.name}
          onChange={handleFilterName}
          placeholder="Search your issue name or ID's"
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
        <Tooltip placement="top" arrow title="Filter Issue by status or name.">
          <IconButton
            onClick={popover.onOpen}
            sx={{
              mt: 0.9,
              position: 'relative',
              '&:hover': {
                backgroundColor: 'transparent',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 2,
                  left: 0,
                  width: '100%',
                  height: '80%',
                  backgroundColor: '#919eab14',
                  borderRadius: '5px',
                  zIndex: -1,
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
              <Grid item xs={12} sx={{mb:2}}>
                <h3 style={{ padding: 5, margin: 0 }}>Filter Issues</h3>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ ml: 2.4, fontSize: 16, mt: 1 }}>Issue Name</FormLabel>
                    <FormLabel sx={{ ml: 2.4, fontSize: 16, mt: 3 }}>Issue ID</FormLabel>
                    <FormLabel sx={{ ml: 2.4, fontSize: 16, mt: 2.5 }}>Issue Folder</FormLabel>
                    {/* <FormLabel sx={{ ml: 3, fontSize: 16, mt: 3 }}>Status</FormLabel> */}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Grid container spacing={1} direction="column">
                    {['Equal to', 'Equal to', 'In'].map((label, index) => (
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
                    <Grid item xs={12}>
                      {/* <Stack direction="column" spacing={1} flexGrow={1} sx={{ width: '100%' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label=""
                            value={startDate}
                            minDate={dayjs('2017-01-01')}
                            onChange={(newValue) => setStartDate(newValue)}
                            slotProps={{ textField: { fullWidth: true } }}
                          />
                        </LocalizationProvider>
                      </Stack> */}
                    </Grid>

                    <Grid item xs={8} sx={{mt:-1,ml:2}}>
                    <TextField
                    id="outlined-select-numbers"
                    size='small'
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
                    </Grid>

                    <Grid item xs={12} ml={2}>
                    <TextField
                    size='small'
                    autoFocus
                    fullWidth
                    variant="outlined"
                    placeholder='Home'
                   // label="Connection Name"
                   />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end',mb:1,mt:1 }}>
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
