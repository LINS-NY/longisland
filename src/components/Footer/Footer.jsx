
import * as React from 'react';
import Copyright from './Copyright';
import { Container, Box } from '@material-ui/core';
import { Typography } from '@mui/material';

const contentList = ["Company", "Products", "Solutions", "Contacts"]

const Footer = () => {
    return (
        <Container maxWidth="lg" >
            <footer>
                <Box >
                    <Typography sx={{ pt: 4 }}>
                        test
                    </Typography>
                </Box>
                <Copyright />
            </footer>
        </Container>
    )

}
export default Footer;