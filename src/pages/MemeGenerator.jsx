import { Button, Grid, Paper, Typography, TextField } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Howl } from 'howler';  // Import Howler.js
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const MemeGenerator = () => {
  const [textAbove, setTextAbove] = useState('');
  const [textBottom, setTextBottom] = useState('');
  const [image, setImage] = useState(null);
  const [generate, setGenerate] = useState(false);
  const theme = useTheme();
  const memeRef = useRef(); // Reference to capture meme content for download
  const navigate = useNavigate(); // Hook for navigation

  // Load sounds
  const inputSound = new Howl({ src: ['/assets/keyboard.wav'] });
  const clickSound = new Howl({ src: ['/assets/button.wav'] });

  const handleTextAboveChange = (e) => {
    inputSound.play();  // Play sound on input change
    setTextAbove(e.target.value);
  }

  const handleTextBottomChange = (e) => {
    inputSound.play();  // Play sound on input change
    setTextBottom(e.target.value);
  }

  const handleGenerate = () => {
    clickSound.play();  // Play sound on button click
    setGenerate(true);
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setGenerate(false);
    }
  }

  const handleDownload = () => {
    clickSound.play();  // Play sound on button click
    if (memeRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const img = memeRef.current.querySelector('img');
      if (img && context) {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        context.font = 'bold 24px ' + theme.typography.fontFamily;
        context.fillStyle = theme.palette.text.primary;
        context.textAlign = 'center';
        context.textBaseline = 'top';
        if (textAbove) {
          context.fillText(textAbove, canvas.width / 2, 10);
        }
        if (textBottom) {
          context.fillText(textBottom, canvas.width / 2, canvas.height - 30);
        }
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'meme.png';
        link.click();
      }
    }
  }

  const handleReset = () => {
    clickSound.play();  // Play sound on button click
    setTextAbove('');
    setTextBottom('');
    setImage(null);
    setGenerate(false);
  }

  const handleHomeRedirect = () => {
    clickSound.play();  // Play sound on button click
    navigate('/Home'); // Navigate to /Home
  }

  return (
    <Grid container minHeight="100vh" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette.background.default }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper sx={{ padding: '30px', borderRadius: '15px', backgroundColor: theme.palette.background.paper }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" align="center" sx={{ fontFamily: theme.typography.fontFamily }}>Meme Generator</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Text Above"
                value={textAbove}
                onChange={handleTextAboveChange}
                sx={{ input: { color: theme.palette.text.primary }, label: { color: theme.palette.text.secondary } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Text Bottom"
                value={textBottom}
                onChange={handleTextBottomChange}
                sx={{ input: { color: theme.palette.text.primary }, label: { color: theme.palette.text.secondary } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                component="label"
                sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ position: 'relative', textAlign: 'center', marginTop: '20px' }} ref={memeRef}>
              {image && (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={image} alt="Meme Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                  {generate && textAbove && (
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: theme.palette.text.primary,
                        textShadow: '2px 2px 4px #000000',
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: 'bold'
                      }}
                    >
                      {textAbove}
                    </Typography>
                  )}
                  {generate && textBottom && (
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: theme.palette.text.primary,
                        textShadow: '2px 2px 4px #000000',
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: 'bold'
                      }}
                    >
                      {textBottom}
                    </Typography>
                  )}
                </div>
              )}
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleGenerate}
                  sx={{ backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: theme.palette.secondary.dark } }}
                >
                  Generate
                </Button>
              </Grid>
              {generate && (
                <>
                  <Grid item xs={12} md={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleDownload}
                      sx={{ backgroundColor: theme.palette.success.main, '&:hover': { backgroundColor: theme.palette.success.dark } }}
                    >
                      Download
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleReset}
                      sx={{ borderColor: theme.palette.error.main, color: theme.palette.error.main, '&:hover': { borderColor: theme.palette.error.dark, color: theme.palette.error.dark } }}
                    >
                      Reset
                    </Button>
                  </Grid>
                </>
              )}
              <Grid item xs={12} md={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleHomeRedirect}
                  sx={{ backgroundColor: theme.palette.info.main, '&:hover': { backgroundColor: theme.palette.info.dark } }}
                >
                  Go to Home
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MemeGenerator;
