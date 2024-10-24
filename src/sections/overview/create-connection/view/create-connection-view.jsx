import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript'; // Correct import

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
  Drawer,
  Divider,
  Tooltip,
  MenuItem,
  Checkbox,
  TextField,
  CardHeader,
  Typography,
  IconButton,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// import { OrderListViewHome } from 'src/sections/orderhome/view';
import { CustomStyling } from 'src/sections/tree-view/custom-styling';
import { TransformationDrawer } from 'src/sections/dialog-view/transformation-drawer';

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
    label: 'JSON',
  },
  {
    value: 'EUR',
    label: 'Plain text',
  },
];
const Transformation = [
  {
    value: 'USD',
    label: 'Select Transformation',
  },
  {
    value: 'UtD',
    label: 'Test 1',
  },
  {
    value: 'EUR',
    label: 'Test 2',
  },
  {
    value: 'BTC',
    label: 'Test 3',
  },
  {
    value: 'JPY',
    label: 'Test 4',
  },
];
const Time = [
  {
    value: 'USD',
    label: 'Second',
  },
  {
    value: 'EUR',
    label: 'Minute',
  },
  {
    value: 'BTC',
    label: 'Hour',
  },
  {
    value: 'JPY',
    label: 'Day',
  },
];

// ----------------------------------------------------------------------

