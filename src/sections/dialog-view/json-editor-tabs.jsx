import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import { Box, Tab, Tabs } from '@mui/material';


const JsonEditorTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [inputValue, setInputValue] = useState('{\n  "example": "data"\n}');
  const [outputValue, setOutputValue] = useState('{\n  "result": "processed"\n}');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    // You can add your processing logic here to update the output
  };

  return (
    <div className="w-full max-w-xl">
      <Box className="border rounded-lg shadow-sm">
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange}
          className="border-b"
        >
          <Tab className="w-1/2" label="Input" />
          <Tab className="w-1/2" label="Output" />
        </Tabs>
        
        <div className="p-4">
          {selectedTab === 0 && (
            <CodeMirror
              value={inputValue}
              height="100vh"
              onChange={handleInputChange}
              extensions={[javascript()]}
              theme="dark"
              className="border rounded"
            />
          )}
          {selectedTab === 1 && (
            <CodeMirror
              value={outputValue}
              height="100vh"
              editable={false}
              extensions={[javascript()]}
              theme="dark"
              className="border rounded"
            />
          )}
        </div>
      </Box>
    </div>
  );
};

export default JsonEditorTabs;