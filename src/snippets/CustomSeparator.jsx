import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function CustomSeparator() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs = pathnames.map((value, index) => {
    const last = index === pathnames.length - 1;
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

    return last ? (
      <Typography key={to} color="text.primary">
        {value}
      </Typography>
    ) : (
      <Link
        underline="hover"
        key={to}
        color="inherit"
        component={RouterLink}
        to={to}
      >
        {value}
      </Link>
    );
  });

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator={<FontAwesomeIcon icon={faAngleRight} />} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
