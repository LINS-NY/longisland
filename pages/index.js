import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Heading from '../src/components/Heading/Heading'
import Footer from '../src/components/Footer/Footer';

export default function Index() {
  return (
    <Container maxWidth="false" disableGutters={true}>
      <Box>
        <Heading />
        <Footer />
      </Box>
    </Container>
  );
}
