import { memo, useMemo, useState, useCallback } from 'react';

import {
  Box,
  Card,
  Dialog,
  Button,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { CustomStyling } from '../tree-view/custom-styling';

// Move selectfolder outside component and memoize it
const selectfolder = [
  { value: 'USD', label: 'Main' },
  { value: 'EUR', label: 'Hello' },
  { value: 'BTC', label: 'Subtree with children' },
  { value: 'JPY', label: 'World' },
];

// Wrap the component with memo to prevent unnecessary re-renders
const FolderSection = memo(({ handleTrashClick, handleHomeClick }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [urlrequired, setUrlrequired] = useState('');
  const [errorrequired, setError] = useState(false);

  // Handle input change and validation
  const handleChangetext = (event) => {
    const { value } = event.target; // Destructure 'value' from event.target
    setUrlrequired(value);
    setError(value === '');
  };

  // Memoize handlers
  const handleOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  // Memoize the folder options to prevent unnecessary re-creation
  const folderOptions = useMemo(() => selectfolder, []);

  return (
    <>
      <Card sx={{ pl: 2.4, pr: 2, pt: 2, pb: 2 }}>
        <Typography variant="h6">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tooltip
              disableInteractive
              title={
                <div style={{ textAlign: 'center' }}>
                  You can create folders, subfolders, and manage connections within them.
                </div>
              }
              arrow
              placement="top"
            >
              <span>Folders</span>
            </Tooltip>

            <Tooltip title="Create a new folder." disableInteractive arrow placement="top">
              <Button
                sx={{
                  mr: 1,
                  mb: 1,
                  p: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minWidth: 0,
                }}
                onClick={handleOpen}
                maxWidth
                color="primary"
                variant="contained"
              >
                <Iconify icon="fa6-solid:plus" />
              </Button>
            </Tooltip>
          </Box>
        </Typography>
        <Divider sx={{ borderStyle: 'dashed', mb: 0.6, mt: 1 }} />
        <CustomStyling onTrashClick={handleTrashClick} onHomeClick={handleHomeClick} />
      </Card>

      <Dialog open={dialogOpen} onClose={handleClose} sx={{ position: 'fixed' }}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          <Tooltip
            title="Create a connection with a name and folder location."
            arrow
            placement="top"
          >
            Create Folder
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
            id="outlined-select-currency"
            label="Select Folder"
            sx={{ mt: 2 }}
            select
            fullWidth
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
            {folderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary"  disabled={urlrequired.trim() === ''}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

// Add display name for debugging purposes
FolderSection.displayName = 'FolderSection';

export { FolderSection };
