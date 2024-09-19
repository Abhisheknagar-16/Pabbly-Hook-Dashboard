import { forwardRef } from 'react';

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
import { Box, Card, Grid, Drawer, Tooltip, Divider, TextField } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
// import FormControl from '@mui/material/FormControl';
// ----------------------------------------------------------------------
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// ----------------------------------------------------------------------

export function FullScreenDialog() {
  const dialog = useBoolean();

  return (
    <>
      <Tooltip title="Tap to view full event history." arrow placement='top'>
        <Button size="small" variant="outlined" color="primary" onClick={dialog.onTrue}>
          Attempt : 1
        </Button>
      </Tooltip>

      <Drawer
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 700, md: 850 }, // Adjust width based on screen size
            '@media (max-width: 300px)': {
              padding: '16px',
            },
          }
        }}
        anchor="right"
        open={dialog.value}
        onClose={dialog.onFalse}
        TransitionComponent={Transition}
      >
        <Card component="ul" position="relative" float="left">
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
          <Box sx={{ width: '90%', mt: 5, ml: 5, bgcolor: '#fff', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Events History
            </Typography>
            <Divider />
            <Grid container spacing={2} mt={2}>
              <Grid item xs={100} sm={4} md={3} lg={2} xl={2}>
                <Typography variant="body2">Status</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
                <Button variant="contained" color="success" size="small">
                  {' '}
                  Accepted
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                <Typography variant="body2">Source</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
                <TextField
                  disabled
                  value="src_66c87b54a2b7dc2c1740d639"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                <Typography variant="body2">Content length</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
                <TextField disabled value="74" fullWidth variant="outlined" size="small" />
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                <Typography variant="body2"> Content Type</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
                <TextField
                  disabled
                  value="application/json"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                <Typography variant="body2">Method</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
                <TextField disabled value="Get" fullWidth variant="outlined" size="small" />
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                <Typography variant="body2">Body</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={15} lg={12} xl={10}>
                <TextField
                  disabled
                  value={`(request, context) => {
                        // Initialize a counter
                        let itemCounter = 0;
                        // Process a list of items
                        request.payload.items = request.payload.items || [];
                        request.payload.items.forEach(item => {
                        if (item.status === 'active') {
                        itemCounter++;
                        item.updated_at = new Date().toISOString();
                        } else {
                        item.status = 'inactive';
                        }
                        });

                        // Add a summary field
                        request.payload.summary = {
                        activeItemCount: itemCounter,
                        totalItems: request.payload.items.length
                        };

                        // Add a new header
                        request.headers['X-Item-Count'] = itemCounter.toString();

                        // Process query parameters
                        request.queryParams.processedAt = new Date().toISOString();

                        // Error handling for missing fields
                        if (!request.payload.items.length) {
                        throw new Error('No items to process');
                        }

                        return request;
                        }`}
                  fullWidth
                  variant="outlined"
                  size="auto"
                  multiline
                  minRows={3} // Minimum number of rows
                  maxRows={10} // Maximum number of rows
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography variant="body2">Query Params</Typography>
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
          </Box>
        </Card>
      </Drawer>
    </>
  );
}
