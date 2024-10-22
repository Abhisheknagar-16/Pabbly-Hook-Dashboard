import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import { Box, Card, Button, Divider, IconButton, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import JsonEditorTabs from './json-editor-tabs';

export function TransformationDrawer({ transformationDrawerOpen, setTransformationDrawerOpen }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const [outputTabValue, setOutputTabValue] = useState('sample output');

  const handleOpenDrawer = () => {
    setTransformationDrawerOpen(true);
  };

  const handleCloseTransformationDrawer = () => {
    setTransformationDrawerOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const [codeEditorInputValue, setCodeEditorInputValue] = useState('{\n  "example": "data"\n}');
  const handleCodeEditorInputChange = (value) => {
    setCodeEditorInputValue(value);
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
        // backgroundColor:'yellow'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          // backgroundColor:'red',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            sx={{
              color: 'primary',
              fontSize: '24px',
              fontWeight: 700,
            }}
          >
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
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Save
          </Button>
          <IconButton onClick={handleCloseTransformationDrawer}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ mt: 2, width: '100%' }} />

      <Card sx={{ width: '100%', height: '100vh', display: 'flex', mt: 2 }}>
        <Box sx={{ width: '30%' }}>
          <JsonEditorTabs />
        </Box>
        <Divider orientation="vertical" />
        <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ height: '50px', borderBottom: '1px solid #e9ebee ' }}>
            <Box>
              <Button variant="contained" color="primary" sx={{ ml: 2, mt: 0.8, mb: 0.6 }}>
                Run
              </Button>
            </Box>
          </Box>
          <Box>
            <CodeMirror
              value={codeEditorInputValue}
              height="500px"
              onChange={handleCodeEditorInputChange}
              extensions={[javascript()]}
              theme="light"
              className="border rounded"
            />
          </Box>
          <Divider sx={{mb:2}}/>
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
            >
              Clear Console
            </Button>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box sx={{ width: '100%',pl:2,pt:2, height:'100%',backgroundColor:'#f5f5f5' }}>
            {outputTabValue}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
