import React, { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Tooltip, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { ModalVideoView } from 'src/assets/illustrations';

import { HomeTableView} from 'src/sections/orderhome/view';
import { TrashTableView } from 'src/sections/ordertrash/view';
import { FolderSection } from 'src/sections/folder-section/folder-section';
import { CreateConnectionFormDialog } from 'src/sections/dialog-view/create-connection-form-dialog';

import { BigCardView } from '../Bigcard';

export function SetupConnectionForm() {
  const [showTrash, setShowTrash] = useState(false);

  const handleTrashClick = () => {
    setShowTrash(true); // Switch to showing trash view
  };

  const handleHomeClick = () => {
    setShowTrash(false); // Switch back to home (main view)
  };

  return (
    <DashboardContent maxWidth="xl" sx={{ px: { xs: 0, sm: 0, lg: 5, xl: 0 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <FolderSection handleTrashClick={handleTrashClick} handleHomeClick={handleHomeClick} />
        </Grid>

        {/* Content Section (Right side) */}
        <Grid item xs={12} md={8} lg={9}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {/* No Connections Card */}
            <Card sx={{ mb: 3, width: '100%' }}>
              <BigCardView
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
                    <Typography variant="h6"  sx={{color:'#1c252e'}}>
                      No Connections found!
                    </Typography>
                  </Tooltip>
                }
                description="There may be no Connections in the folder or for the applied filter conditions. You can create a Connection by following the steps below."
                step1="Click on the 'Create Connection' button available in the top right section."
                step2="Now select apps you want to integrate into the trigger and action step."
                step3="Once the Connection is completed, save and enable it."
                img={<ModalVideoView hideBackground />}
                action={<CreateConnectionFormDialog variant="outlined" />}
              />
            </Card>

            {/* Order List (Align right) */}
            <Box sx={{ width: '100%' }}>
              <Card>
                {showTrash ? (
                  <TrashTableView/> // Show trash view if trash is selected
                ) : (
                  <HomeTableView/> // Show main content view (OrderListView) if Home is selected
                )}
              </Card>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
