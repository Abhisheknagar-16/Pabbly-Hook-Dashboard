import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import { Alert, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

const selectfolder = [
  {
    value: 'USD',
    label: 'Main',
  },
  {
    value: 'EUR',
    label: 'Hello',
  },
  {
    value: 'BTC',
    label: 'Subtree with children',
  },
  {
    value: 'JPY',
    label: 'world',
  },
];

export function FormDialog() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const dialog = useBoolean();
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Tooltip
        title="Start building a new transformation "
        arrow
        placement="top"
      >
        <div>
          <Button
            sx={{ mt: -1 }}
            size='large'
            variant="contained"
            color="primary"
            onClick={dialog.onTrue}
            startIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z" />
              </svg>
            }
          >
            Create Transformations
          </Button>
        </div>
      </Tooltip>

      <Dialog
        open={dialog.value}
        onClose={dialog.onFalse}
        PaperProps={{
          style: { width: '500px', maxWidth: '500px' },  // Set the width here
        }}
      >
        <DialogTitle>
          <Tooltip title="Create a Transformation." arrow placement="top">
            Create Transformation
          </Tooltip>
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="email"
            margin="dense"
            variant="outlined"
            label="Transformation Name"
            placeholder="Name of the Transformation"
            helperText={
              <>
                Enter the name of the Transformation.{' '}
                <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                  Learn more
                </a>
              </>
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleOpenSnackbar} variant="contained">
            Create
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            message="This is an error Alert."
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              Transformation successfully setup.
            </Alert>
          </Snackbar>
        </DialogActions>
      </Dialog>

    </div>
  );
}
