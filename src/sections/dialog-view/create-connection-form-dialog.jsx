import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Alert, Tooltip, Divider, MenuItem, useTheme, InputAdornment } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

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

export function CreateConnectionFormDialog({ height, width, variant }) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const theme = useTheme();
  // const navigate = useNavigate();
  const dialog = useBoolean();
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
    // navigate('/dashboard/CreateConection')
  };
  // console.log(paths.dashboard.six)

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
            variant={variant || 'contained'} // Apply the variant passed as a prop
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
            style={{ width, height, variant }}
          >
            Create Connections
          </Button>
        </div>
      </Tooltip>

      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>
          <Tooltip
            title="Create a connection with a name and folder location."
            arrow
            placement="top"
          >
            Create Connection
          </Tooltip>
        </DialogTitle>
        <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="email"
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
              <>
                Enter the name of connection.{' '}
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
            helperText={
              <>
                Select the folder or subfolder where you want to create the connection.{' '}
                <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                  {' '}
                  Learn more{' '}
                </a>{' '}
              </>
            }
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
          <Button onClick={dialog.onFalse} variant="outlined" >
            Cancel
          </Button>

          <Button
            onClick={handleOpenSnackbar}
            href={paths.dashboard.CreateConnection}
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
          >
            Create
          </Button>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            message="This is an error Alert."
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right', // Changed to 'center' from 'mid 10%' to use a valid Material-UI position
            }}
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
