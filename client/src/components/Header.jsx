import * as React from 'react';
import SizeAvatars from '../components/Avatar';
import img from '../assets/my-avatar.jpg';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

export default function Header() {
  return (
    <header>
      <Container>
        <Grid container spacing={1} padding={1}> {/* Reduced spacing and padding */}
          <Grid item xs={0} sm={2} lg={1}> {/* Adjusted grid size */}
            <SizeAvatars src={img} label='Beemnet Workeneh' size='lg' /> {/* Adjusted avatar size */}
          </Grid>
          <Grid item xs={12} lg={5}> {/* Adjusted grid size */}
            <Stack spacing={0.5} direction='column'> {/* Reduced stack spacing */}
              <Chip
                label={<strong>Beemnet Workeneh</strong>}
                variant='outlined'
                sx={{ width: '50%', minWidth: '150px', justifyContent: 'flex-start' }} 
              />
              <Chip
                label={<strong>Software Engineer</strong>}
                variant='outlined'
                sx={{ width: '40%', minWidth: '150px', justifyContent: 'flex-start' }} 
              />
              <Stack direction='row' spacing={0.5}> {/* Reduced icon spacing */}
                {/* Icons Chip */}
                <Chip
                  variant='outlined'
                  label={<LinkedInIcon />} // Removed <strong> and <a> for simplicity
                  sx={{ minWidth: '35px', maxWidth: '50px',cursor: 'pointer' }} // Adjusted size
                  component="a"
                  href='https://www.linkedin.com/in/beemnet-workeneh-25b579b3/'
                  target='_blank'
                  rel='noreferrer'
                />
                <Chip
                  variant='outlined'
                  label={<EmailIcon />}
                  sx={{ minWidth: '35px', maxWidth: '50px',cursor: 'pointer' }}
                  component="a"
                  href='mailto:beemnet17@gmail.com'
                  target='_blank'
                  rel='noreferrer'
                />
                <Chip
                  variant='outlined'
                  label={<SmartphoneIcon />}
                  sx={{ minWidth: '35px', maxWidth: '50px',cursor: 'pointer' }}
                  component="a"
                  href='tel:+12063550608'
                  rel='noreferrer'
                />
              </Stack>
              <Chip
                variant='outlined'
                sx={{ width: '20%', minWidth: '80px', justifyContent: 'flex-start' , cursor: 'pointer'}} // Adjusted minWidth
                label={<strong>Portfolio</strong>}
                component="a"
                href='https://beemnet17.wixsite.com/beemnetworkeneh'
                target='_blank'
                rel='noreferrer'
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </header>
  );
}
