// JsonEditorTabs.jsx
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import CodeMirror from '@uiw/react-codemirror';
// eslint-disable-next-line import/no-extraneous-dependencies
import { javascript } from '@codemirror/lang-javascript';

import { Box, Tab, Tabs, Button } from '@mui/material';

const DEFAULT_INPUT = `{
  "example": "data"
}`;

const JsonEditorTabs = ({ onExecute }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [inputValue, setInputValue] = useState(DEFAULT_INPUT);
  const [outputValue, setOutputValue] = useState('');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleExecute = () => {
    try {
      // Parse the input JSON
      const inputJson = JSON.parse(inputValue);

      // Execute the transformation
      const result = onExecute(inputJson);

      // Update output if result is not null
      if (result !== null) {
        setOutputValue(JSON.stringify(result, null, 2));
        setSelectedTab(1); // Switch to output tab
      }
    } catch (error) {
      console.error('Invalid JSON input:', error);
      setOutputValue(`Error: Invalid JSON input - ${error.message}`);
      setSelectedTab(1); // Switch to output tab to show error
    }
  };

  return (
    <div className="w-full">
      <Box>
        <Box sx={{ display: 'flex' ,justifyContent:'space-between' ,mr:1}}>
          <Box>
            <Tabs value={selectedTab} onChange={handleTabChange} className="border-b">
              <Tab label="Input" />
              <Tab label="Output" />
            </Tabs>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button variant="contained" size="small" color="primary" onClick={handleExecute}>
              Run
            </Button>
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          {selectedTab === 0 && (
            <CodeMirror
              value={inputValue}
              height="100vh"
              onChange={handleInputChange}
              extensions={[javascript()]}
              theme="light"
              className="border rounded"
            />
          )}
          {selectedTab === 1 && (
            <CodeMirror
              value={outputValue}
              height="100vh "
              editable={false}
              extensions={[javascript()]}
              theme="light"
              className="border rounded"
            />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default JsonEditorTabs;
