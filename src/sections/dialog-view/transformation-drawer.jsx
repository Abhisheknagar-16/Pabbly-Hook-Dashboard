// TransformationDrawer.jsx
import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import { Box, Card, Button, Divider, IconButton, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import JsonEditorTabs from './json-editor-tabs';

const DEFAULT_FUNCTION = `(request, context) => {
  // You can transform the request data here
  return request;
}`;

export function TransformationDrawer({ transformationDrawerOpen, setTransformationDrawerOpen }) {
  const [consoleOutput, setConsoleOutput] = useState('');
  const [codeEditorValue, setCodeEditorValue] = useState(DEFAULT_FUNCTION);
  
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
            args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ')
          );
        },
        error: (...args) => {
          const errorMessage = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          logs.push(`Error: ${errorMessage}`);
        }
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
      setConsoleOutput(prev => 
        `${prev}${prev ? '\n' : ''}Transformation executed successfully`
      );

      return result;

    } catch (error) {
      const errorMessage = `Error: ${error.message}`;
      setConsoleOutput(prev => `${prev}${prev ? '\n' : ''}${errorMessage}`);
      return null;
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      mt: 2,
      ml: 2,
      mr: 2,
    }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Box>
          <Typography sx={{ color: 'primary', fontSize: '24px', fontWeight: 700 }}>
            Transformation
          </Typography>
          <Typography sx={{ color: 'text.disabled', fontSize: '16px', fontWeight: 400 }}>
            A transformation lets you modify the payload of an event prior to delivery.{' '}
            <a href="#" style={{ color: '#078DEE', textDecoration: 'underline' }}>Learn more</a>
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" color="primary" >Save</Button>
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
          <Box sx={{
            height: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography sx={{
              color: 'primary',
              fontSize: '20px',
              fontWeight: 600,
              ml: 2,
              mt: 0.8,
              mb: 0.6,
            }}>
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
          <Box sx={{ 
            width: '100%',
            pl: 2,
            pt: 2,
            height: '100%',
            backgroundColor: '#f5f5f5',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap'
          }}>
            {consoleOutput}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}