import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  // Tab,
  // Tabs,
  Card,
  Dialog,
  // Switch,
  Divider,
  Tooltip,
  MenuItem,
  // Checkbox,
  TextField,
  // CardHeader,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  // InputAdornment,
  // FormControlLabel,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { OrderListView } from 'src/sections/order/view';

import { useMockedUser } from 'src/auth/hooks';
// import { EcommerceNewProducts } from '../ecommerce-new-products';

// import Alert from '@mui/material/Alert';
// import Snackbar from '@mui/material/Snackbar';

import { MotivationIllustration } from 'src/assets/illustrations';

import { Iconify } from 'src/components/iconify';

import { FormDialog } from 'src/sections/dialog-view/form-dialog';
import { CustomStyling } from 'src/sections/tree-view/custom-styling';

import { EcommerceWelcome } from '../ecommerce-welcome';


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

const currencies = [
  {
    value: 'USD',
    label: 'per second',
  },
  {
    value: 'EUR',
    label: 'per minute',
  },
  {
    value: 'BTC',
    label: 'per hour',
  },
  {
    value: 'JPY',
    label: 'per day',
  },
];
const Ratelimit = [
  {
    value: 'USD',
    label: '1',
  },
  {
    value: 'EUR',
    label: '2',
  },
  {
    value: 'BTC',
    label: '3',
  },
  {
    value: 'JPY',
    label: '4',
  },
];
const Interval = [
  {
    value: 'USD',
    label: 'second',
  },
  {
    value: 'EUR',
    label: 'minute',
  },
  {
    value: 'BTC',
    label: 'hour',
  },
  {
    value: 'JPY',
    label: 'day',
  },
];
const Destination = [
  {
    value: 'USD',
    label: 'GET',
  },
  {
    value: 'EUR',
    label: 'POST',
  },
  {
    value: 'BTC',
    label: 'PUT',
  },
  {
    value: 'JPY',
    label: 'PATCH',
  },
  {
    value: 'JPT',
    label: 'DELETE',
  },
];
const Strategy = [
  {
    value: 'USD',
    label: 'Linearly',
  },
  {
    value: 'EUR',
    label: 'Exponentially',
  },
];
const Maximum = [
  {
    value: 'USD',
    label: 'Select one',
  },
  {
    value: 'EUR',
    label: 'Select two',
  },
  {
    value: 'BTC',
    label: 'Select three',
  },
  {
    value: 'JPY',
    label: 'Select four',
  },
];
const Time = [
  {
    value: 'USD',
    label: '1 times',
  },
  {
    value: 'EUR',
    label: '2 times',
  },
  {
    value: 'BTC',
    label: '3 times',
  },
  {
    value: 'JPY',
    label: '4 times',
  },
  // {
  //   value: 'JPT',
  //   label: 'Select Five',
  // },
];

// ----------------------------------------------------------------------

