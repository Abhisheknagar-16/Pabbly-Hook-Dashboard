import { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Alert,
  Dialog,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  MenuItem,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function CreateFolderDialog({ open, onClose }) {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCreate = () => {
    setSnackbarOpen(true);
    onClose(); // Close the dialog after creating
  };

  // Sample data for folder options
  const folder = [
    'None',
    'Pabbly Connect',
    'Main Folder',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
  ].map((name) => ({
    value: name,
    label: name,
  }));

  return (
    <>
      <Dialog open={open} onClose={onClose} sx={{ position: 'fixed' }}>
        <DialogTitle sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }} >
          <Tooltip
            title="Create a connection with a name and folder location."
            arrow
            placement="top"
          >
            Create Folder
          </Tooltip>
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            required
            margin="dense"
            variant="outlined"
            placeholder="Name of the Connection"
            label="Folder Name"
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
              <>
                Enter the name of the connection.{' '}
                <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                  Learn more
                </a>
              </>
            }
          />

          <TextField
            select
            fullWidth
            margin="dense"
            label="Select Parent Folder"
            defaultValue={folder[0].value}
            sx={{ mt: 2 }}
            helperText={
              <>
                Select the parent folder or subfolder where you want to create the connection.{' '}
                <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                  Learn more
                </a>
              </>
            }
          >
            {folder.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={onClose} variant="outlined">
            Cancel
          </Button> */}
          <Button onClick={handleCreate} variant="contained" color="primary">
            Create Folder
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          Success!
        </Alert>
      </Snackbar>
    </>
  );
}
