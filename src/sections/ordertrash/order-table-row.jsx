import React, { useState,useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

import { useBoolean } from 'src/hooks/use-boolean';

// import { fDate, fTime } from 'src/utils/format-time';

import { Tooltip, Divider, IconButton, Typography } from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// Random data generator
const generateRandomData = () => {
  const names = ['Rajpal Singh Tomar', 'Ankit Kumar', 'Priya Sharma', 'Amit Verma', 'Sneha Gupta'];
  const statuses = ['Inactive'];
  
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Generate a random date
  const randomDate = new Date(Date.now() - Math.random() * 10000000000).toISOString();
  
  return {
    connectionName: randomName,
    status: randomStatus,
    connectionDate: randomDate,
    requests: Math.floor(Math.random() * 10),
    events: Math.floor(Math.random() * 10),
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
  
  const { connectionName, status, connectionDate, requests, events } = randomData;

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
      <Tooltip title="Select" arrow placement='top'>
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
      <Tooltip placement='top' arrow title={row.status === 'Active' ? 'Connection is Active' : 'Connection is Inactive'}>
        <Label
          variant="soft"
          color={
            // (row.status === 'Active' && 'success') ||
            (row.status === 'Inactive' && 'error') ||
            'default'
          }
        >
          {row.status}
        </Label>
      </Tooltip>
      <Box
        component="span"
        sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
      >
      <Tooltip title={`Connection Date: ${formatDate(connectionDate)}`} arrow placement='top'>
         {formatDate(connectionDate)}
      </Tooltip>
      </Box>
    </Stack>
  </Stack>
</TableCell>

      <TableCell>
        <Stack spacing={3} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">
              <a
                style={{ textDecoration: 'none', color: '#078dee' }}
                href="http://localhost:3030/dashboard/"
              >
              <Tooltip title={`Connection Name: ${connectionName}`} arrow placement='top'>
                  {connectionName}
              </Tooltip>
              </a>
            </Box>
            <Typography sx={{ color: ' #919eab ', fontSize: '14px' }}>
            <Tooltip title="Folder Name: Trash" arrow placement='top'>
            Trash
            </Tooltip>
            </Typography>
            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
            />

          </Stack>
        </Stack>
      </TableCell>

      <TableCell/>


      <TableCell>
        <Stack spacing={1} direction="row" alignItems="left" >
          <Stack

            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-end',
              mr:4
            }}
          >
            <Box component="span">
              <a
                style={{ textDecoration: 'none', color: '#078dee' }}
                href=" dashboard/four"
              >
              <Tooltip title="Status of the requests" arrow placement='top'>
                  {requests} Requests
                </Tooltip>
              </a>
            </Box>

            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '14px', fontWeight: 400 }}
            >
              <a
                style={{ textDecoration: 'none', color: '#919eab' }}
                href="http://localhost:3030/dashboard/five"
              >
              <Tooltip title="Status of the events" arrow placement='top'>
                  {events} events
                </Tooltip>
              </a>
            </Box>


          </Stack>

          <Stack spacing={2} direction="row"  alignItems="right">
          <Stack>
            <IconButton
              sx={{ mt: 0.5,mr:-1}}
              color={popover.open ? 'inherit' : 'default'}
              onClick={popover.onOpen}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
            </Stack>
          </Stack>
        </Stack>
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
        <MenuList >
          <MenuItem>
            <Iconify icon="mingcute:history-fill" />
            Update
          </MenuItem>
          <MenuItem>
            <Iconify icon="clarity:clone-solid" />
            Clone
          </MenuItem>
          <MenuItem>
            <Iconify icon="solar:move-to-folder-bold" />
            Move To Folder
          </MenuItem>
          <MenuItem>
            <Iconify icon="material-symbols:family-history" />
            Connection History
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed'}} />
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete Connection
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
  )
}