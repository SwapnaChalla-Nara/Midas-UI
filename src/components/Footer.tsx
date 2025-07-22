import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
} from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.100',
        py: 3,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            National Archives and Records Administration
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Preserving America's records and making them accessible to the public
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} National Archives and Records Administration
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Link 
              href="#" 
              variant="body2" 
              color="primary"
              underline="hover"
              sx={{ 
                '&:focus': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              variant="body2" 
              color="primary"
              underline="hover"
              sx={{ 
                '&:focus': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              Accessibility
            </Link>
            <Link 
              href="#" 
              variant="body2" 
              color="primary"
              underline="hover"
              sx={{ 
                '&:focus': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              Contact Us
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};