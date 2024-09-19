import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Tooltip, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

// import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { FullScreenDialog } from '../dialog-view/full-screen-dialog';

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  // List of items to copy
  const copyItems = [
    { id: 1, text: 'req_66c87b54a2b7dc2c1740d639', label: 'req_66c87b54a2b7dc2c1740d639' },
  ];

  const evtItems = [
    { id: 1, text: 'evt_66c87b54a2b7dc2c1740d639', label: 'evt_66c87b54a2b7dc2c1740d639' },
  ];
  const handleCopy = (text) => { };

  const confirm = useBoolean();
  const collapse = useBoolean();
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
            <Box sx={{ mt: 0.5, }} fontSize={14} component="span">
              <Tooltip title="Connection Name: Rajpal singh Tomar" arrow placement='top'>Rajpal singh Tomar</Tooltip></Box>
            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
            />
            <Box
              component="span"
              sx={{ color: 'text.disabled', fontSize: '12px', fontWeight: 400 }}
            >
              <Tooltip title="Events Date: Aug 8, 2024 15:25:33.366" arrow placement='top'>
                Aug 8, 2024 15:25:33.366
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

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral', width: '100%' }}
        >
          <Paper sx={{ m: 1.5 }}>
            {row.items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                  },
                }}
              >
                <ListItemText
                  primary="Verification Token:************"
                  secondary={item.sku}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                    mt: 0.5,
                  }}
                />
              </Stack>
            ))}
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}
      {renderSecondary}
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
