// TransformationDrawer.jsx
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import CodeMirror from '@uiw/react-codemirror';
// eslint-disable-next-line import/no-extraneous-dependencies
import { javascript } from '@codemirror/lang-javascript';

import {
  Box,
  Card,
  Alert,
  Button,
  Dialog,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import JsonEditorTabs from './json-editor-tabs';

const DEFAULT_FUNCTION = `(request, context) => {
  // You can transform the request data here
  return request;
}`;

export function TransformationDrawerUpdate({ transformationDrawerOpen, setTransformationDrawerOpen }) {
  const [consoleOutput, setConsoleOutput] = useState('');
  const [codeEditorValue, setCodeEditorValue] = useState(DEFAULT_FUNCTION);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseTransformationDrawer = () => {
    setTransformationDrawerOpen(false);
  };

  const handleClearConsole = () => {
    setConsoleOutput('');
  };

  // Updated executeCode function to handle input data
  const executeCode = (inputJson) => {
    try {
      // Reset console output
      setConsoleOutput('');

      if (!inputJson) {
        throw new Error('No input data provided');
      }

      // Create a proxy console to capture logs
      const logs = [];
      const proxyConsole = {
        log: (...args) => {
          logs.push(
            args
              .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
              .join(' ')
          );
        },
        error: (...args) => {
          const errorMessage = args
            .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
            .join(' ');
          logs.push(`Error: ${errorMessage}`);
        },
      };

      // Safe evaluation of the transformation function
      // eslint-disable-next-line no-eval
      const transformFn = (0, eval)(`(function(request, context, console) {
        try {
          const userFn = ${codeEditorValue};
          return userFn(request, context);
        } catch (err) {
          console.error(err.message);
          return null;
        }
      })`);

      // Execute the function with the provided input
      const result = transformFn(inputJson, {}, proxyConsole);

      // Update console output with any logged messages
      if (logs.length > 0) {
        setConsoleOutput(logs.join('\n'));
      }

      if (result === undefined) {
        throw new Error('Transformation function must return a value');
      }

      // Append success message to console
      setConsoleOutput((prev) => `${prev}${prev ? '\n' : ''}Transformation executed successfully`);

      return result;
    } catch (error) {
      const errorMessage = `Error: ${error.message}`;
      setConsoleOutput((prev) => `${prev}${prev ? '\n' : ''}${errorMessage}`);
      return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
        ml: 2,
        mr: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography sx={{ color: 'primary', fontSize: '24px', fontWeight: 700 }}>
            Transformation
          </Typography>
          <Typography sx={{ color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}>
            A transformation lets you modify the payload of an event prior to delivery.{' '}
            <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>
              Learn more
            </a>
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Update
          </Button>
          <Dialog open={open} onClose={handleClose}  PaperProps={{
          style: { width: '500px', maxWidth: '500px' }, // Set the width here
        }}>
            <DialogTitle>
              <Tooltip title="Create a Transformation." arrow placement="top">
                Create Transformation
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
            label="Transformation Name"
            placeholder="Name of the Transformation"
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Enter transformation name here" disableInteractive arrow placement="top">
                      <Iconify icon="material-symbols:info-outline" />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
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
              <Button onClick={handleClose} variant="outlined" color="inherit">
                Cancel
              </Button>
              <Button onClick={handleOpenSnackbar} variant="contained" color="primary">
                Save
              </Button>
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
                 Transformation successfully setup.
                </Alert>
              </Snackbar>
            </DialogActions>
          </Dialog>
          <IconButton onClick={handleCloseTransformationDrawer}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ mt: 2, width: '100%' }} />

      <Card sx={{ width: '100%', height: '100vh', display: 'flex', mt: 2 }}>
        <Box sx={{ width: '30%' }}>
          <JsonEditorTabs onExecute={executeCode} />
        </Box>
        <Divider orientation="vertical" />
        <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
          <Box>
            <CodeMirror
              value={codeEditorValue}
              height="500px"
              onChange={setCodeEditorValue}
              extensions={[javascript()]}
              theme="light"
              className="border rounded"
            />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              height: '50px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: 'primary',
                fontSize: '20px',
                fontWeight: 600,
                ml: 2,
                mt: 0.8,
                mb: 0.6,
              }}
            >
              Console
            </Typography>
            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={handleClearConsole}
            >
              Clear Console
            </Button>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box
            sx={{
              width: '100%',
              pl: 2,
              pt: 2,
              height: '100%',
              backgroundColor: '#f5f5f5',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
            }}
          >
            {consoleOutput}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
