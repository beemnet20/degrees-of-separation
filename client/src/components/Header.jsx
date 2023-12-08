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
      <header >
        <Container>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={0} sm={3} lg={2}>
              <SizeAvatars src={img} label='Beemnet Workeneh' size='xlg' />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Stack spacing={1} direction='column'>
                <Chip
                  label={
                    <strong style={{ textAlign: 'left' }}>
                      Beemnet Workeneh
                    </strong>
                  }
                  variant='outlined'
                  sx={{ width: '50%', minWidth:"200px", justifyContent: 'flex-start' }}
                />
                <Chip
                  label={<strong>Software Engineer</strong>}
                  variant='outlined'
                  sx={{ width: '40%',minWidth:"200px", justifyContent: 'flex-start' }}
                />
                <Stack direction='row' spacing={1}>
                  <Chip
                    variant='outlined'
                    label={
                      <strong>
                        <a
                          href='https://www.linkedin.com/in/beemnet-workeneh-25b579b3/'
                          target='_blank'
                          rel='noreferrer'
                        >
                          <LinkedInIcon />
                        </a>
                      </strong>
                    }
                    sx={{ minWidth: '40px', maxWidth: '60px' }}
                  />
                  <Chip
                    variant='outlined'
                    label={
                      <strong>
                        <a
                          href='mailto:beemnet17@gmail.com'
                          target='_blank'
                          rel='noreferrer'
                        >
                          <EmailIcon />
                        </a>
                      </strong>
                    }
                    sx={{ minWidth: '40px', maxWidth: '60px' }}
                  />
                  <Chip
                    variant='outlined'
                    label={
                      <strong>
                        <a href='tel:+12063550608' rel='noreferrer'>
                          <SmartphoneIcon />
                        </a>
                      </strong>
                    }
                    sx={{ minWidth: '40px', maxWidth: '60px' }}
                  />
                </Stack>
                <Chip
                  variant='outlined'
                  sx={{ width: '20%', minWidth:"100px", justifyContent: 'flex-start' }}
                  label={
                    <strong>
                      <a
                        rel='noreferrer'
                        href='https://beemnet17.wixsite.com/beemnetworkeneh'
                        target='_blank'
                      >
                        Portfolio
                      </a>
                    </strong>
                  }
                ></Chip>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </header>
  );
}