export function OverviewEcommerceView() {

  const [open, setOpen] = useState(false);
  const [dopen, setdopen] = useState(false);
  const [folderopen, foldersopen] = useState(false);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [url, setUrl] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
    navigator.clipboard.writeText(event.target.value); // Automatically copies the text as you type
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Function to handle dialog open
  const handleOpen = () => {
    setOpen(true);
  };

  const handle = () => {
    setdopen(true);
  };

  const handledopen = () => {
    setdopen(true);
  };
  // Function to handle dialog close
  const handleClose = () => {
    setOpen(false);
  };
  const handledlose = () => {
    setdopen(false);
  };
  const folderclose = () => {
    foldersopen(false);
  };

  const { user } = useMockedUser();

  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [showRatelimitField, setShowRatelimitField] = useState(false);
  const [showRetryField, setShowRetryField] = useState(false);
  const [showDelayField, setShowDelayField] = useState(false);
  const [showBatchSizeField, setShowBatchSizeField] = useState(false);
  const [showFilterField, setShowFilterField] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleRatelimitToggle = (event) => {
    setShowRatelimitField(event.target.checked);
  };

  const handleRetryToggle = (event) => {
    setShowRetryField(event.target.checked);
  };

  const handleDelayToggle = (event) => {
    setShowDelayField(event.target.checked);
  };

  const handleBatchSizeToggle = (event) => {
    setShowBatchSizeField(event.target.checked);
  };

  const handleFilterToggle = (event) => {
    setShowFilterField(event.target.checked);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <DashboardContent maxWidth="xl" sx={{ px: { xs: 3.2, sm: 3, lg: 8, xl: 15 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3} >
          <Card sx={{ pl: 2.4, pr: 2, pt: 2, pb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tooltip title="Manage folders" arrow placement='top'>
                  Folder
                </Tooltip>
                {/* <Button size='large' variant='contained' onClick={handledopen} edge="end" sx={{mr:0.5}} >
                  
                </Button> */}
                <Tooltip title="Create a new folder." arrow placement='top'>
                <Button
                  onClick={handledopen}
                  edge="end"
                  variant="contained"
                  sx={{ 
                    height: '30px', 
                    width: '30px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: 0,
                    mr:0.9,
                    minWidth: 0, // Ensures no default min-width is applied
                    // borderRadius:'100%'
                  }}
                >
                  <Iconify icon="mingcute:add-line" />
                </Button>
                </Tooltip>


                <Dialog open={dopen} onClose={handledlose}>
                  <DialogTitle >
                    <Tooltip title="Create a connection with a name and folder location." arrow placement='top'>
                      Create Folder
                    </Tooltip>
                  </DialogTitle>

                  <DialogContent sx={{ mt: -1 }}>

                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      placeholder='Name of the Connection'
                      label="Folder Name"
                      // defaultValue="Name of the Connection"
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
                      //  label="Select"
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

                  </DialogContent>

                  <DialogActions>
                    <Button onClick={handledlose} variant="outlined" color="inherit">
                      Cancel
                    </Button>
                    <Button onClick={handledlose} variant="contained">
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Typography>
            <Divider sx={{ borderStyle: 'dashed', mb: 0.6,mt:2 }} />
            <CustomStyling />
            <Divider sx={{ borderStyle: 'dashed', mt: 1 }} />
            <Typography sx={{ fontSize: '14px', mb: 0, mt: 1.5, color: 'text.secondary' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                      Trash folder holds all connections that have been deleted.
                    </Typography>
                  }
                  arrow
                  placement="top"
                >
                  <div>Trash(10)</div>
                </Tooltip>
                <Tooltip title="Clear trash." arrow placement='top'>
                  <IconButton edge="end" sx={{ mr: 0.8 }} >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={9} lg={9} sx={{ height: '100%' }}>
          <EcommerceWelcome
            title={<Tooltip title={
              <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                No existing connections. Create a new one using the steps below.
              </Typography>
            } arrow placement='top'>
              <Typography variant="h6" fontWeight={700}>
                No Connections found!
              </Typography>
            </Tooltip>}
            description="There may be no Connections in the folder or for the applied filter conditions. You can create a Connection by following the steps below-."
            step1=" Click on the 'Create Connection' button available in the top right section."
            step2=" Now select apps you want to integrate into the trigger and action step."
            step3=" Once the Connection is completed, save and enable it."
            img={<Tooltip title="Click to watch tutorial." arrow placement='top'>
              <div>
                <MotivationIllustration hideBackground />
              </div>
            </Tooltip>}
            action={<FormDialog
              width='200px'
              height='40px'
            />}

          />
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          {/* <Card sx={{ pl: 3, pr: 3, pt: 1.5, pb: 1 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '700', mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Tooltip title="Manage folders" arrow placement='top'>
                Folder
                </Tooltip>
                <IconButton onClick={handledopen} edge="end">
                  <Tooltip title="Create a new folder." arrow placement='top'>
                      <Iconify icon="icon-park-solid:add" style={{ color: 'black' }} width="12" />
                  </Tooltip>
                </IconButton>
                <Dialog open={dopen} onClose={handledlose}>
                  <DialogTitle sx={{fontSize:'24px', fontWeight:'700'}}>
                  <Tooltip title="Create a connection with a name and folder location." arrow placement='top'>
                   Create Folder
                   </Tooltip>
                   </DialogTitle>

                  <DialogContent sx={{mt:-1}}>
                   
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      placeholder='Name of the Connection'
                      label="Folder Name"
                      // defaultValue="Name of the Connection"
                      helperText={
                        <>
                          Enter the name of the connection.{' '}
                          <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                            Learn more
                          </a>
                        </>
                      }
                    />

                    <Typography sx={{ mt:2}}>Select Folder</Typography>

                    <TextField
                     id="outlined-select-currency"
                     select
                     fullWidth
                    //  label="Select"
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

                  </DialogContent>

                  <DialogActions>
                    <Button onClick={handledlose} variant="outlined" color="inherit">
                      Cancel
                    </Button>
                    <Button onClick={handledlose} variant="contained">
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Typography>
            <Divider sx={{ borderStyle: 'dashed', mb: 0.6 }} />
            <CustomStyling />
            <Divider sx={{ borderStyle: 'dashed', mt: 1 }} />
            <Typography sx={{ fontSize: '14px', mb: 0, mt: 1, color: 'text.secondary' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: '12px', textAlign: 'center' }}>
                      Trash folder holds all connections that have been deleted.
                    </Typography>
                  }
                  arrow
                  placement="top"
                >
                  <div>Trash(10)</div>
                </Tooltip>
                <Tooltip title="Clear trash." arrow placement='top'>
                <IconButton edge="end">
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
                </Tooltip>
              </Box>
            </Typography>
          </Card> */}
        </Grid>


        <Grid item xs={12} md={9} lg={9} sx={{ height: '100%' }}>
          <OrderListView />
        </Grid>

      </Grid>


    </DashboardContent>

  );
}