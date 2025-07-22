import React, { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      
      <Box
        component="main"
        role="main"
        sx={{
          flex: 1,
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
};