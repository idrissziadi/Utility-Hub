import { Button, Grid, Paper, Typography, TextField } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import QRCode from 'qrcode.react';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom'; // For redirection

// Load the input sound
const inputSound = new Howl({ src: ['/assets/keyboard.wav'] });
// Import the click sound
const clickSound = new Howl({ src: ['/assets/button.wav'] });

const QRGenerator = () => {
  const [data, setData] = useState('');
  const [generate, setGenerate] = useState(false);
  const theme = useTheme();
  const qrRef = useRef(); // Reference to capture QR code content for download
  const navigate = useNavigate(); // For redirection

  const handleDataChange = (e) => {
    setData(e.target.value);
    inputSound.play(); // Play input sound
  }

  const handleGenerate = () => {
    setGenerate(true);
    clickSound.play(); // Play click sound
  }

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qrcode.png';
        link.click();
      }
    }
  }

  const handleReset = () => {
    setData('');
    setGenerate(false);
  }

  const handleGoHome = () => {
    clickSound.play(); // Play click sound
    navigate('/Home'); // Redirect to /Home
  }

  return (
    <Grid container minHeight="100vh" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette.background.default }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper sx={{ padding: '30px', borderRadius: '15px', backgroundColor: theme.palette.background.paper }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" align="center" sx={{ fontFamily: theme.typography.fontFamily }}>QR Code Generator</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Data"
                value={data}
                onChange={handleDataChange}
                sx={{ input: { color: theme.palette.text.primary }, label: { color: theme.palette.text.secondary } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleGenerate}
                sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}
              >
                Generate
              </Button>
            </Grid>
            {generate && (
              <>
                <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }} ref={qrRef}>
                  <QRCode
                    value={data}
                    size={256}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Grid>
                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleDownload}
                      sx={{ backgroundColor: theme.palette.success.main, '&:hover': { backgroundColor: theme.palette.success.dark } }}
                    >
                      Download
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleReset}
                      sx={{ borderColor: theme.palette.error.main, color: theme.palette.error.main, '&:hover': { borderColor: theme.palette.error.dark, color: theme.palette.error.dark } }}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleGoHome}
                sx={{ backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: theme.palette.secondary.dark } }}
              >
                Go Home
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default QRGenerator;
