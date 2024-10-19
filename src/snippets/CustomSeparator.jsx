// import React from 'react';
// import { useLocation, Link as RouterLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

// export default function CustomSeparator() {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   const breadcrumbs = pathnames.map((value, index) => {
//     const last = index === pathnames.length - 1;
//     const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    
//     // Check if the value is "Product" and conditionally render it as plain text
//     if (value === 'product') {
//       return (
//         <Typography key={to} color="text.primary">
//           {value}
//         </Typography>
//       );
//     }

//     return last ? (
//       <Typography key={to} color="text.primary">
//         {value}
//       </Typography>
//     ) : (
//       <Link
//         underline="hover"
//         key={to}
//         color="inherit"
//         component={RouterLink}
//         to={to}
//       >
//         {value}
//       </Link>
//     );
//   });

//   return (
//     <Stack spacing={2}>
//       <Breadcrumbs separator={<FontAwesomeIcon icon={faAngleRight} />} aria-label="breadcrumb">
//         <Link underline="hover" color="inherit" component={RouterLink} to="/">
//           Home
//         </Link>
//         {breadcrumbs}
//       </Breadcrumbs>
//     </Stack>
//   );
// }
