// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Tooltip from '@mui/material/Tooltip';
// import { useTheme } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';

// // import { RouterLink } from 'src/routes/components';

// import { CONFIG } from 'src/config-global';
// // import { varAlpha, bgGradient } from 'src/theme/styles';

// // ----------------------------------------------------------------------

// export function Section({
//   sx,
//   method,
//   layoutQuery,
//   methods,
//   title = 'No Restrictions  on Features',
//   imgUrl = `${CONFIG.site.basePath}/assets/illustrations/Pabblyhookgif2.gif`,
//   subtitle = 'More effectively with optimized workflows.',
//   ...other
// }) {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
//         background: `linear-gradient(180deg, 
//         rgba(236, 255, 247, 0.5) 0%,   /* #ECFFF7 with 50% opacity at the top */
//         rgba(163, 228, 201, 0.65) 100% /* #A3E4C9 with 65% opacity at the bottom */
//       ), 
//       url(${CONFIG.site.basePath}/assets/background)`,
//         backgroundSize: 'cover', // Ensure the image covers the whole container
//         px: 3,
//         pb: 1,
//         width: '100%',
//         maxWidth: 480,
//         display: 'none',
//         position: 'relative',
//         pt: 'var(--layout-header-desktop-height)',
//         [theme.breakpoints.up(layoutQuery)]: {
//           gap: 5.7,
//           display: 'flex',
//           alignItems: 'center',
//           flexDirection: 'column',
//           justifyContent: 'center',
//         },
//         ...sx,
//       }}

//       {...other}
//     >
//       <div>
//         <Typography variant="h3" sx={{ textAlign: 'center' }}>
//           {title}
//         </Typography>

//         {subtitle && (
//           <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: 2 }}>
//             {subtitle}
//           </Typography>
//         )}
//       </div>

//       <Box
//         component="img"
//         alt="Dashboard illustration"
//         src={imgUrl}
//         sx={{ width: 1, aspectRatio: '4/3', objectFit: 'cover' }}
//       />

//       {!!methods?.length && method && (
//         <Box component="ul" gap={5} display="flex">
//           {methods.map((option) => {
//             const selected = method === option.label.toLowerCase();

//             return (
//               <Box
//                 key={option.label}
//                 component="li"
//                 sx={{
//                   ...(!selected && {
//                     cursor: 'not-allowed',
//                     filter: 'grayscale(1)',
//                   }),
//                 }}
//               >
//                 <Tooltip
//                   title={
//                     <Box sx={{ textAlign: 'center' }}>
//                       Pabbly adheres to rigorous information security standards, ensuring the protection and confidentiality of your data within our automation and integration solutions.
//                     </Box>
//                   }
//                   placement="top"
//                   arrow
//                 >
//                   <Link
//                     // component={RouterLink}
//                     // href={option.path}
//                     sx={{
//                       ...(!selected && { pointerEvents: 'none' }),
//                     }}
//                   >
//                     <Box
//                       component="img"
//                       alt={option.label}
//                       src={option.icon}
//                       sx={{ width: 80, height: 80 }}
//                     />
//                   </Link>
//                 </Tooltip>

//               </Box>
//             );
//           })}
//         </Box>
//       )}
//     </Box>
//   );
// }

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';


// import { CONFIG } from 'src/config-global';

export function Section({
  sx,
  method,
  layoutQuery,
  methods,
  title = 'No Restrictions on Features',
  subtitle = 'More effectively with optimized workflows.',
  ...other
}) {
  const theme = useTheme();

  // Services to display in the list
  const services = [
    { title: "Pabbly Connect", description: "Automate tasks & save 100X time." },
    { title: "Pabbly Subscription Billing", description: "Sell online & collect payments." },
    { title: "Pabbly Email Marketing", description: "Send emails to subscribers." },
    { title: "Pabbly Form Builder", description: "Create forms and gather leads." },
    { title: "Pabbly Email Verification", description: "Verify and remove bad emails." }
  ];

  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, 
        rgba(236, 255, 247, 0.5) 0%,   
        rgba(163, 228, 201, 0.65) 100% 
      )`,
        backgroundSize: 'cover',
        px: 3,
        pb: 1,
        width: '100%',
        maxWidth: 480,
        display: 'none',
        position: 'relative',
        pt: 'var(--layout-header-desktop-height)',
        [theme.breakpoints.up(layoutQuery)]: {
          gap: 4.5,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        },
        ...sx,
      }}
      {...other}
    >
      <div>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: 2 }}>
            {subtitle}
          </Typography>
        )}
      </div>

      {/* Insert Service List Here */}
      <List>
        {services.map((service, index) => (
          <ListItem key={index}>
            <ListItemIcon>
            <Iconify icon="mdi:tick-circle-outline"  style={{color: '#078dee'}} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  {service.title}
                </Typography>
              }
              secondary={<Typography variant="body2">{service.description}</Typography>}
            />
          </ListItem>
        ))}
      </List>

      {!!methods?.length && method && (
        <Box component="ul" gap={5} display="flex">
          {methods.map((option) => {
            const selected = method === option.label.toLowerCase();

            return (
              <Box
                key={option.label}
                component="li"
                sx={{
                  ...(!selected && {
                    cursor: 'not-allowed',
                    filter: 'grayscale(1)',
                  }),
                }}
              >
                <Tooltip
                  title={
                    <Box sx={{ textAlign: 'center' }}>
                      Pabbly adheres to rigorous information security standards, ensuring the protection and confidentiality of your data within our automation and integration solutions.
                    </Box>
                  }
                  placement="top"
                  arrow
                >
                  <Link
                    sx={{
                      ...(!selected && { pointerEvents: 'none' }),
                    }}
                  >
                    <Box
                      component="img"
                      alt={option.label}
                      src={option.icon}
                      sx={{ width: 80, height: 80 }}
                    />
                  </Link>
                </Tooltip>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
