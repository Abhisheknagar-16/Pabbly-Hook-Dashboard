import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import {
  Alert,
  Tooltip,
  useTheme,
  Snackbar,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { RequestDrawer } from '../drawer/request-drawer';

const generateRandomData = () => {
  const names = [
    'Rajpal Singh Tomar',
    'Abhishek Nagar',
    'Ankit Mandli',
    'Ayush Bisen',
    'Nikhil Patel',
  ];

  const statuses = ['Accepted', 'Blocked'];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  // Generate a random date
  const randomDate = new Date(Date.now() - Math.random() * 10000000000).toISOString();

  // Generate a random Request ID
  const randomRequestId = `req_66fe${Math.random().toString(36).substring(2, 36)}`;

  return {
    RequestName: randomName,
    Requestdate: randomDate,
    status: randomStatus,
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

  const { RequestName, Requestdate, RequestId } = randomData; // Destructure the new ID

  // const handleOpenSnackbar = () => {
  //   setOpenSnackbar(true);
  // };

  // const handleCloseSnackbar = () => {
  //   setOpenSnackbar(false);
  // };
  const evtItems = [
    { id: 1, label: '(request,context) =>' },

    // Add more items as needed
  ];
  // Function to copy text to clipboard
  const handleCopy = (text) => {};
  const confirm = useBoolean();
  const popover = usePopover();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const [openCopySnackbar, setOpenCopySnackbar] = React.useState(false);

  const handleOpenCopySnackbar = () => {
    setOpenCopySnackbar(true);
  };

  const handleCloseCopySnackbar = () => {
    setOpenCopySnackbar(false);
  };

  // const [openCopyCodeSnackbar, setOpenCopyCodeSnackbar] = React.useState(false);

  // const handleOpenCopyCodeSnackbar = () => {
  //   setOpenCopyCodeSnackbar(true);
  // };

  // const handleCloseCopyCodeSnackbar = () => {
  //   setOpenCopyCodeSnackbar(false);
  // };

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
                row.status === 'Accepted'
                  ? 'This is an accepted request'
                  : row.status === 'Blocked'
                    ? 'This request is blocked'
                    : ''
              }
              arrow
              placement="top"
              disableHoverListener={row.status !== 'Accepted' && row.status !== 'Blocked'}
              disableInteractive
            >
              <Label
                size="small"
                variant="soft"
                color={
                  (row.status === 'Accepted' && 'success') ||
                  (row.status === 'Blocked' && 'error') ||
                  'default'
                }
              >
                {row.status}
              </Label>
            </Tooltip>
            {/* <Box component="span">
              <Tooltip
                title={`Request Name: ${RequestName}`}
                disableInteractive
                arrow
                placement="top"
              >
                {RequestName}
              </Tooltip>
            </Box> */}
            <Box component="span" sx={{ color: 'text.disabled' }}>
              <Tooltip
                title={
                  <div style={{ textAlign: 'center' }}>
                    {`Request created: ${formatDate(Requestdate)} (UTC+00:00) America/Danmarkshavn`}
                  </div>
                }
                disableInteractive
                arrow
                placement="top"
              >
                {formatDate(Requestdate)}
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
              <Tooltip
                title={`Request Name: ${RequestName}`}
                disableInteractive
                arrow
                placement="top"
              >
                {RequestName}
              </Tooltip>
            </Box>
            <Box component="span" sx={{ color: 'text.disabled' }} />
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack spacing={2} direction="row" alignItems="right">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-end',
            }}
          >
            <Box
              component="span"
              onClick={handleOpenDrawer}
              sx={{ color: '#078dee', cursor: 'pointer' }}
            >
              <Tooltip title={`Request ID: ${RequestId}`} disableInteractive arrow placement="top">
                {RequestId}
              </Tooltip>
              {/* <Tooltip title="Copy request_id" arrow placement="bottom">
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
                  onClick={() => navigator.clipboard.writeText(RequestId)} // Use the random ID
                >
                  <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
                </IconButton>
              </Tooltip> */}
            </Box>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell padding="checkbox">
        <Tooltip title="Copy request_id" arrow placement="bottom">
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
            onClick={() => {
              navigator.clipboard.writeText(RequestId); // Use the random ID
              handleOpenCopySnackbar();
            }}
          >
            <Iconify sx={{ mt: -0.2 }} width={14} icon="solar:copy-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
      <Snackbar
        open={openCopySnackbar}
        autoHideDuration={1000}
        onClose={handleCloseCopySnackbar}
        message="This is an error Alert."
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        // sx={{
        //   boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
        //   mt: 6.5,
        // }}
      >
        <Alert
          onClose={handleCloseCopySnackbar}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
            mt: 6.5,
          }}
        >
          Request id copied successfully.
        </Alert>
      </Snackbar>
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
      {/* request drawer which is on click to open the drawer */}
      <RequestDrawer open={drawerOpen} onClose={handleCloseDrawer} row={row} RequestName={RequestName} RequestId={RequestId} Requestdate={Requestdate}/>
    </>
  );
}
