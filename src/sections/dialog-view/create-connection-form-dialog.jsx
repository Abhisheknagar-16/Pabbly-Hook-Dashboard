import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Alert, Tooltip, Divider, MenuItem, useTheme, DialogContent, InputAdornment } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// Folder selection options
const selectfolder = [
  { value: 'USD', label: 'Main' },
  { value: 'EUR', label: 'Hello' },
  { value: 'BTC', label: 'Subtree with children' },
  { value: 'JPY', label: 'world' },
];

export function CreateConnectionFormDialog({ height, width, variant }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();
  const dialog = useBoolean();
  const [urlrequired, setUrlrequired] = useState('');
  const [errorrequired, setError] = useState(false);

  // Handle input change and validation
  const handleChangetext = (event) => {
    const { value } = event.target; // Destructure 'value' from event.target
    setUrlrequired(value);
    setError(value === '');
  };

  // Handle Create button click with validation check
  const handleCreate = () => {
    if (urlrequired.trim() === '') {
      setError(true);
    } else {
      // If valid, redirect to the next page
      setTimeout(() => {
        window.location.href = paths.dashboard.CreateConnection;
      }, 1000);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Tooltip disableInteractive title="Click to create new connection." arrow placement="top">
        <div>
          <Button
            sx={{ mt: -1 }}
            size="large"
            variant={variant || 'contained'}
            color="primary"
            onClick={dialog.onTrue}
            startIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"
                />
              </svg>
            }
            style={{ width, height }}
          >
            Create Connection
          </Button>
        </div>
      </Tooltip>

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          <Tooltip title="Create a connection with a name and folder location." arrow placement="top">
            Create Connection
          </Tooltip>
        </DialogTitle>
        <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

        <DialogContent>
          <TextField
            error={errorrequired}
            value={urlrequired}
            onChange={handleChangetext}
            autoFocus
            fullWidth
            required
            type="text"
            margin="dense"
            variant="outlined"
            label="Connection Name"
            placeholder="Name of the Connection"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Enter folder name here" disableInteractive arrow placement="top">
                    <Iconify icon="material-symbols:info-outline" />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            helperText={
              errorrequired ? (
                'This field is required.'
              ) : (
                <>
                  Enter the name of the connection.{' '}
                  <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                    Learn more
                  </a>
                </>
              )
            }
          />

          <TextField
            sx={{ mt: 2 }}
            id="outlined-select-currency"
            select
            fullWidth
            label="Select Folder"
            margin="dense"
            defaultValue="USD"
            helperText={
              <>
                Select the folder or subfolder where you want to create the connection.{' '}
                <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                  Learn more
                </a>
              </>
            }
          >
            {selectfolder.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.onFalse} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            disabled={urlrequired.trim() === ''}
          >
            Create
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{
                width: '100%',
                fontSize: '14px',
                fontWeight: 'bold',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            >
              Connection successfully setup.
            </Alert>
          </Snackbar>
        </DialogActions>
      </Dialog>
    </div>
  );
}
