import React from 'react';
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

// Date formatting function
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const date = new Date(dateString);
  return date.toLocaleString('en-US', options).replace(',', '');
};

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const popover = usePopover();
  const theme = useTheme();

  const [openEnabelTransformationSnackbar, setEnabelTransformationSnackbar] = React.useState(false);
  const [openDisabelTransformationSnackbar, setDisabelTransformationSnackbar] = React.useState(false);

  const handleOpenEnableTransformationSnackbar = () => {
    setEnabelTransformationSnackbar(true);
  };

  const handleCloseEnableTransformationSnackbar = () => {
    setEnabelTransformationSnackbar(false);
  };

  const handleOpenDisabelTransformationSnackbar = () => {
    setDisabelTransformationSnackbar(true);
  };

  const handleCloseDisabelTransformationSnackbar = () => {
    setDisabelTransformationSnackbar(false);
  };

  // Generate a consistent RequestId based on the row id
  const RequestId = `trs_${row.id.substring(0, 8)}`;

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
              title={row.status === 'In Use' ? 'Transformation is In Use' : 'Transformation is Idle'}
            >
              <Label
                variant="soft"
                color={
                  (row.status === 'In Use' && 'success') || 
                  (row.status === 'Idle' && 'error') || 
                  'default'
                }
              >
                {row.status}
              </Label>
            </Tooltip>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              <Tooltip
                disableInteractive
                title={
                  <div style={{ textAlign: 'center' }}>
                    {`Transformation created: ${formatDate(row.createdAt)}(UTC+00:00) America/Danmarkshavn`}
                  </div>
                }
                arrow
                placement="top"
              >
                {formatDate(row.createdAt)}
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
              <a style={{ textDecoration: 'none', color: '#078dee' }}>
                <Tooltip
                  disableInteractive
                  title={`Transformation Name: ${row.items[0].name}`}
                  arrow
                  placement="top"
                >
                  {row.items[0].name}
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
                onClick={() => navigator.clipboard.writeText(RequestId)}
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
            }}
          >
            <Box component="span">
              <a style={{ textDecoration: 'none', color: '#078dee' }}>
                <Tooltip disableInteractive title="Status of the requests" arrow placement="top">
                  {row.totalQuantity}
                </Tooltip>
              </a>
            </Box>
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
            <MenuItem onClick={handleOpenEnableTransformationSnackbar}>
              <Iconify icon="line-md:switch-off-filled-to-switch-filled-transition" />
              Enable
            </MenuItem>
          </Tooltip>
          <Tooltip title="Click to disable transformation." arrow placement="left">
            <MenuItem onClick={handleOpenDisabelTransformationSnackbar}>
              <Iconify icon="line-md:switch-filled-to-switch-off-filled-transition" />
              Disable
            </MenuItem>
          </Tooltip>
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
        open={openEnabelTransformationSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseEnableTransformationSnackbar}
        Z-index={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 6.5,
        }}
      >
        <Alert
          onClose={handleCloseEnableTransformationSnackbar}
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
        open={openDisabelTransformationSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseDisabelTransformationSnackbar}
        Z-index={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 6.5,
        }}
      >
        <Alert
          onClose={handleCloseDisabelTransformationSnackbar}
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