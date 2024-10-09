import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Alert, Tooltip, MenuItem, } from '@mui/material';

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

export function FormDialog({ height, width, variant }) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const navigate = useNavigate();
  const dialog = useBoolean();
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
    navigate('/dashboard/six')
  };
  // console.log(paths.dashboard.six)

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Tooltip
        disableInteractive
        title="Create your connection and its resources"
        arrow
        placement="top"
      >
        <div>
          <Button
            sx={{ mt: -1 }}
            size='large'
            variant={variant || "contained"}  // Apply the variant passed as a prop
            color="primary"
            onClick={dialog.onTrue}
            startIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z" />
              </svg>
            }
            style={{ width, height, variant }}
          >
            Create Connections
          </Button>
        </div>
      </Tooltip>

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle><Tooltip title="Create a connection with a name and folder location." arrow placement="top">Create Connection</Tooltip></DialogTitle>

        <DialogContent sx={{ mt: -1 }}>
          {/* <Typography sx={{ mb: 0 }}>Connection Name</Typography> */}

          <TextField
            autoFocus
            fullWidth
            type="email"
            margin="dense"
            variant="outlined"
            label="Connection Name"
            placeholder='Name of the Connection'
            helperText={
              <>
                Enter the name of the connection.{' '}
                <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                  Learn more
                </a>
              </>
            }
          />
          <Typography sx={{ mt: 2 }}>Select Folder</Typography>

          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            // label="Select"
            margin="dense"
            defaultValue="USD"
            helperText={<> Select the folder or subfolder where you want to create the connection.{' '}
              <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}> Learn more </a> </>}
          >
            {selectfolder.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* <Typography sx={{ mb:3 ,color:'text.secondary',fontSize:'13px'}}>
          Select the folder or subfolder where you want to create the connection.
          </Typography> */}
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
              horizontal: 'center',  // Changed to 'center' from 'mid 10%' to use a valid Material-UI position
            }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              Connection successfully setup.
            </Alert>
          </Snackbar>
        </DialogActions>
      </Dialog>
    </div>
  );
}