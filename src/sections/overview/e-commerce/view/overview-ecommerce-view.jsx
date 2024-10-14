import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Card,
  Dialog,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { MotivationIllustration } from 'src/assets/illustrations';

import { Iconify } from 'src/components/iconify';

import { OrderListViewHome } from 'src/sections/orderhome/view';
import { OrderListViewtrash } from 'src/sections/ordertrash/view';
import { FormDialog } from 'src/sections/dialog-view/form-dialog';
import { CustomStyling } from 'src/sections/tree-view/custom-styling';

import { EcommerceWelcome } from '../ecommerce-welcome';

const selectfolder = [
  { value: 'USD', label: 'Main' },
  { value: 'EUR', label: 'Hello' },
  { value: 'BTC', label: 'Subtree with children' },
  { value: 'JPY', label: 'World' },
];

export function OverviewEcommerceView() {
  const [dopen, setdopen] = useState(false);
  const [showTrash, setShowTrash] = useState(false);

  // Open and close dialog
  const handledopen = () => setdopen(true);
  const handledlose = () => setdopen(false);

  // Toggle between showing trash and showing home content
  const handleTrashClick = () => {
    setShowTrash(true);  // Switch to showing trash view
  };

  const handleHomeClick = () => {
    setShowTrash(false);  // Switch back to home (main view)
  };

  return (
    <DashboardContent maxWidth="xl" sx={{ px: { xs: 0, sm: 0, lg: 5, xl: 0 } }}>
      <Grid container spacing={3}>
        {/* Folder Section (Left side) */}
        <Grid item xs={12} md={4} lg={3}>
          <Card sx={{ pl: 2.4, pr: 2, pt: 2, pb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tooltip disableInteractive title={
                  <div style={{ textAlign: 'center' }}>
                    You can create folders and manage connections inside them.
                  </div>
                } arrow placement="top">
                  <span>Folders</span>
                </Tooltip>

                <IconButton onClick={handledopen} edge="end" sx={{ mr: 0.6, mt: -0.8 }}>
                  <Tooltip disableInteractive title="Create a new folder." arrow placement="top">
                    <Iconify icon="icon-park-solid:add" style={{ color: 'black' }} width="12" />
                  </Tooltip>
                </IconButton>
              </Box>
            </Typography>
            <Divider sx={{ borderStyle: 'dashed', mb: 0.6, mt: 1 }} />
            {/* Pass both onTrashClick and onHomeClick to CustomStyling */}
            <CustomStyling onTrashClick={handleTrashClick} onHomeClick={handleHomeClick} />
          </Card>
        </Grid>

        {/* Content Section (Right side) */}
        <Grid item xs={12} md={8} lg={9}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {/* No Connections Card */}
            <Card sx={{ mb: 3, width: '100%' }}>
              <EcommerceWelcome
                title={
                  <Tooltip
                    disableInteractive
                    title={
                      <div style={{ textAlign: 'center' }}>
                        No existing connections. Create a new one using the steps below.
                      </div>
                    }
                    arrow
                    placement="top"
                  >
                    <Typography variant="h6" fontWeight={700} color="#1c252e">
                      No Connections found!
                    </Typography>
                  </Tooltip>
                }
                description="There may be no Connections in the folder or for the applied filter conditions. You can create a Connection by following the steps below."
                step1="Click on the 'Create Connection' button available in the top right section."
                step2="Now select apps you want to integrate into the trigger and action step."
                step3="Once the Connection is completed, save and enable it."
                img={
                  <Tooltip disableInteractive title="Click to watch tutorial." arrow placement="top">
                    <div>
                      <MotivationIllustration hideBackground />
                    </div>
                  </Tooltip>
                }
                action={<FormDialog variant="outlined" />}
              />
            </Card>

            {/* Order List (Align right) */}
            <Box sx={{ width: '100%' }}>
              <Card>
                {showTrash ? (
                  <OrderListViewtrash />  // Show trash view if trash is selected
                ) : (
                  <OrderListViewHome /> // Show main content view (OrderListView) if Home is selected
                )}
              </Card>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Folder Dialog */}
      <Dialog open={dopen} onClose={handledlose} sx={{ position: 'fixed' }}>
        <DialogTitle>
          <Tooltip title="Create a connection with a name and folder location." arrow placement="top">
            Create Folder
          </Tooltip>
        </DialogTitle>
        <Divider sx={{ borderStyle: 'dashed', mb: 2 }}/>
        <DialogContent>
          <TextField
            // autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            placeholder="Name of the Connection"  
            label="Folder Name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Enter folder name here" disableInteractive arrow placement="top">
                  <Iconify icon="material-symbols:info-outline"  />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
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
          <Button onClick={handledlose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handledlose} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
