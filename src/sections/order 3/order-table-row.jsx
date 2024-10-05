import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Tooltip, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

// import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { FullScreenDialog } from '../dialog-view/full-screen-dialog';

const generateRandomData = () => {
  const names = ['Rajpal Singh Tomar', 'Abhishek Nagar', 'Ankit Mandli', 'Ayush Bisen', 'Nikhil Patel'];

  const statuses = ['Accepted', 'Blocked'];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  // Generate a random date
  const randomDate = new Date(Date.now() - Math.random() * 10000000000).toISOString();

  // Generate a random Transformation ID
  const randomRequestId = `req_66fe${Math.random().toString(36).substring(2, 36)}`;

  return {
    EventName: randomName,
    Eventdate: randomDate,
    status: randomStatus,
    EventId: randomRequestId, // Add the random ID to the returned object
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
  // List of items to copy
  const copyItems = [
    { id: 1, text: 'req_66c87b54a2b7dc2c1740d639', label: 'req_66c87b54a2b7dc2c1740d639' },
  ];

  const evtItems = [
    { id: 1, text: 'evt_66c87b54a2b7dc2c1740d639', label: 'evt_66c87b54a2b7dc2c1740d639' },
  ];
  const handleCopy = (text) => { };

    // State to hold random data
    const [randomData, setRandomData] = useState({});

    // Generate random data on component mount
    useEffect(() => {
      setRandomData(generateRandomData());
    }, []); // Empty dependency array ensures it runs once on mount
  
    const { EventName, Eventdate, EventId } = randomData; // Destructure the new ID

  const confirm = useBoolean();
  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Tooltip arrow placement="top" title="Select">  <Checkbox
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
                row.status === 'success'
                  ? 'This is a successful event'
                  : row.status === 'rejected'
                    ? 'This event was rejected'
                    : row.status === 'scheduled'
                      ? 'This event is scheduled'
                      : ''
              }
              arrow
              placement='top'
              disableHoverListener={row.status !== 'success' && row.status !== 'rejected'}
            >
              <Label
                variant="soft"
                color={
                  (row.status === 'success' && 'success') ||
                  (row.status === 'rejected' && 'error') ||
                  (row.status === 'scheduled' && 'info') ||
                  'default'
                }
              >
                {row.status}
              </Label>

            </Tooltip>
            <Box component="span"><Tooltip title={`Event Name: ${EventName}`} arrow placement='top'>
              {EventName}
            </Tooltip></Box>
            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
            />
            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
            >
              <Tooltip title={`Event date: ${formatDate(Eventdate)}`} arrow placement='top'>
                {formatDate(Eventdate)}
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
            {copyItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>

                <Tooltip title="Request ID" arrow placement='top'>
                  <Typography fontSize={14} color="#1c252e">
                    {item.label}
                  </Typography>
                </Tooltip>
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
            ))}
            {evtItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mt: -0.3 }}>
                <Tooltip title="Event ID" arrow placement='top'>
                  <Typography fontSize={12} color="#919eab">
                    {item.label}
                  </Typography>
                </Tooltip>
                <Tooltip title="Copy event_id" arrow placement="bottom">
                  <IconButton
                    edge="end"
                    sx={{ color: 'text.disabled' }}
                    onClick={() => navigator.clipboard.writeText('evt_66c87b54a2b7dc2c1740d639')}
                  >
                    <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <FullScreenDialog />
        <IconButton
          sx={{ mt: -0.2 }}
          color={popover.open ? 'inherit' : 'default'}
          onClick={popover.onOpen}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
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
    </>
  );
}
