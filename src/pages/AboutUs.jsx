// src/pages/AboutUs.js

import React from 'react';
import { Grid, Box, Typography, Button, Container, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import DrawerAppBar from '../components/DrawerAppBar';
import Footer from '../components/Footer';
import { Facebook, Instagram, GitHub } from '@mui/icons-material'; 
import { Howl } from 'howler';

const clickSound = new Howl({ src: ['/assets/button.wav'] });

const AboutUs = () => {
  return (
    <>
      <DrawerAppBar title="Utility Hub" backgroundColor="primary" />
      <Container sx={{ my: 4 }}>
        <Grid container spacing={4} minHeight="80vh">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'Do Hyeon, sans-serif',
                  fontSize: '32px',
                  lineHeight: '40px',
                  fontWeight: 700,
                  mb: 2,
                  color: theme => theme.palette.primary.main,
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Do Hyeon, sans-serif',
                  fontSize: '16px',
                  lineHeight: '28px',
                  fontWeight: 400,
                  mb: 3,
                }}
              >
                Welcome to Utility Hub, your All-in-One Utility App that offers a suite of tools for everyday needs: create avatars, convert currencies, track crypto, access a dictionary, translate languages, generate memes and QR codes, and more. Enhance productivity and fun with our comprehensive utilities!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontFamily: 'Do Hyeon, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  mb: 2,
                }}
                onClick={() => { clickSound.play()}}
              >
                Learn More
              </Button>
              <Box sx={{ mt: 2 }}>
                <IconButton
                  href="https://www.facebook.com/YourPage"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  href="https://www.instagram.com/YourProfile"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  href="https://github.com/YourGitHubProfile"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  <GitHub />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                maxWidth: '100%',
                borderRadius: 2,
                boxShadow: 3,
                mb: 4,
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="/path/to/your/image.jpg"
                alt="About Us"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: 'Do Hyeon, sans-serif',
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontWeight: 700,
                    mb: 1,
                    color: theme => theme.palette.primary.main,
                  }}
                >
                  Our Vision
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: 'Do Hyeon, sans-serif',
                    fontSize: '14px',
                    lineHeight: '22px',
                    fontWeight: 400,
                  }}
                >
                  At Utility Hub, we believe in the power of versatile tools to simplify daily tasks and enhance productivity. Our vision is to be the leading platform providing comprehensive and user-friendly utilities that enrich lives.
                </Typography>
              </CardContent>
            </Card>
            {/* Ajouter la carte Google Maps en mode sombre */}
            <Box sx={{ width: '100%', height: '400px', mt: 4 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3355.2175744110264!2d3.489805215406136!3d32.48882508111282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1285a5d15c6a699d%3A0xd8d2e2d8b683430e!2sGhardaia%2C%20Algeria!5e0!3m2!1sen!2sus!4v1679617405681!5m2!1sen!2sus&maptype=roadmap&style=feature:administrative.country%7Celement:labels%7Cvisibility:simplified&style=feature:administrative.province%7Celement:labels%7Cvisibility:simplified&style=feature:administrative.locality%7Celement:labels%7Cvisibility:simplified&style=feature:administrative.neighborhood%7Celement:labels%7Cvisibility:simplified&style=feature:poi%7Celement:labels%7Cvisibility:simplified&style=feature:poi.business%7Celement:labels%7Cvisibility:simplified&style=feature:road%7Celement:labels%7Cvisibility:simplified&style=feature:transit%7Celement:labels%7Cvisibility:simplified&style=feature:water%7Celement:labels%7Cvisibility:simplified"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 2 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Ghardaia"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs;
