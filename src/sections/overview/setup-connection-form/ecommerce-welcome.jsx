import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function EcommerceWelcome({
  title,
  description,
  step1,
  step2,
  step3,
  action,
  img,
  sx,
  ...other
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: `to right, ${theme.vars.palette.grey[200]} 25%, ${varAlpha(
            theme.vars.palette.primary.darkerChannel,
            0.88
          )}`,
          imgUrl: `${CONFIG.site.basePath}/assets/background/`,
        }),
        pt: 5,
        pb: 5,
        pr: { xs: 2, md: 5 },
        gap: 5,
        borderRadius: 2,
        display: 'flex',
        height: { md: 1 },
        position: 'relative',
        pl: { xs: 3, md: 5 },
        alignItems: 'center',
        color: 'common.white',
        textAlign: { xs: 'center', md: 'left' },
        flexDirection: { xs: 'column', md: 'row' },
        // border: `solid 1px ${theme.vars.palette.grey[300]}`,
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Typography variant="h4" sx={{ color: '#212529', whiteSpace: 'pre-line', mb: 2}}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '14px',
            maxWidth: 700,
            ...(action && { mb: 2}),
          }}
        >
          {description}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '14px',
            maxWidth: 800,
            ...(action && { mb: 1 }),
          }}
        >
          <li fontSize="16px">
            <b>Step 1:</b> {step1}{' '}
          </li>
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '14px',
            maxWidth: 800,
            ...(action && { mb: 1 }),
          }}
        >
          <li fontSize="16px">
            <b>Step 2:</b> {step2}{' '}
          </li>
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '14px',
            maxWidth: 800,
            ...(action && { mb: 4 }),
          }}
        >
          <li fontSize="16px">
            <b>Step 3:</b> {step3}{' '}
          </li>
        </Typography>

        {action && action}
      </Box>

      {img && <Box sx={{ maxWidth: 400}}>{img}</Box>}
    </Box>
  );
}
