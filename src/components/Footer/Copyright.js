import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function Copyright() {
    return (
        <Box sx={{ mr: 4, ml: 4 }}>
            <hr></hr>
            <Typography variant="body2" color="text.secondary" align="left"
                sx={{
                    pl: 4
                }}>
                {'© '}
                <MuiLink color="inherit" href="https://anityam.com">
                    Anityam LLC
                </MuiLink>{' '}
                , All right reserved {new Date().getFullYear()}.
            </Typography>
        </Box>
    );
}