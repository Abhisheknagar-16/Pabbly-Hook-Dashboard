import dayjs from 'dayjs';
import {useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
import { Tooltip, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function OrderTableToolbar({ filters, onResetPage, dateError }) {
  const popover = usePopover();
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));

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

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ endDate: newValue });
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
  spacing={2}  // Adjust spacing between elements
  sx={{ width: '100%' }}  // Ensures the stack takes full width
>
  <Typography fontSize={18} fontWeight={700} lineHeight={2} >
  <Tooltip  title="List of all issue ID's and there status." arrow placement="top">
    Issues
    </Tooltip>
  </Typography>

  <Stack direction="row" alignItems="center" spacing={2}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Start Date"
        value={startDate}
        minDate={dayjs('2017-01-01')}
        onChange={(newValue) => setStartDate(newValue)}
        slotProps={{ textField: { fullWidth: false } }}
        sx={{ width: '191px' }}  // Custom width for Start Date
      />
    </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="End Date"
        value={endDate}
        minDate={dayjs('2017-01-01')}
        onChange={(newValue) => setEndDate(newValue)}
        slotProps={{ textField: { fullWidth: false } }}
        sx={{ width: '191px' }}  // Custom width for End Date
      />
    </LocalizationProvider>

    <Tooltip title="Click here to search by issue name or ID's." arrow placement="top">
      <TextField
        sx={{ width: '394px', mr: '7.5px' }}  // Custom width for TextField
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
  </Stack>

  {/* Uncomment and use if you want to add the filter icon button */}
  {/* <IconButton
    onClick={popover.onOpen}
    sx={{
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
    <Iconify icon="solar:filter-bold" sx={{ color: 'black' }} />
    <Typography sx={{ color: 'black', fontSize: '13px', ml: 1, fontWeight: '400' }}>
      Filter
    </Typography>
  </IconButton> */}
</Stack>

      </Stack>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:printer-minimalistic-bold" />
            Print
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:import-bold" />
            Import
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:export-bold" />
            Export
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
