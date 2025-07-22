import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export const Header: React.FC = () => {
  return (
    <AppBar position="static" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>
          <SearchIcon sx={{ mr: 2, fontSize: '2rem' }} />
          <Typography
            variant="h1"
            component="h1"
            sx={{
              flexGrow: 1,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 500,
              color: 'inherit',
            }}
          >
            MiDAS Search & Retrieval Tool
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography
              variant="body2"
              sx={{ 
                color: 'inherit',
                opacity: 0.8,
                fontSize: '0.875rem',
              }}
            >
              National Archives and Records Administration
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};