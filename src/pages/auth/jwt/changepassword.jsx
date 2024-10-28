import { Helmet } from 'react-helmet-async';

import { Box, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { JwtConfirm } from 'src/sections/auth/jwt/jwt-change-password';


// ----------------------------------------------------------------------

const metadata = { title: `Confirm Email | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
    <Box
        sx={{
          position: { xs: 'relative', md: 'absolute' }, // Relative for mobile/tablet, absolute for laptop
          top: { xs: -32, md: 16, }, // Top positioning only for laptop
          right: { xs: 'auto', md: 16 }, // Right positioning only for laptop
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column on mobile/tablet, row on laptop
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' }, // Center for mobile/tablet, left-align for laptop
          padding: { xs: 2, md: 0 }, // Padding for mobile/tablet
          gap: { xs: 1, md: 0 }, // Gap for mobile/tablet
          width: { xs: '100%', md: 'auto' }, // Full width on mobile/tablet
        }}
      >
          <Box
        component="svg"
        width="180"
        height="145"
        viewBox="0 0 1512 406"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        sx={{
          display: { xs: 'block', lg: 'none' }, // Show only on mobile and tablet
          width: '150px',
          height: '42.65px',
        }}
      >    
      
     <g clipPath="url(#clip0_188_1003)">
     <path d="M374.492 186.721C374.492 289.662 290.805 373.109 187.576 373.109C155.209 373.109 124.765 364.909 98.2189 350.472C40.0957 318.865 0.660156 257.387 0.660156 186.721C0.660156 83.7838 84.3451 0.334473 187.575 0.334473C290.805 0.334473 374.492 83.7838 374.492 186.721Z" fill="#20B276"/>
     <path d="M262.178 239.735C242.399 260.06 218.397 270.229 190.175 270.229C172.951 270.229 156.948 267.322 141.945 258.877L141.765 367.106L140.343 366.722L139.463 366.498L138.425 365.934L137.935 365.051L137.484 364.053L137.984 363.428L88.4912 304.582L88.5056 165.478C88.5056 136.493 98.3934 111.877 118.174 91.6235C137.949 71.3691 161.951 61.2441 190.175 61.2441C218.397 61.2441 242.398 71.4051 262.178 91.7344C281.953 112.061 291.844 136.73 291.844 165.736C291.844 194.745 281.953 219.41 262.178 239.735ZM224.425 130.505C215.035 120.845 203.618 116.017 190.175 116.017C176.729 116.017 165.313 120.845 155.925 130.505C146.534 140.164 141.839 151.906 141.839 165.739C141.839 179.568 146.532 191.309 155.925 200.969C165.313 210.63 176.729 215.461 190.175 215.461C203.618 215.461 215.035 210.63 224.425 200.969C233.815 191.309 238.51 179.568 238.51 165.739C238.51 151.906 233.815 140.163 224.425 130.505Z" fill="#147F52"/>
     <path d="M258.287 235.892C238.509 256.22 214.509 266.387 186.286 266.387C169.062 266.387 152.951 262.164 137.951 253.719L137.935 366.467C137.935 366.467 134.284 365.465 129.532 363.935C128.36 363.557 127.177 363.152 125.938 362.716C125.348 362.507 125.061 362.385 124.454 362.21C122.899 361.764 120.929 360.902 119.41 360.313C114.308 358.332 110.173 356.443 110.073 356.397C109.973 356.35 95.367 349.401 93.72 348.375C92.2449 347.456 90.9317 346.736 89.8062 345.931C89.4465 345.674 89.1749 345.491 88.8339 345.258C86.1583 343.424 84.663 342.371 84.663 342.371L84.6182 161.639C84.6182 132.653 94.506 108.036 114.286 87.7846C134.063 67.5288 158.063 57.4053 186.287 57.4053C214.51 57.4053 238.51 67.5663 258.289 87.8956C278.066 108.222 287.958 132.89 287.958 161.895C287.955 190.902 278.064 215.566 258.287 235.892ZM220.536 126.662C211.144 117.003 199.729 112.175 186.284 112.175C172.838 112.175 161.422 117.003 152.034 126.662C142.643 136.322 137.949 148.064 137.949 161.895C137.949 175.726 142.643 187.467 152.034 197.125C161.422 206.789 172.838 211.619 186.284 211.619C199.728 211.619 211.144 206.789 220.536 197.125C229.924 187.467 234.621 175.726 234.621 161.895C234.621 148.064 229.924 136.322 220.536 126.662Z" fill="white"/>
     <path d="M421.359 311.487V70.8511C421.359 67.2926 422.711 64.1635 425.419 61.4622C428.123 58.7624 431.258 57.4111 434.828 57.4111H501.803C524.065 57.4111 543.041 65.2426 558.723 80.8983C574.406 96.554 582.248 115.496 582.248 137.721C582.248 159.825 574.394 178.735 558.691 194.454C542.986 210.174 523.987 218.03 501.694 218.03H461.414C452.547 218.03 448.113 213.555 448.113 204.6V311.494C448.113 320.451 443.653 324.926 434.736 324.926C425.816 324.927 421.359 320.448 421.359 311.487ZM448.113 204.6C448.113 195.769 452.547 191.354 461.42 191.354H501.712C516.495 191.354 529.158 186.125 539.692 175.664C550.227 165.202 555.496 152.584 555.496 137.815C555.496 123.048 550.227 110.402 539.692 99.8762C529.157 89.355 516.495 84.0908 501.712 84.0908H448.113V204.6Z" fill="#3B3938"/>
     <path d="M734.46 311.481C734.46 320.445 729.969 324.927 720.992 324.927C712.011 324.927 707.583 320.452 707.707 311.496C695.775 320.452 682.367 324.927 667.484 324.927C649.034 324.927 633.227 318.397 620.067 305.333C606.904 292.27 600.324 276.538 600.324 258.139C600.324 239.74 606.904 223.981 620.067 210.855C633.227 197.732 649.034 191.168 667.484 191.168C682.367 191.168 695.775 195.647 707.707 204.6C707.707 193.512 703.769 184.026 695.899 176.136C688.026 168.25 678.555 164.307 667.486 164.307C659.736 164.307 651.955 167.007 644.146 172.402C636.333 177.802 631.508 180.499 629.663 180.499C625.973 180.499 622.744 179.113 619.976 176.341C617.208 173.571 615.823 170.336 615.823 166.64C615.823 163.685 617.236 160.546 620.068 157.216C631.015 144.159 646.822 137.63 667.486 137.63C685.937 137.63 701.712 144.171 714.813 157.245C727.912 170.32 734.462 186.067 734.462 204.484V311.481H734.46ZM707.707 258.048C707.707 246.986 703.76 237.519 695.871 229.65C687.981 221.783 678.486 217.847 667.393 217.847C656.296 217.847 646.803 221.783 638.913 229.65C631.024 237.519 627.079 246.986 627.079 258.048C627.079 269.113 631.024 278.579 638.913 286.448C646.803 294.316 656.298 298.249 667.393 298.249C678.486 298.249 687.981 294.316 695.871 286.448C703.76 278.579 707.707 269.113 707.707 258.048Z" fill="#3B3938"/>
     <path d="M957.709 231.187C957.709 257.093 948.545 279.192 930.219 297.488C911.888 315.783 889.749 324.929 863.795 324.929C837.965 324.929 815.885 315.786 797.557 297.497C779.228 279.209 770.067 257.116 770.067 231.216V70.8511C770.067 61.893 774.555 57.4111 783.536 57.4111C792.392 57.4111 796.819 61.8959 796.819 70.8655V165.779C815.27 147.013 837.595 137.629 863.794 137.629C889.747 137.629 911.886 146.777 930.217 165.071C948.545 183.367 957.709 205.405 957.709 231.187ZM930.955 231.187C930.955 212.886 924.373 197.167 911.213 184.023C898.05 170.879 882.246 164.307 863.795 164.307C845.466 164.307 829.723 170.879 816.563 184.023C803.4 197.167 796.82 212.886 796.82 231.187C796.82 249.61 803.4 265.393 816.563 278.538C829.723 291.681 845.467 298.25 863.795 298.25C882.246 298.25 898.05 291.681 911.213 278.538C924.373 265.393 930.955 249.61 930.955 231.187Z" fill="#3B3938"/>
     <path d="M1172.29 231.187C1172.29 257.093 1163.12 279.192 1144.8 297.488C1126.47 315.783 1104.33 324.929 1078.37 324.929C1052.54 324.929 1030.46 315.786 1012.14 297.497C993.808 279.209 984.646 257.116 984.646 231.216V70.8511C984.646 61.893 989.135 57.4111 998.115 57.4111C1006.97 57.4111 1011.4 61.8959 1011.4 70.8655V165.779C1029.85 147.013 1052.17 137.629 1078.37 137.629C1104.33 137.629 1126.47 146.777 1144.8 165.071C1163.12 183.367 1172.29 205.405 1172.29 231.187ZM1145.54 231.187C1145.54 212.886 1138.95 197.167 1125.79 184.023C1112.63 170.879 1096.83 164.307 1078.37 164.307C1060.05 164.307 1044.3 170.879 1031.14 184.023C1017.98 197.167 1011.4 212.886 1011.4 231.187C1011.4 249.61 1017.98 265.393 1031.14 278.538C1044.3 291.681 1060.05 298.25 1078.37 298.25C1096.83 298.25 1112.63 291.681 1125.79 278.538C1138.95 265.393 1145.54 249.61 1145.54 231.187Z" fill="#3B3938"/>
     <path d="M1266.2 311.496C1266.2 320.452 1261.71 324.927 1252.73 324.927C1238.09 324.927 1225.52 319.68 1215 309.185C1204.49 298.691 1199.23 286.08 1199.23 271.349V70.8511C1199.23 61.893 1203.72 57.4111 1212.7 57.4111C1221.55 57.4111 1225.98 61.893 1225.98 70.854V271.367C1225.98 278.732 1228.62 285.055 1233.91 290.332C1239.2 295.611 1245.47 298.25 1252.73 298.25C1261.71 298.25 1266.2 302.664 1266.2 311.496Z" fill="#3B3938"/>
     <path d="M1427.27 338.312C1427.27 356.602 1420.72 372.312 1407.62 385.448C1394.52 398.576 1378.75 405.146 1360.3 405.146C1348.73 405.146 1337.6 402.138 1326.9 396.131C1315.83 389.995 1307.65 381.963 1302.36 372.028C1301.01 369.329 1300.33 366.937 1300.33 364.854C1300.33 361.294 1301.78 358.199 1304.67 355.563C1307.56 352.924 1310.79 351.607 1314.36 351.607C1317.43 351.607 1322.99 356.083 1331.05 365.038C1339.11 373.99 1348.86 378.468 1360.3 378.468C1371.37 378.468 1380.84 374.541 1388.71 366.694C1396.58 358.842 1400.52 349.398 1400.52 338.36V311.497C1388.59 320.454 1375.18 324.929 1360.3 324.929C1341.85 324.929 1326.07 318.391 1312.97 305.317C1299.87 292.243 1293.32 276.495 1293.32 258.076V150.893C1293.32 142.053 1297.81 137.632 1306.79 137.632C1315.65 137.632 1320.07 142.053 1320.07 150.893V258.096C1320.07 269.15 1324.01 278.605 1331.88 286.464C1339.75 294.324 1349.23 298.252 1360.3 298.252C1371.37 298.252 1380.84 294.324 1388.71 286.464C1396.58 278.605 1400.52 269.149 1400.52 258.096V150.893C1400.52 142.053 1405.01 137.632 1413.99 137.632C1422.84 137.632 1427.27 142.05 1427.27 150.887V338.312Z" fill="#3B3938"/>
     </g>
     <g clipPath="url(#clip1_188_1003)">
     <path d="M1473.84 94.7707V108.853H1466.06V72.1528H1476.76C1481.74 72.1528 1485.43 73.061 1487.83 74.8764C1490.22 76.6924 1491.42 79.4494 1491.42 83.1479C1491.42 85.3068 1490.82 87.227 1489.63 88.909C1488.44 90.5908 1486.76 91.9088 1484.59 92.8628C1490.11 101.113 1493.71 106.444 1495.38 108.853H1486.75L1477.99 94.7707H1473.84H1473.84ZM1473.84 88.4447H1476.35C1478.81 88.4447 1480.63 88.0349 1481.8 87.2147C1482.97 86.3948 1483.56 85.1061 1483.56 83.3489C1483.56 81.5916 1482.96 80.3703 1481.76 79.6337C1480.57 78.8976 1478.71 78.5293 1476.2 78.5293H1473.84V88.4449V88.4447Z" fill="#3B3938"/>
     <path d="M1479.5 123C1470.82 123 1462.66 119.619 1456.52 113.481C1450.38 107.343 1447 99.1811 1447 90.5001C1447 81.8191 1450.38 73.6576 1456.52 67.519C1462.66 61.3806 1470.82 58 1479.5 58C1488.18 58 1496.34 61.3806 1502.48 67.519C1508.62 73.6574 1512 81.8189 1512 90.4999C1512 99.1809 1508.62 107.342 1502.48 113.481C1496.34 119.619 1488.18 123 1479.5 123ZM1479.5 62.8689C1464.26 62.8689 1451.87 75.264 1451.87 90.5001C1451.87 105.736 1464.26 118.131 1479.5 118.131C1494.74 118.131 1507.13 105.736 1507.13 90.5001C1507.13 75.2643 1494.74 62.8689 1479.5 62.8689Z" fill="#3B3938"/>
     </g>
     <defs>
     <clipPath id="clip0_188_1003">
     <rect width="1428" height="406" fill="white"/>
     </clipPath>
     <clipPath id="clip1_188_1003">
     <rect width="65" height="65" fill="white" transform="translate(1447 58)"/>
     </clipPath>
     </defs>
    
      
      </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginRight: { xs: 0, md: 1 }, // Remove margin on mobile
            textAlign: { xs: 'center', md: 'left' } // Center text on mobile, left-align on desktop
          }}
        >
          Don&apos;t have a Pabbly Account yet?
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            width: { xs: 'auto', md: 'auto', } // Full width on mobile, auto on desktop
          }}
          href={paths.auth.jwt.signUp}
        >
          Create Account
        </Button>
      </Box>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

     <JwtConfirm/>
     </>
  );
}
