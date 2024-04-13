import * as React from 'react';
import Typography from '@mui/material/Typography';

const Logo = () => {
    return (
        <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 3,
                display: { xs: 'none', md: 'flex' },
                fontFamily: '"Baloo Paaji 2"',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            Bansbari
        </Typography>
    )
}

export default Logo;