export function CreateConnection() {
  const [open, setOpen] = useState(false);
  const [dopen, setdopen] = useState(false);

  const [urlrequired1, setUrlrequied1] = useState('');
  const [errorrequired1, setError1] = useState(false);

  const handleChangetext1 = (event) => {
    setUrlrequied1(event.target.value);

    // Simple validation: check if the field is empty
    if (event.target.value === '') {
      setError1(true);
    } else {
      setError1(false);
    }
  };

  const [transformationDrawerOpen, setTransformationDrawerOpen] = useState(false);

  const handleOpenTranformationDrawer = () => {
    setTransformationDrawerOpen(true);
  };

  const handleCloseTransformationDrawer = () => {
    setTransformationDrawerOpen(false);
  };

  const [urlrequired, setUrlrequied] = useState('');
  const [errorrequired, setError] = useState(false);

  const handleChangetext = (event) => {
    setUrlrequied(event.target.value);

    // Simple validation: check if the field is empty
    if (event.target.value === '') {
      setError(true);
    } else {
      setError(false);
    }
  };
  const [checkboxState, setCheckboxState] = useState({
    GET: true,
    POST: false,
    PUT: false,
    PATCH: false,
    DELETE: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxState((prev) => ({ ...prev, [name]: checked }));
  };

  // Calculate how many checkboxes are checked
  const checkedCount = Object.values(checkboxState).filter(Boolean).length;

  const initialJsonData = {
    apiKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzRhZDgwMzU2MDZjMTM1Zjk5NTgxZiIsIm5hbWUiOiJBaVNlbnN5IERlbW8gQWNjb3VudCIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2MzAyOWM3Mjg1ODcxODUxYTQ5MzJmNTgiLCJhY3RpdmVQbGFuIjoiUFJPX01PTlRITFkiLCJpYXQiOjE3MjgzNzQ5ODV9.6N7-Y7rYAIkyYkf_ti5TRfCChwKyWY0Gai5tzP2QnVI',
    campaignName: 'New Camp 16 Oct',
    destination: '919581984489',
    userName: 'AiSensy Demo Account',
    templateParams: ['$FirstName', '$FirstName'],
    source: 'new-landing-page form',
    media: {},
    buttons: [],
    carouselCards: [],
    location: {},
    paramsFallbackValue: {
      FirstName: 'user',
    },
  };
  const [code, setCode] = useState(JSON.stringify(initialJsonData, null, 2));

  const [selectedFormat, setSelectedFormat] = useState('USD'); // Default format

  const [plainText, setPlainText] = useState('');

  const handleCodeChange = (value) => {
    setCode(value); // Update code as a string

    try {
      const parsedData = JSON.parse(value); // Attempt to parse JSON
      console.log('Parsed JSON:', parsedData); // For debugging or additional handling
    } catch (error) {
      console.error('Invalid JSON format:', error); // Handle invalid JSON
    }
  };

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handlePlainTextChange = (event) => {
    setPlainText(event.target.value);
  };

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

  const { user } = useMockedUser();

  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [showRatelimitField, setShowRatelimitField] = useState(false);
  const [showCustomresponseField, setShowRetryField] = useState(false);
  const [showDelayField, setShowDelayField] = useState(false);
  const [showTransformationField, setTransformationField] = useState(false);
  const [showFilterField, setShowFilterField] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleRatelimitToggle = (event) => {
    setShowRatelimitField(event.target.checked);
  };

  const handlecustomToggle = (event) => {
    setShowRetryField(event.target.checked);
  };

  const handleDelayToggle = (event) => {
    setShowDelayField(event.target.checked);
  };

  const handleTransformationToggle = (event) => {
    setTransformationField(event.target.checked);
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
        <Grid item xs={12} md={3} lg={3}>
          <Card sx={{ pl: 2.4, pr: 2, pt: 2, pb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tooltip title="Manage folders" arrow placement="top">
                  Folder
                </Tooltip>
                <IconButton onClick={handledopen} edge="end" sx={{ mr: 0.6, mt: -0.8 }}>
                  <Tooltip title="Create a new folder." arrow placement="top">
                    <Iconify icon="icon-park-solid:add" style={{ color: 'black' }} width="12" />
                  </Tooltip>
                </IconButton>

                <Dialog open={dopen} onClose={handledlose}>
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
                      error={errorrequired1}
                      value={urlrequired1}
                      onChange={handleChangetext1}
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
                            <Tooltip
                              title="Enter folder name here"
                              disableInteractive
                              arrow
                              placement="top"
                            >
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

                    {/* <Typography sx={{ mt: 2 }}>Select Folder</Typography> */}

                    <TextField
                      id="outlined-select-currency"
                      sx={{ mt: 2 }}
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
                    <Button onClick={handledlose} variant="outlined">
                      Cancel
                    </Button>
                    <Button onClick={handledlose} variant="contained" color="primary">
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
            <CardHeader
              sx={{ mt: -1 }}
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
                placeholder="Name of the Connection"
                label="Connection Name"
                helperText="Enter the name of the connection."
                sx={{ mt: 3 }}
              />
            </DialogContent>

            <DialogContent sx={{ mb: 2 }}>
              <TextField
                autoFocus
                fullWidth
                type="email"
                margin="dense"
                variant="outlined"
                label="Webhook URL"
                placeholder="Enter URL"
                helperText="Copy and paste the Pabbly Hook URL into your request source."
                value={url}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title="Click to copy Pabbly Hook webhook URL."
                        arrow
                        placement="top"
                      >
                        <IconButton edge="end" onClick={handleCopy}>
                          <Iconify width={18} icon="solar:copy-bold" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </DialogContent>

            <DialogContent sx={{ mb: 1 }}>
              
            <Typography sx={{ mb: 1 }}>
    <Tooltip title="Select HTTP Methods." arrow  placement="top">
      <span>HTTP Methods</span>
    </Tooltip>
  </Typography>

              <FormControl required error={checkedCount < 1}>
                <Box flexDirection="row" justifyContent="center" sx={{ ml: 0.3 }}>
                  <FormControlLabel
                    label="GET"
                    control={
                      <Checkbox
                        size="normal"
                        checked={checkboxState.GET}
                        onChange={handleCheckboxChange}
                        name="GET"
                      />
                    }
                  />
                  <FormControlLabel
                    label="POST"
                    control={
                      <Checkbox
                        size="normal"
                        checked={checkboxState.POST}
                        onChange={handleCheckboxChange}
                        name="POST"
                      />
                    }
                  />
                  <FormControlLabel
                    label="PUT"
                    control={
                      <Checkbox
                        size="normal"
                        checked={checkboxState.PUT}
                        onChange={handleCheckboxChange}
                        name="PUT"
                      />
                    }
                  />
                  <FormControlLabel
                    label="PATCH"
                    control={
                      <Checkbox
                        size="normal"
                        checked={checkboxState.PATCH}
                        onChange={handleCheckboxChange}
                        name="PATCH"
                      />
                    }
                  />
                  <FormControlLabel
                    label="DELETE"
                    control={
                      <Checkbox
                        size="normal"
                        checked={checkboxState.DELETE}
                        onChange={handleCheckboxChange}
                        name="DELETE"
                      />
                    }
                  />
                </Box>

                <FormHelperText>
                  {checkedCount < 1
                    ? 'Select at least one HTTP methods that will be used for the webhook.'
                    : "Allow only specific HTTP methods to be accepted. Requests that don't match the allowed HTTP will be logged."}
                </FormHelperText>
              </FormControl>
            </DialogContent>

            <DialogContent sx={{ mb: 2 }}>
              <TextField
                error={errorrequired}
                value={urlrequired}
                onChange={handleChangetext}
                autoFocus
                fullWidth
                required
                type="email"
                margin="dense"
                variant="outlined"
                label="Destination URL"
                placeholder="Enter Webhook URL"
                helperText={
                  errorrequired
                    ? 'This field is required.'
                    : 'Enter the destination webhook URL where Pabbly Hook will forward the webhook data for processing.'
                }
              />
            </DialogContent>

            <DialogContent>
              <Typography sx={{ mb: 2 }}>Destination HTTP Method</Typography>

              <TextField
                id="outlined-select-currency"
                select
                fullWidth
                // label="Select"
                defaultValue="USD"
                helperText="Specify the HTTP method for requests to your destination. By default, the request will use the same method as the original request."
              >
                {Destination.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>

            <DialogContent sx={{ mt: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Tooltip
                      title="Click to enable or disable rate limit."
                      disableInteractive
                      arrow
                      placement="top"
                    >
                      <Switch onChange={handleRatelimitToggle} />
                    </Tooltip>
                  }
                  label={
                    <Tooltip
                      title={
                        <div style={{ textAlign: 'center' }}>
                          Set the event delivery rate to control the maximum number of events sent
                          to your destination.
                        </div>
                      }
                      disableInteractive
                      arrow
                      placement="top"
                    >
                      <Typography sx={{ fontSize: '15px' }}>Rate Limit</Typography>
                    </Tooltip>
                  }
                  labelPlacement="end" // Places the label next to the switch
                />
              </Box>

              {showRatelimitField && (
                <>
                  <Typography sx={{ mt: 1, fontSize: '15px' }}>Rate Limit</Typography>
                  <TextField
                    id="outlined-Rate-limit"
                    select
                    fullWidth
                    // label="Select"
                    defaultValue="USD"
                    helperText="Enter the maximum number of events allowed in the time frame."
                    sx={{ mt: 2 }}
                  >
                    {Ratelimit.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography sx={{ mb: 2, mt: 2 }}>Time Frame</Typography>
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    // label="Select"
                    defaultValue="USD"
                    helperText="Select the time period for the rate limit (e.g., per second, per minute, per hours)."
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              )}
            </DialogContent>

            <Divider sx={{ borderStyle: 'dashed' }} />
            <CardHeader
              title="Set Connections Rules"
              subheader="Configure rules to change the behavior of events traveling through your connection."
              sx={{ mb: 2 }}
            />

            <DialogContent>
              <FormControlLabel
                control={
                  <Tooltip
                    title="Click to enable or disable transformation."
                    disableInteractive
                    arrow
                    placement="top"
                  >
                    <Switch onChange={handleDelayToggle} />
                  </Tooltip>
                }
                label={
                  <Tooltip
                    title={
                      <div style={{ textAlign: 'center' }}>
                        Set the delay between receiving an event and delivering it.
                      </div>
                    }
                    disableInteractive
                    arrow
                    placement="top"
                  >
                    <Typography sx={{ fontSize: '15px' }}>Delay</Typography>
                  </Tooltip>
                }
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px' } }}
              />
              {showDelayField && (
                <>
                  <Typography sx={{ mt: 1, fontSize: '15px' }}>Backoff Interval</Typography>
                  <TextField
                    id="outlined-Rate-limit"
                    select
                    fullWidth
                    // label="Delay between retries"
                    defaultValue="USD"
                    helperText="Incase destination endpoint is down."
                    sx={{ mt: 1 }}
                  >
                    {Ratelimit.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography sx={{ mb: 1, mt: 2, fontSize: '15px' }}>Time Limit Period</Typography>
                  <TextField
                    id="time select"
                    select
                    fullWidth
                    defaultValue="USD"
                    helperText="Select the time unit."
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
              <FormControlLabel
                control={
                  <Tooltip
                    title="Click to enable or disable transformation."
                    disableInteractive
                    arrow
                    placement="top"
                  >
                    <Switch onChange={handleTransformationToggle} />
                  </Tooltip>
                }
                label={
                  <Tooltip
                    title={
                      <div style={{ textAlign: 'center' }}>
                        A transformation allows you to modify an event&apos;s payload before
                        it&apos;s delivered.
                      </div>
                    }
                    disableInteractive
                    arrow
                    placement="top"
                  >
                    <Typography sx={{ fontSize: '15px' }}>Transformation</Typography>
                  </Tooltip>
                }
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px' } }}
              />
              {showTransformationField && (
                <>
                  {/* <Typography sx={{ mt: 1, fontSize: '15px' }}>Transform</Typography> */}
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    defaultValue="USD"
                    helperText="Select a transformation."
                    sx={{ mb: 2, mt: 2 }}
                  >
                    {Transformation.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleOpenTranformationDrawer}
                    startIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"
                        />
                      </svg>
                    }
                    sx={{ mb: 2 }}
                  >
                    Create Transformation
                  </Button>
                  <Drawer
                    open={transformationDrawerOpen}
                    onClose={handleCloseTransformationDrawer}
                    anchor="right"
                    slotProps={{ backdrop: { invisible: true } }}
                    PaperProps={{
                      sx: {
                        width: { xs: '100%', sm: '100%', md: '80%' }, // Adjust width based on screen size
                        '@media (max-width: 300px)': {
                          padding: '16px',
                        },
                      },
                    }}
                  >
                    <TransformationDrawer
                      transformationDrawerOpen={transformationDrawerOpen}
                      setTransformationDrawerOpen={setTransformationDrawerOpen}
                    />
                  </Drawer>
                </>
              )}
            </DialogContent>

            <DialogContent>
              <FormControlLabel
                control={
                  <Tooltip
                    title="Click to enable or disable custom response."
                    disableInteractive
                    arrow
                    placement="top"
                  >
                    <Switch onChange={handlecustomToggle} />
                  </Tooltip>
                }
                label={
                  <Tooltip
                    title={
                      <div style={{ textAlign: 'center' }}>
                        Replace the default Pabbly Hook HTTP response with a custom static response
                        in JSON or TXT format.
                      </div>
                    }
                    disableInteractive
                    arrow
                    placement="top"
                  >
                    <Typography sx={{ fontSize: '15px' }}>Custom Response</Typography>
                  </Tooltip>
                }
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px' } }}
              />
              {showCustomresponseField && (
                <>
                  <Typography sx={{ mb: 1, mt: 1, fontSize: '15px' }}>Content Type</Typography>
                  <TextField
                    id="outlined-select-numbers"
                    select
                    fullWidth
                    value={selectedFormat}
                    onChange={handleFormatChange}
                    helperText="Select the format of response."
                    sx={{ mb: 1 }}
                  >
                    {Strategy.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Typography sx={{ mb: 1, mt: 1, fontSize: '15px' }}>Content</Typography>
                  <Box
                    sx={{
                      ...(selectedFormat === 'USD' && {
                        border: '1px solid #ccc', // Dashed border styling only for JSON (CodeMirror) field
                        borderRadius: 1,
                        padding: 1,
                      }),
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    {selectedFormat === 'USD' ? (
                      <CodeMirror
                        value={code}
                        height="200px"
                        extensions={[javascript()]}
                        onChange={handleCodeChange}
                        theme="light"
                      />
                    ) : (
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={plainText}
                        onChange={handlePlainTextChange}
                        variant="outlined"
                        placeholder="Enter text here..."
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ mt: -9.5 }}>
                              <Tooltip title="Copy " arrow placement="bottom">
                                <IconButton
                                  edge="end"
                                  onClick={() => navigator.clipboard.writeText(plainText)}
                                >
                                  <Iconify width={18} icon="solar:copy-bold" />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Box>
                </>
              )}
            </DialogContent>

            <DialogContent>
              <FormControlLabel
                control={
                  <Tooltip
                    title="Click to enable or disable filter."
                    disableInteractive
                    arrow
                    placement="top"
                  >
                    <Switch onChange={handleFilterToggle} />
                  </Tooltip>
                }
                label={
                  <Tooltip
                    title={
                      <div style={{ textAlign: 'center' }}>
                        Filter the event based on the request body, headers, query or path.
                      </div>
                    }
                    disableInteractive
                    arrow
                    placement="top"
                  >
                    <Typography sx={{ fontSize: '15px' }}>Filter</Typography>
                  </Tooltip>
                }
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
                        placeholder="Body Content"
                        variant="outlined"
                        helperText="Set the body content."
                        multiline
                        rows={4}
                        value={url}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ mt: -9.5 }}>
                              <Tooltip title="Click here to copy." arrow placement="top">
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
                        placeholder="Header Content"
                        variant="outlined"
                        helperText="Set the headers content."
                        multiline
                        rows={4}
                        value={url}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ mt: -9.5 }}>
                              <Tooltip title="Click here to copy." arrow placement="top">
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
                        placeholder="Query Parameters"
                        variant="outlined"
                        helperText="Set the query parameters."
                        multiline
                        rows={4}
                        value={url}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ mt: -9.5 }}>
                              <Tooltip title="Click here to copy." arrow placement="top">
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
                        placeholder="Path Parameters"
                        variant="outlined"
                        helperText="Set the path parameters."
                        multiline
                        rows={4}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ mt: -9.5 }}>
                              <Tooltip title="Click here to copy." arrow placement="top">
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
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  color="primary"
                  onClick={handleClickOpen}
                >
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
                      placeholder="webhook URL copy"
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
                    {/* <Button onClick={handleOpenSnackbar} variant="contained" color="primary">
                      Create
                    </Button> */}
                    <Snackbar
                      open={openSnackbar}
                      autoHideDuration={1000}
                      onClose={handleCloseSnackbar}
                      message="This is an error Alert."
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      sx={{
                        boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
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
              </>
              <Button onClick={handleClose} variant="outlined" color="inherit">
                Cancel
              </Button>
            </DialogContent>
          </Card>

          {/* <Box mt={3}>
            <OrderListViewHome />
          </Box> */}
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
