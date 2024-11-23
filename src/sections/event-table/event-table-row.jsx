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
import {
  Divider,
  Tooltip,
  useTheme,
  Typography,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { EventsDrawer } from '../drawer/event-drawer';

const generateRandomData = () => {
  const names = [
    'Rajpal Singh Tomar',
    'Abhishek Nagar',
    'Ankit Mandli',
    'Ayush Bisen',
    'Nikhil Patel',
  ];

  const statuses = ['success', 'rejected'];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  // Generate a random date
  const randomDate = new Date(Date.now() - Math.random() * 10000000000).toISOString();

  // Generate a random Event ID
  const randomRequestId = `req_66fe${Math.random().toString(36).substring(2, 36)}`;

  // Generate a random Event ID
  const randomEventId = `evt_66fe${Math.random().toString(36).substring(2, 36)}`;

  return {
    EventName: randomName,
    Eventdate: randomDate,
    status: randomStatus,
    EventId: randomEventId,
    RequestId: randomRequestId,
  };
};

// Date formatting function
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24-hour format
  };
  const date = new Date(dateString);
  return date.toLocaleString('en-US', options).replace(',', '');
};

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  // State to hold random data
  const [randomData, setRandomData] = useState({});

  // Generate random data on component mount
  useEffect(() => {
    setRandomData(generateRandomData());
  }, []); // Empty dependency array ensures it runs once on mount

  const { EventName, Eventdate, EventId, RequestId } = randomData; // Destructure the new ID

  const confirm = useBoolean();
  const popover = usePopover();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Determine attempt count based on status
  const attemptCount =
    row.status === 'success'
      ? 1
      : row.status === 'rejected'
        ? 2
        : row.status === 'scheduled'
          ? 3
          : 0;

  // Determine button color based on status
  const buttonColor =
    row.status === 'success' ? 'success' : row.status === 'rejected' ? 'error' : 'info';

  // Tooltip text for the attempt button
  const attemptTooltip = `This is attempt number ${attemptCount} for a ${row.status} event.`;

  const renderPrimary = (
    <TableRow
      hover
      selected={selected}
      sx={{
        '&:hover .copy-button': {
          opacity: 1,
        },
      }}
    >
      <TableCell padding="checkbox">
        <Tooltip arrow placement="top" title="Select">
          {' '}
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
            <Tooltip
              title={
                row.status === 'success'
                  ? 'This is an successful event'
                  : row.status === 'rejected'
                    ? 'This event is rejected'
                    : row.status === 'scheduled'
                      ? 'This event is scheduled'
                      : ''
              }
              arrow
              disableInteractive
              placement="top"
              disableHoverListener={
                row.status !== 'success' && row.status !== 'rejected' && row.status !== 'scheduled'
              }
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
            <Box component="span">
              <Tooltip title={`Event Name: ${EventName}`} arrow placement="top">
                {EventName}
              </Tooltip>
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              <Tooltip
                title={
                  <div style={{ textAlign: 'center' }}>
                    {`Event created: ${formatDate(Eventdate)} (UTC+00:00) America/Danmarkshavn`}
                  </div>
                }
                arrow
                placement="top"
              >
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
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={handleOpenDrawer}
            >
              <Tooltip title={`Request ID: ${RequestId}`} disableInteractive arrow placement="top">
                <Typography fontSize={14} color="#078dee">
                  {RequestId}
                </Typography>
              </Tooltip>
              <Tooltip title="Copy request_id " disableInteractive arrow placement="bottom">
                <IconButton
                  className="copy-button"
                  color={popover.open ? 'inherit' : 'default'}
                  sx={{
                    width: '20px',
                    height: '20px',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    right: 0,
                  }}
                  onClick={() => navigator.clipboard.writeText(RequestId)}
                >
                  <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: -0.3 }}>
              <Tooltip title={`Event ID: ${EventId}`} disableInteractive arrow placement="top">
                <Typography fontSize={14} color="#919eab">
                  {EventId}
                </Typography>
              </Tooltip>
              <Tooltip title="Copy event_id" disableInteractive arrow placement="bottom">
                <IconButton
                  className="copy-button"
                  color={popover.open ? 'inherit' : 'default'}
                  sx={{
                    width: '20px',
                    height: '20px',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    right: 0,
                  }}
                  onClick={() => navigator.clipboard.writeText(EventId)}
                >
                  <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title={attemptTooltip} disableInteractive arrow placement="top">
          <Label
            // variant="soft"
            color={buttonColor}
            // size='medium'
            // onClick={handleOpenDrawer}
            // sx={{ mr: 1, cursor: 'pointer' }} // Add margin-right to the button
          >
            Attempt {attemptCount}
          </Label>
        </Tooltip>
      </TableCell>
      <TableCell align="right" padding="checkbox">
        <IconButton
          sx={{ mr: 1 }}
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
              onViewRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

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

      {/* Event Drawer */}
      <EventsDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        row={row}
        EventName={EventName}
        EventId={EventId}
        Eventdate={Eventdate}
      />
    </>
  );
}
