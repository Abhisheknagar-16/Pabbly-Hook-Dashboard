import { memo, useState } from 'react';
import { CloseIcon } from 'yet-another-react-lightbox';

import { useTheme } from '@mui/material/styles';
import { Box, Card, Dialog, Tooltip, IconButton } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

function MotivationIllustration({ hideBackground, sx, ...other }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <Tooltip disableInteractive title="Click to watch tutorial." arrow placement="top">
        <Card>
          <img
            src={`${CONFIG.site.basePath}https://testhooks.pabbly.com/static/media/video-thumbnail.b1ad052c3966098dccce.png`}
            alt="Background"
          />
        </Card>
        <IconButton
          aria-label="play"
          onClick={handleClickOpen}
          sx={{
            padding: '0px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#078DEE',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                transform: 'translate(-50%, -50%) scale(1)',
                boxShadow: '0 0 0 0 rgba(7, 141, 238, 0.7)',
              },
              '70%': {
                transform: 'translate(-50%, -50%) scale(1.1)',
                boxShadow: '0 0 0 10px rgba(7, 141, 238, 0)',
              },
              '100%': {
                transform: 'translate(-50%, -50%) scale(1)',
                boxShadow: '0 0 0 0 rgba(7, 141, 238, 0)',
              },
            },
          }}
        >
          <Iconify icon="icon-park-solid:play" width={50} height={50} />
        </IconButton>
      </Tooltip>


      {/* Dialog */}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{ '& .MuiDialog-paper': { width: 1080, height: 600 } }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="iframe"
          src="https://www.youtube.com/embed/mnJFZxwhiEQ?si=oxXcH4GoSTRxfsv8" // Replace with your video ID
          sx={{ width: '100%', height: '100%', border: 'none' }}
        />
      </Dialog>
    </div>
  );
}

export default memo(MotivationIllustration);
