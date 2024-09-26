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

export function FormDialog({height,width,variant}) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const navigate= useNavigate();
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
        title="Start building a new connections "
        arrow
        placement="top"
      >
        <div>
          <Button
            sx={{ mt: -1}}
            size='large'
            variant="contained"
            color="primary"
            onClick={dialog.onTrue}
            startIcon={
              <svg
                width="19"
                height="15"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0C4.02823 0 0 4.02823 0 9C0 13.9718 4.02823 18 9 18C13.9718 18 18 13.9718 18 9C18 4.02823 13.9718 0 9 0ZM14.2258 10.0161C14.2258 10.2556 14.0298 10.4516 13.7903 10.4516H10.4516V13.7903C10.4516 14.0298 10.2556 14.2258 10.0161 14.2258H7.98387C7.74435 14.2258 7.54839 14.0298 7.54839 13.7903V10.4516H4.20968C3.97016 10.4516 3.77419 10.2556 3.77419 10.0161V7.98387C3.77419 7.74435 3.97016 7.54839 4.20968 7.54839H7.54839V4.20968C7.54839 3.97016 7.74435 3.77419 7.98387 3.77419H10.0161C10.2556 3.77419 10.4516 3.97016 10.4516 4.20968V7.54839H13.7903C14.0298 7.54839 14.2258 7.74435 14.2258 7.98387V10.0161Z"
                  fill="white"
                />
              </svg>
            }
            style={{ width, height ,variant}}
          >
            Create Connections
          </Button>
        </div>
      </Tooltip>

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle><Tooltip title="Create a connection with a name and folder location." arrow placement="top">Create Connection</Tooltip></DialogTitle>

        <DialogContent sx={{mt:-1}}>
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
          <Typography sx={{ mt: 2}}>Select Folder</Typography>

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