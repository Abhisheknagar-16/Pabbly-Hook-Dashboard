import React, { useState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Dialog,
  Switch,
  Divider,
  Tooltip,
  MenuItem,
  Checkbox,
  TextField,
  CardHeader,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { OrderListViewHome } from 'src/sections/orderhome/view';
import { CustomStyling } from 'src/sections/tree-view/custom-styling';

import { useMockedUser } from 'src/auth/hooks';


// the selected row field 
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
    <DashboardContent maxWidth="xl" sx={{ px: { xs: 0, sm: 0, lg: 5, xl: 0 } }}>
      <Grid container spacing={3}>

         {/* folder section */}
        <Grid item xs={12} md={3} lg={3} >
          <Card sx={{ pl: 2.4, pr: 2, pt: 2, pb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tooltip title="Manage folders" arrow placement='top'>
                  Folder
                </Tooltip>
                <IconButton onClick={handledopen} edge="end" sx={{ mr: 0.6, mt: -0.8 }}>
                  <Tooltip title="Create a new folder." arrow placement='top'>
                    <Iconify icon="icon-park-solid:add" style={{ color: 'black' }} width="12" />
                  </Tooltip>
                </IconButton>


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
            <Divider sx={{ borderStyle: 'dashed', mb: 0.6, mt: 1 }} />
            <CustomStyling />
          </Card>
        </Grid>

        {/* setup connection form */}
        <Grid xs={12} md={9}>
          <Card>
            <CardHeader sx={{ mt: -1 }}
              title="Setup Connections"
              subheader={
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  Define where your events come from, and Webhook will provide a corresponding
                  endpoint URL when your connection is created. Sources can be reused across
                  multiple connections.{' '}
                  <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>
                    Learn more
                  </a>
                </Typography>
              }
            />

            <Divider sx={{ borderStyle: 'dashed', mt: 2 }} />
            <DialogContent sx={{ mb: 1 }}>
              <TextField
                autoFocus
                fullWidth
                type="email"
                margin="dense"
                variant="outlined"
                placeholder='Name of the Connection'
                label="Connection Name"
                helperText="Enter the name of the connection."
                sx={{ mt: 3 }}
              />
            </DialogContent>

            <DialogContent sx={{ mb: 3 }}>
              <TextField
                autoFocus
                fullWidth
                type="email"
                margin="dense"
                variant="outlined"
                label="Webhook URL"
                placeholder='Enter URL'
                helperText="Enter the webhook URL."
                value={url}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Copy URL" arrow placement="bottom">
                        <IconButton edge="end" onClick={handleCopy}>
                          <Iconify width={18} icon="solar:copy-bold" />
                        </IconButton></Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </DialogContent>

            <DialogContent>
              <Typography sx={{ mb: 1 }}>HTTP Methods</Typography>

              <FormControlLabel label="GET" control={<Checkbox size="normal" defaultChecked />} />
              <FormControlLabel label="POST" control={<Checkbox size="normal" Checked />} />
              <FormControlLabel label="PUT" control={<Checkbox size="normal" Checked />} />
              <FormControlLabel label="PATCH" control={<Checkbox size="normal" Checked />} />
              <FormControlLabel
                label="DELETE"
                control={<Checkbox size="normal" Checked />}
              />

              <Typography sx={{ mb: 2, color: 'text.secondary', fontSize: '13px', mt: 1 }}>
                Allow only specific HTTP methods to be accepted by Webhook. Requests that dont match
                the allowed HTTP will be logged.
              </Typography>
            </DialogContent>

            <DialogContent sx={{ mb: 2 }}>
              <TextField
                autoFocus
                fullWidth
                type="email"
                margin="dense"
                variant="outlined"
                label="Destination URl"
                placeholder='Enter Webhook URL'
                helperText="Define where your events should be sent. Destinations can be reused across multiple connections."
              />
            </DialogContent>

            <DialogContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mb: 0 }}>Rate limit</Typography>
                <Box sx={{ flexGrow: 1 }} /> {/* This will take up the available space */}
                <Tooltip title="Activate request limit."
                  arrow
                  placement="top">
                  <FormControlLabel
                    justifyContent="end"
                    control={<Switch onChange={handleRatelimitToggle} />}
                  />
                </Tooltip>
              </Box>

              {showRatelimitField && (
                <TextField
                  id="outlined-Rate-limit"
                  select
                  fullWidth
                  // label="Select"
                  defaultValue="USD"
                  helperText=" Enable events rate limit to control the maximum throughput of events delivered to your destination."
                  sx={{ mt: 2 }}
                >
                  {Ratelimit.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </DialogContent>

            <DialogContent>
              <Typography sx={{ mb: 2, mt: 2 }}>Time Frame</Typography>

              <TextField
                id="outlined-select-currency"
                select
                fullWidth
                // label="Select"
                defaultValue="USD"
                helperText="Please select your time frame"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>

            <DialogContent sx={{ mb: 2 }}>
              <Typography sx={{ mb: 2, mt: 3 }}>Destination HTTP Method</Typography>

              <TextField
                id="outlined-select-currency"
                select
                fullWidth
                // label="Select"
                defaultValue="USD"
                helperText="Force the requests to your destination to use a specific HTTP method. By default, the request will be made with the same method as the original request."
              >
                {Destination.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>

            <Divider sx={{ borderStyle: 'dashed' }} />
            <CardHeader
              title="Set Connections Rules"
              subheader="Configure rules to change the behavior of events traveling through your connection."
              sx={{ mb: 2 }}
            />

            <DialogContent>
              <FormControlLabel control={
                <Tooltip title="Enable retries on failure." arrow placement="top">
                  <Switch onChange={handleRetryToggle} />
                </Tooltip>
              }
                label="Retry"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px' } }}
              />
              {showRetryField && (
                <>
                  <Typography sx={{ mb: 1, mt: 1, fontSize: '15px' }}>Strategy</Typography>
                  <TextField
                    id="outlined-select-numbers"
                    select
                    fullWidth
                    defaultValue="USD"
                    helperText="Configure a automatic retry strategy for any events delivery failures."
                  >
                    {Strategy.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Typography sx={{ mb: 1, mt: 2, fontSize: '15px' }}>Interval</Typography>
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    defaultValue="USD"
                    helperText="Configure a automatic retry strategy for any events delivery failures."
                    sx={{ mb: 1 }}
                  >
                    {Interval.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Typography sx={{ mb: 1, mt: 1, fontSize: '15px' }}>Every</Typography>
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    defaultValue="USD"
                    helperText="Configure a automatic retry strategy for any events delivery failures."
                    sx={{ mb: 1 }}
                  >
                    {Maximum.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Typography sx={{ mb: 1, mt: 1, fontSize: '15px' }}>Maximum Count</Typography>
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    defaultValue="USD"
                    helperText="Configure a automatic retry strategy for any events delivery failures."
                    sx={{ mb: 2 }}
                  >
                    {Maximum.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              )}
            </DialogContent>

            <DialogContent>
              <FormControlLabel control={
                <Tooltip title="Activate retry delay." arrow placement="top">
                  <Switch onChange={handleDelayToggle} />
                </Tooltip>
              }
                label="Delay"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px' } }}
              />
              {showDelayField && (
                <>
                  <Typography sx={{ mb: 1, mt: 1, fontSize: '15px' }}>Backoff Interval</Typography>
                  <TextField
                    id="outlined-Rate-limit"
                    select
                    fullWidth
                    // label="Delay between retries"
                    defaultValue="USD"
                    helperText="Incase destination endpoint is down."
                    sx={{ mt: 2 }}
                  >
                    {Ratelimit.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography sx={{ mb: 1, mt: 2, fontSize: '15px' }}>
                    Number of Retries When Backoff
                  </Typography>
                  <TextField
                    id="time select"
                    select
                    fullWidth
                    defaultValue="USD"
                    helperText="Incase destination endpoint is down."
                    sx={{ mb: 2 }}
                  >
                    {Time.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              )}
            </DialogContent>

            <DialogContent>
              <FormControlLabel control={
                <Tooltip title="Batch size to process." arrow placement="top">
                  <Switch onChange={handleBatchSizeToggle} />
                </Tooltip>
              }
                label="BatchSize"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px' } }}
              />
              {showBatchSizeField && (
                <TextField
                  fullWidth
                  label="Batch Size"
                  placeholder='Enter any number'
                  variant="outlined"
                  helperText="Define a Batch Size for the event."
                  sx={{ mb: 2, mt: 2 }}
                />
              )}
            </DialogContent>

            <DialogContent>

              <FormControlLabel control={
                <Tooltip title="Apply filter." arrow placement='top'>
                  <Switch onChange={handleFilterToggle} />
                </Tooltip>
              }
                label="Filter"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px' } }}
              />

              {showFilterField && (
                <Box sx={{ width: '100%' }}>
                  <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
                    <Tab label="Body" />
                    <Tab label="Headers" />
                    <Tab label="Query" />
                    <Tab label="Path" />
                  </Tabs>
                  <Box sx={{ pt: 2 }}>
                    {selectedTab === 0 && (
                      <TextField
                        fullWidth
                        // label="Body Content"
                        placeholder='Body Content'
                        variant="outlined"
                        helperText="Set the body content."
                        multiline
                        rows={4}
                        value={url}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ mt: -9.5 }}>
                              <Tooltip title="Copy Text" arrow placement="bottom">
                                <IconButton edge="end" onClick={handleCopy}>
                                  <Iconify width={18} icon="solar:copy-bold" />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    {selectedTab === 1 && (
                      <TextField
                        fullWidth
                        // label="Headers Content"
                        placeholder='Header Content'
                        variant="outlined"
                        helperText="Set the headers content."
                        multiline
                        rows={4}
                        value={url}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ mt: -9.5 }}>
                              <Tooltip title="Copy Text" arrow placement="bottom">
                                <IconButton edge="end" onClick={handleCopy}>
                                  <Iconify width={18} icon="solar:copy-bold" />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    {selectedTab === 2 && (
                      <TextField
                        fullWidth
                        // label="Query Parameters"
                        placeholder='Query Parameters'
                        variant="outlined"
                        helperText="Set the query parameters."
                        multiline
                        rows={4}
                        value={url}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ mt: -9.5 }}>
                              <Tooltip title="Copy Text" arrow placement="bottom">
                                <IconButton edge="end" onClick={handleCopy}>
                                  <Iconify width={18} icon="solar:copy-bold" />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    {selectedTab === 3 && (
                      <TextField
                        fullWidth
                        // label="Path Parameters"
                        placeholder='Path Parameters'
                        variant="outlined"
                        helperText="Set the path parameters."
                        multiline
                        rows={4}

                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ mt: -9.5 }}>
                              <Tooltip title="Copy Text" arrow placement="bottom">
                                <IconButton edge="end" onClick={handleCopy}>
                                  <Iconify width={18} icon="solar:copy-bold" />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Box>
                </Box>
              )}
            </DialogContent>

            <DialogContent sx={{ mb: 3, mt: 2 }}>
              <>
                <Button variant="contained" sx={{ mr: 2 }} onClick={handleClickOpen}>
                  Create
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Connection Successfully Setup!</DialogTitle>
                  <DialogContent>
                    {/* <Typography>Webhook URL</Typography> */}
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Webhook URL"
                      placeholder='webhook URL copy'
                      fullWidth
                      variant="outlined"
                      helperText='Use this URL to receive your requests from "dfsg". Valid requests to this URL will be sent to your destination "dfaddf", and Hookdeck will reply immediately with an HTTP 200.'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <Iconify width={18} icon="solar:copy-bold" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="inherit">
                      Cancel
                    </Button>
                    <Button onClick={handleOpenSnackbar} variant="contained" color="inherit">
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
              </>
              <Button onClick={handleClose} variant="outlined" color="inherit">
                Cancel
              </Button>
            </DialogContent>
          </Card>

          <Box mt={3}>
            <OrderListViewHome/>
          </Box>
        </Grid>

      </Grid>
    </DashboardContent>
  );
}