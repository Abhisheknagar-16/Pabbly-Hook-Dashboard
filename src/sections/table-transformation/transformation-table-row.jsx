import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import { Alert, Tooltip, Divider, Snackbar, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';


// Random data generator
const generateRandomData = () => {
  const names = [
    'Transformation name to the pabbly connect',
    'Pabbly Chatflow Transformation',
    'Transform request payload',
    'Transform request headers',
    'Transform request query',
  ];
  const statuses = ['In Use', 'Idle'];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomRequestId = `trs_ux0g${Math.random().toString(36).substring(2, 36)}`;

  // Generate a random date
  const randomDate = new Date(Date.now() - Math.random() * 10000000000).toISOString();

  return {
    connectionName: randomName,
    status: randomStatus,
    connectionDate: randomDate,
    requests: Math.floor(Math.random() * 10),
    events: Math.floor(Math.random() * 10),
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
  const confirm = useBoolean();
  const popover = usePopover();

  const [openEnabelConnectionSnackbar, setEnabelConnectionSnackbar] = React.useState(false);

  const handleOpenEnableConnnectonSnackbar = () => {
    setEnabelConnectionSnackbar(true);
  };

  const handleCloseEnableConnnectonSnackbar = () => {
    setEnabelConnectionSnackbar(false);
  };

  const [openDisabelConnectionSnackbar, setDisabelConnectionSnackbar] = React.useState(false);

  const handleOpenDisabelConnnectonSnackbar = () => {
    setDisabelConnectionSnackbar(true);
  };

  const handleCloseDisabelConnnectonSnackbar = () => {
    setDisabelConnectionSnackbar(false);
  };

  const theme = useTheme();

  const [moveToFolderPopoverOpen, setMoveToFolderPopoverOpen] = useState(false);

  // State to hold random data
  const [randomData, setRandomData] = useState({});

  // Generate random data on component mount
  useEffect(() => {
    setRandomData(generateRandomData());
  }, []); // Empty dependency array ensures it runs once on mount

  const { connectionName, status, connectionDate, RequestId, events } = randomData;

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Tooltip disableInteractive title="Select" arrow placement="top">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </Tooltip>
      </TableCell>

      <TableCell>
        <Stack spacing={1} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              placement="top"
              disableInteractive
              arrow
              title={status === 'In Use' ? 'Transformation is In Use' : 'Transformation is Idle'}
            >
              <Label
                variant="soft"
                color={
                  (status === 'In Use' && 'success') || (status === 'Idle' && 'error') || 'default'
                }
              >
                {status}
              </Label>
            </Tooltip>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              <Tooltip
                disableInteractive
                title={
                  <div style={{ textAlign: 'center' }}>
                    {`Transformation created: ${formatDate(connectionDate)}(UTC+00:00) America/Danmarkshavn`}
                  </div>
                }
                arrow
                placement="top"
              >
                {formatDate(connectionDate)}
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack spacing={1} direction="row" alignItems="center">
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
                // href={paths.dashboard.updateconnection}
              >
                <Tooltip
                  disableInteractive
                  title={`Transformation Name: ${connectionName}`}
                  arrow
                  placement="top"
                >
                  {connectionName}
                </Tooltip>
              </a>
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }} />
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack spacing={1} direction="row" alignItems="center">
          <Box component="span">
            <Tooltip title={`Request ID: ${RequestId}`} disableInteractive arrow placement="top">
              {RequestId}
            </Tooltip>
            <Tooltip title="Copy request_id" arrow placement="bottom">
              <IconButton
                edge="end"
                sx={{ color: 'text.disabled' }}
                onClick={() => navigator.clipboard.writeText(RequestId)} // Use the random ID
              >
                <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack spacing={1} direction="row" alignItems="right">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-end',
              // mr: 4
            }}
          >
            <Box component="span">
              <a style={{ textDecoration: 'none', color: '#078dee' }}>
                <Tooltip disableInteractive title="Status of the requests" arrow placement="top">
                  0
                </Tooltip>
              </a>
            </Box>

            {/* <Box component="span" sx={{ color: 'text.disabled' }}>
              <a style={{ textDecoration: 'none', color: '#919eab' }} href={paths.dashboard.event}>
                <Tooltip disableInteractive title="Status of the events" arrow placement="top">
                  {events} events
                </Tooltip>
              </a>
            </Box> */}
          </Stack>
        </Stack>
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
          <Tooltip title="Click to enable transformation." arrow placement="left">
            <MenuItem onClick={handleOpenEnableConnnectonSnackbar}>
              <Iconify icon="line-md:switch-off-filled-to-switch-filled-transition" />
              Enable
            </MenuItem>
          </Tooltip>
          <Tooltip title="Click to disable transformation." arrow placement="left">
            <MenuItem onClick={handleOpenDisabelConnnectonSnackbar}>
              <Iconify icon="line-md:switch-filled-to-switch-off-filled-transition" />
              Disable
            </MenuItem>
          </Tooltip>
          {/* <Tooltip title="Move to update." arrow placement="left">
            <MenuItem>
              <Iconify icon="mingcute:history-fill" />
              Update
            </MenuItem>
          </Tooltip> */}
          {/* <Tooltip title="Move to folder." arrow placement="left">
            <MenuItem
              onClick={() => {
                setMoveToFolderPopoverOpen(true); // Open the Auto Re-Execution dialog
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="fluent:folder-move-16-filled" />
              Move To Folder
            </MenuItem>
          </Tooltip> */}
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Tooltip title="Click to delete transformation." arrow placement="left">
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
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <Snackbar
        open={openEnabelConnectionSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseEnableConnnectonSnackbar}
        Z-index={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 6.5,
        }}
      >
        <Alert
          onClose={handleCloseEnableConnnectonSnackbar}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Transformation enable successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDisabelConnectionSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseDisabelConnnectonSnackbar}
        Z-index={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 6.5,
        }}
      >
        <Alert
          onClose={handleCloseDisabelConnnectonSnackbar}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Transformation disabled successfully.
        </Alert>
      </Snackbar>

      {/* <MoveToFolderPopover
        open={moveToFolderPopoverOpen}
        onClose={() => setMoveToFolderPopoverOpen(false)}
      /> */}
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
