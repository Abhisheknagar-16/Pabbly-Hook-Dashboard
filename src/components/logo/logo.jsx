import { useId, forwardRef } from 'react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export const Logo = forwardRef(
  ({ width = 40, height = 40, disableLink = false, className, href = '/', sx, ...other }, ref) => {
    const theme = useTheme();

    const gradientId = useId();

    const PRIMARY_LIGHT = theme.vars.palette.primary.light;

    const PRIMARY_MAIN = theme.vars.palette.primary.main;

    const PRIMARY_DARK = theme.vars.palette.primary.dark;

    /*
     * OR using local (public folder)
     * const logo = ( <Box alt="logo" component="img" src={`${CONFIG.site.basePath}/logo/logo-single.svg`} width={width} height={height} /> );
     */

    const logo = (
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id={`${gradientId}-1`} x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id={`${gradientId}-2`} x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id={`${gradientId}-3`} x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>

        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          {
            <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 19.9439C40 30.9588 31.0455 39.8879 20 39.8879C16.5368 39.8879 13.2792 39.0104 10.4388 37.4657C4.2196 34.0835 0 27.5054 0 19.9439C0 8.92929 8.9543 0 19.9998 0C31.0455 0 40 8.92929 40 19.9439Z" fill="#20B276" />
              <path d="M27.9789 25.6192C25.8623 27.7938 23.2935 28.882 20.2733 28.882C18.4298 28.882 16.7172 28.5709 15.1116 27.6673L15.0923 39.2468L14.9402 39.2059L14.846 39.1819L14.7348 39.1215L14.6824 39.027L14.6342 38.9203L14.6877 38.8534L9.39099 32.5574L9.39254 17.6745C9.39254 14.5734 10.4507 11.9397 12.5676 9.77277C14.684 7.60574 17.2526 6.52246 20.2733 6.52246C23.2935 6.52246 25.8621 7.60959 27.9789 9.78465C30.0953 11.9594 31.1539 14.5987 31.1539 17.7021C31.1539 20.8059 30.0953 23.4446 27.9789 25.6192ZM23.9386 13.9327C22.9336 12.8992 21.7118 12.3826 20.2733 12.3826C18.8342 12.3826 17.6124 12.8992 16.6077 13.9327C15.6027 14.9662 15.1002 16.2224 15.1002 17.7024C15.1002 19.182 15.6025 20.4383 16.6077 21.4716C17.6124 22.5054 18.8342 23.0222 20.2733 23.0222C21.7118 23.0222 22.9336 22.5054 23.9386 21.4716C24.9436 20.4383 25.446 19.182 25.446 17.7024C25.446 16.2224 24.9436 14.966 23.9386 13.9327Z" fill="#147F52" />
              <path d="M27.5617 25.2081C25.4449 27.3837 22.8761 28.4719 19.8555 28.4719C18.0121 28.4719 16.2879 28.0198 14.6824 27.116L14.6807 39.1827C14.6807 39.1827 14.2899 39.0754 13.7814 38.9116C13.656 38.8713 13.5293 38.828 13.3967 38.7813C13.3336 38.7589 13.3028 38.7458 13.2379 38.7271C13.0715 38.6794 12.8606 38.5871 12.6981 38.5241C12.1519 38.312 11.7094 38.11 11.6987 38.105C11.688 38.0999 10.1248 37.3563 9.94851 37.2465C9.79063 37.1481 9.65008 37.0711 9.52962 36.9849C9.49113 36.9575 9.46205 36.9378 9.42557 36.9128C9.13919 36.7166 8.97915 36.6037 8.97915 36.6037L8.97437 17.2613C8.97437 14.1591 10.0326 11.5245 12.1496 9.35714C14.2663 7.18929 16.8349 6.10583 19.8557 6.10583C22.8763 6.10583 25.4449 7.1933 27.5619 9.36901C29.6785 11.5444 30.7372 14.1845 30.7372 17.2887C30.7368 20.393 29.6783 23.0327 27.5617 25.2081ZM23.5212 13.518C22.516 12.4842 21.2943 11.9675 19.8554 11.9675C18.4163 11.9675 17.1944 12.4842 16.1897 13.518C15.1846 14.5518 14.6822 15.8084 14.6822 17.2887C14.6822 18.7689 15.1846 20.0256 16.1897 21.0592C17.1944 22.0935 18.4163 22.6103 19.8554 22.6103C21.2941 22.6103 22.516 22.0935 23.5212 21.0592C24.5259 20.0256 25.0288 18.7689 25.0288 17.2887C25.0288 15.8084 24.5259 14.5518 23.5212 13.518Z" fill="white" />
            </svg>
            /* <path
            fill={`url(#${`${gradientId}-1`})`}
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill={`url(#${`${gradientId}-2`})`}
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill={`url(#${`${gradientId}-3`})`}
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          /> */}
        </g>
      </svg>
    );

    return (
      <NoSsr
        fallback={
          <Box
            width={width}
            height={height}
            className={logoClasses.root.concat(className ? ` ${className}` : '')}
            sx={{
              flexShrink: 0,
              display: 'inline-flex',
              verticalAlign: 'middle',
              ...sx,
            }}
          />
        }
      >
        <Box
          ref={ref}
          component={RouterLink}
          href={href}
          width={width}
          height={height}
          className={logoClasses.root.concat(className ? ` ${className}` : '')}
          aria-label="logo"
          sx={{
            flexShrink: 0,
            display: 'inline-flex',
            verticalAlign: 'middle',
            ...(disableLink && { pointerEvents: 'none' }),
            ...sx,
          }}
          {...other}
        >
          {logo}
        </Box>
      </NoSsr>
    );
  }
);
