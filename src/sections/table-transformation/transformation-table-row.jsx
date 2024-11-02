import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Alert,
  Drawer,
  AppBar,
  Tooltip,
  Divider,
  Toolbar,
  Snackbar,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';

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

const generateRandomData = () => {
  const names = [
    'Transformation name to the pabbly connect',
    'Transform request payload',
    'Transform request headers',
    'Pabbly chatflow transformation',
    'Transform request query',
  ];

  const randomName = names[Math.floor(Math.random() * names.length)];

  // Generate a random date
  const randomDate = new Date(Date.now() - Math.random() * 10000000000).toISOString();

  // Generate a random transformation ID
  const randomTransformationId = `trs_66fe${Math.random().toString(36).substring(2, 36)}`;

  return {
    TransformationName: randomName,
    Transformationdate: randomDate,
    TransformationId: randomTransformationId,
  };
};

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const popover = usePopover();
  const theme = useTheme();

  const [randomData, setRandomData] = useState({});

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const { TransformationName, Transformationdate, TransformationId } = randomData; // Destructure the new ID

  useEffect(() => {
    setRandomData(generateRandomData());
  }, []); // Empty dependency array ensures it runs once on mount

  const [openEnabelTransformationSnackbar, setEnabelTransformationSnackbar] = React.useState(false);
  const [openDisabelTransformationSnackbar, setDisabelTransformationSnackbar] =
    React.useState(false);

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
              title={
                row.status === 'In Use' ? 'Transformation is In Use' : 'Transformation is Idle'
              }
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
                    {`Transformation created: ${formatDate(Transformationdate)}(UTC+00:00) America/Danmarkshavn`}
                  </div>
                }
                arrow
                placement="top"
              >
                {formatDate(Transformationdate)}
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
            <Box component="span" onClick={handleOpenDrawer}>
              <a style={{ textDecoration: 'none', color: '#078dee', cursor: 'pointer' }}>
                <Tooltip
                  title={
                    <div style={{ textAlign: 'center' }}>
                      {`Transformation Name: ${TransformationName}`}
                    </div>
                  }
                  disableInteractive
                  arrow
                  placement="top"
                >
                  {TransformationName}
                </Tooltip>
              </a>
            </Box>
            {/* <Box component="span" sx={{ color: 'text.disabled' }} /> */}
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack spacing={1} direction="row" alignItems="center">
          <Box component="span">
            <Tooltip
              title={`Transformation ID: ${TransformationId}`}
              disableInteractive
              arrow
              placement="top"
            >
              {TransformationId}
            </Tooltip>
            <Tooltip title="Copy transformation_id" disableInteractive arrow placement="bottom">
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
                onClick={() => navigator.clipboard.writeText(TransformationId)}
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
                <Tooltip
                  disableInteractive
                  title="Number of connections using this transformation."
                  arrow
                  placement="top"
                >
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
      <Drawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 700, md: 850 }, // Adjust width based on screen size
            '@media (max-width: 300px)': {
              padding: '16px',
            },
          },
        }}
      >
        <AppBar
          sx={{ bgcolor: '#fff', padding: 2 }}
          position="relative"
          color="default"
          display="flex"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              sx={{
                position: 'absolute',
                top: 1, // Adjust top position as needed
                right: 28, // Adjust right position as needed
              }}
              onClick={handleCloseDrawer}
            >
              <Iconify icon="mingcute:close-line" />
            </IconButton>
          </Toolbar>
          <Typography
            sx={{
              mt: -8,
              flex: 1,
              ml: 2,
              color: 'primary',
              fontSize: '24px',
              fontWeight: 700,
            }}
          >
            {TransformationName} {/* Display the random name */}
          </Typography>
          <Typography
            sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
          >
            Transformation ID - {TransformationId} {/* Display the random ID */}
            <Tooltip title="Copy transformation_id" arrow placement="bottom">
              <IconButton
                edge="end"
                sx={{ color: 'text.disabled' }}
                onClick={() => navigator.clipboard.writeText(TransformationId)} // Use the random ID
              >
                <Iconify sx={{ mt: -0.2 }} width={15} icon="solar:copy-bold" />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography
            sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
          >
            Executed at {formatDate(Transformationdate)}
          </Typography>
        </AppBar>
        <Divider />
        <Box sx={{ width: '90%', mt: 2, ml: 5, bgcolor: '#fff', padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            <Tooltip
              title="Detailed information for the selected webhook transformation."
              disableInteractive
              arrow
              placement="top"
            >
              Transformation Details
            </Tooltip>
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={100} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2">
                <Tooltip
                  title="Shows the current state of your transformation (e.g., In Use, Idle, Failed)."
                  disableInteractive
                  placement="top"
                  arrow
                >
                  Status
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <Tooltip
                placement="top"
                disableInteractive
                arrow
                title={
                  row.status === 'In Use' ? 'Transformation is In Use' : 'Transformation is Idle'
                }
              >
                <Label
                  size="small"
                  variant="soft"
                  color={
                    (row.status === 'In Use' && 'success') ||
                    (row.status === 'Idle' && 'error') ||
                    'default'
                  }
                >
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </Label>
              </Tooltip>
            </Grid>
            <Grid item xs={100} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Tooltip
                  title="Transformatiom name is created"
                  arrow
                  placement="top"
                  disableInteractive
                >
                  Name
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled size="small" fullWidth value={TransformationName} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Tooltip
                  title="Transformatiom date is created"
                  arrow
                  placement="top"
                  disableInteractive
                >
                  Created
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={100} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled size="small" fullWidth value={formatDate(Transformationdate)} />
            </Grid>
            <Grid item xs={100} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Tooltip
                  title="Transformatiom ID is created"
                  arrow
                  placement="top"
                  disableInteractive
                >
                  ID
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={100} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled size="small" fullWidth value={TransformationId} />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Transformation Code
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <Box
                sx={{
                  position: 'relative',
                  maxHeight: 400,
                  overflowY: 'auto', // Control vertical overflow
                  overflowX: 'hidden', // Hide horizontal overflow to avoid scroll
                  border: '1px solid #E5E8EB',
                  borderRadius: 1,
                  // Custom scrollbar styling
                  '&::-webkit-scrollbar': {
                    width: '8px', // Set the width of the scrollbar
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888', // Color of the scrollbar thumb
                    borderRadius: '10px', // Border radius for rounded scrollbar
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555', // Color on hover
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1', // Background of the scrollbar track
                    borderRadius: '10px', // Border radius for the track
                  },
                }}
              >
                <SyntaxHighlighter
                  language="javascript"
                  customStyle={{
                    backgroundColor: 'transparent',
                    wordWrap: 'break-word', // Ensure long lines wrap
                    whiteSpace: 'pre-wrap', // Maintain formatting while allowing wrapping
                  }}
                  wrapLongLines // Ensure code lines don't overflow horizontally
                >
                  {`(Transformation, context) => {
    // Initialize a counter
    let itemCounter = 0;
    // Process a list of items
    Transformation.payload.items = Transformation.payload.items || [];
    Transformation.payload.items.forEach(item => {
      if (item.status === 'active') {
        itemCounter++;
        item.updated_at = new Date().toISOString();
      } else {
        item.status = 'inactive';
      }
    });

    // Add a summary field
    Transformation.payload.summary = {
      activeItemCount: itemCounter,
      totalItems: Transformation.payload.items.length
    };

    // Add a new header
    Transformation.headers['X-Item-Count'] = itemCounter.toString();

    // Process query parameters
    Transformation.queryParams.processedAt = new Date().toISOString();

    // Error handling for missing fields
    if (!request.payload.items.length) {
      throw new Error('No items to process');
    }

    return Transformation;
  }`}
                </SyntaxHighlighter>

                {/* Copy button */}
                <IconButton
                  edge="end"
                  sx={{
                    position: 'absolute',
                    top: 15, // Adjust as needed
                    right: 10, // Adjust as needed
                    color: 'text.disabled',
                  }}
                  onClick={() =>
                    navigator.clipboard.writeText((Transformation, context) => {
                      // Initialize a counter
                      let itemCounter = 0;
                      // Process a list of items
                      Transformation.payload.items = Transformation.payload.items || [];
                      Transformation.payload.items.forEach((item) => {
                        if (item.status === 'active') {
                          itemCounter += 1; // Avoiding ++ operator
                          item.updated_at = new Date().toISOString();
                        } else {
                          item.status = 'inactive';
                        }
                      });

                      // Add a summary field
                      Transformation.payload.summary = {
                        activeItemCount: itemCounter,
                        totalItems: Transformation.payload.items.length,
                      };

                      // Add a new header
                      Transformation.headers['X-Item-Count'] = itemCounter.toString();

                      // Process query parameters
                      Transformation.queryParams.processedAt = new Date().toISOString();

                      // Error handling for missing fields
                      if (!Transformation.payload.items.length) {
                        throw new Error('No items to process');
                      }

                      return Transformation;
                    })
                  }
                >
                  <Tooltip title="Copy Transformation_code" arrow placement="bottom">
                    <Iconify width={16} icon="solar:copy-bold" />
                  </Tooltip>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
