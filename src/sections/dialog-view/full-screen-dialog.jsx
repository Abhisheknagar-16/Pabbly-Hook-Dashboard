import React, { forwardRef } from 'react';

// import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
// import Dialog from '@mui/material/Dialog';
// import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemButton from '@mui/material/ListItemButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { Box, Grid, Alert, Drawer, Tooltip, Divider, TextField } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Snackbar } from 'src/components/snackbar';
// import FormControl from '@mui/material/FormControl';
// ----------------------------------------------------------------------
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// ----------------------------------------------------------------------

export function FullScreenDialog() {
  const dialog = useBoolean();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Tooltip title="Tap to view full event history." arrow placement='top'>
        <Button size="small" variant="outlined" color="primary" onClick={dialog.onTrue}>
          Attempt : 1
        </Button>
      </Tooltip>

      <Drawer
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
        open={dialog.value}
        onClose={dialog.onFalse}
        TransitionComponent={Transition}
      >
        {/* <Card component="ul" position="relative" float="left"> */}
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
                top: 12, // Adjust top position as needed
                right: 28, // Adjust right position as needed
              }}
              onClick={dialog.onFalse}
            >
              <Iconify icon="mingcute:close-line" />
            </IconButton>
          </Toolbar>
          <Typography
            sx={{
              mt: -6.5,
              flex: 1,
              ml: 2,
              color: 'primary',
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            Rajpal singh Tomar
          </Typography>
          <Typography
            sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
          >
            Request:- req_86d8c060c2a54528995b0215a0c8592
            <Tooltip title="Copy request_id " arrow placement="bottom">
              <IconButton
                edge="end"
                sx={{ color: 'text.disabled' }}
                onClick={() =>
                  navigator.clipboard.writeText('req_86d8c060c2a54528995b0215a0c8592')
                }
              >
                <Iconify sx={{ mt: -0.2 }} width={17} icon="solar:copy-bold" />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography
            sx={{ flex: 1, ml: 2, color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}
          >
            Events:- evt_66c87b54a2b7dc2c1740d639
            <Tooltip title="Copy event_id" arrow placement="bottom">
              <IconButton
                edge="end"
                sx={{ color: 'text.disabled' }}
                onClick={() => navigator.clipboard.writeText('evt_66c87b54a2b7dc2c1740d639')}
              >
                <Iconify sx={{ mt: -0.2 }} width={17} icon="solar:copy-bold" />
              </IconButton>
            </Tooltip>
          </Typography>
        </AppBar>
        <Divider />
        <Box sx={{ width: '90%', mt: 2, ml: 5, bgcolor: '#fff', padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Event History
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={2}>
            <Grid item xs={100} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 0.4 }}>Status</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <Button onClick={handleOpenSnackbar} variant="contained" color="success" size="small">
                Accepted
              </Button>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message="This is an successfully setup."
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',  // Changed to 'center' from 'mid 10%' to use a valid Material-UI position
                }}
              >
                <Alert onClose={handleCloseSnackbar} severity="success">
                  Event successfully setup.
                </Alert>
              </Snackbar>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Source</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField
                disabled
                value="2024-08-23T12:06:44.929Z"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Content lenght </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField
                disabled
                value="evt_66c87b54a2b7dc2c1740d639"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Content type</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField
                disabled
                value="2024-08-23T12:06:44.930Z"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>{' '}
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Method</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField disabled value="Get" fullWidth variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{ mt: 1 }}>Body</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <Box
                sx={{
                  position: 'relative',
                  maxHeight: 400,
                  overflowY: 'auto',  // Control vertical overflow
                  overflowX: 'hidden',  // Hide horizontal overflow to avoid scroll
                  border: '1px solid #E5E8EB',
                  borderRadius: 1,
                  // Custom scrollbar styling
                  '&::-webkit-scrollbar': {
                    width: '8px',  // Set the width of the scrollbar
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',  // Color of the scrollbar thumb
                    borderRadius: '10px',  // Border radius for rounded scrollbar
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',  // Color on hover
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',  // Background of the scrollbar track
                    borderRadius: '10px',  // Border radius for the track
                  },
                }}
              >
                <SyntaxHighlighter
                  language="javascript"
                  customStyle={{
                    backgroundColor: 'transparent',
                    wordWrap: 'break-word',  // Ensure long lines wrap
                    whiteSpace: 'pre-wrap',  // Maintain formatting while allowing wrapping
                  }}
                  wrapLongLines  // Ensure code lines don't overflow horizontally
                >
                  {`(event, context) => {
    // Initialize a counter
    let itemCounter = 0;
    // Process a list of items
    event.payload.items = event.payload.items || [];
    event.payload.items.forEach(item => {
      if (item.status === 'active') {
        itemCounter++;
        item.updated_at = new Date().toISOString();
      } else {
        item.status = 'inactive';
      }
    });

    // Add a summary field
    event.payload.summary = {
      activeItemCount: itemCounter,
      totalItems: event.payload.items.length
    };

    // Add a new header
    event.headers['X-Item-Count'] = itemCounter.toString();

    // Process query parameters
    event.queryParams.processedAt = new Date().toISOString();

    // Error handling for missing fields
    if (!event.payload.items.length) {
      throw new Error('No items to process');
    }

    return event;
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
                    navigator.clipboard.writeText((event, context) => {
                      // Initialize a counter
                      let itemCounter = 0;
                      // Process a list of items
                      event.payload.items = event.payload.items || [];
                      event.payload.items.forEach((item) => {
                        if (item.status === 'active') {
                          itemCounter += 1; // Avoiding ++ operator
                          item.updated_at = new Date().toISOString();
                        } else {
                          item.status = 'inactive';
                        }
                      });

                      // Add a summary fieldevent
                      event.payload.summary = {
                        activeItemCount: itemCounter,
                        totalItems: event.payload.items.length,
                      };

                      // Add a new header
                      event.headers['X-Item-Count'] = itemCounter.toString();

                      // Process query parameters
                      event.queryParams.processedAt = new Date().toISOString();

                      // Error handling for missing fields
                      if (!event.payload.items.length) {
                        throw new Error('No items to process');
                      }

                      return event;
                    })
                  }
                >
                  <Tooltip title="Copy request_code" arrow placement="bottom">
                    <Iconify width={16} icon="solar:copy-bold" />
                  </Tooltip>
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2" sx={{mt:1}}>Query Params</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
              <TextField
                disabled
                value="NA"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Copy Text " arrow placement="bottom">
                      <IconButton
                        edge="end"
                        sx={{ color: 'text.disabled' }}
                        onClick={() => navigator.clipboard.writeText('NA')}
                      >
                        <Iconify sx={{ mt: -0.2 }} width={15} icon="solar:copy-bold" />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>
        {/* </Card> */}
      </Drawer>
    </>
  );
}
