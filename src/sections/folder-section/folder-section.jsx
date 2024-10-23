import { useState } from 'react';

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
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { CustomStyling } from '../tree-view/custom-styling';

const selectfolder = [
  { value: 'USD', label: 'Main' },
  { value: 'EUR', label: 'Hello' },
  { value: 'BTC', label: 'Subtree with children' },
  { value: 'JPY', label: 'World' },
];

export function FolderSection({ handleTrashClick, handleHomeClick }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);
  return (
    <>
      <Card sx={{ pl: 2.4, pr: 2, pt: 2, pb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
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

            <IconButton onClick={handleOpen} edge="end" sx={{ mr: 0.6, mt: -0.8 }}>
                <Tooltip disableInteractive title="Create a new folder." arrow placement="top">
                  <Iconify icon="icon-park-solid:add" style={{ color: '#078dee' }} width="12" />
                </Tooltip>
              </IconButton>
          </Box>
        </Typography>
        <Divider sx={{ borderStyle: 'dashed', mb: 0.6, mt: 1 }} />
        {/* Pass both onTrashClick and onHomeClick to CustomStyling */}
        <CustomStyling onTrashClick={handleTrashClick} onHomeClick={handleHomeClick} />
      </Card>

      {/* Folder Dialog */}
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

          {/* <Typography sx={{ mt: 2 }}>Select Folder</Typography> */}
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
            {selectfolder.map((option) => (
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
          <Button onClick={handleClose} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
