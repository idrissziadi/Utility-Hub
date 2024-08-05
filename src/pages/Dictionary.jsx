import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography, Card, CardContent, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Use theme hook
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dictionary = () => {
  const [word, setWord] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const theme = useTheme(); // Use theme
  const navigate = useNavigate(); // Hook for navigation

  // Load sounds
  const clickSound = new Howl({ src: ['/assets/button.wav'] });
  const pronunciationSound = new Howl({ src: ['/assets/pronunciation.wav'] });

  const handleChange = (event) => {
    setWord(event.target.value);
  }

  const handleSearch = async () => {
    clickSound.play(); // Play sound on button click
    if (word === "") {
      return;
    }
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setData(null);
      setError("Word not found. Please try another word.");
    }
  }

  const handlePronunciation = (audioUrl) => {
    pronunciationSound.src = [audioUrl];
    pronunciationSound.play();
  }

  const handleHomeRedirect = () => {
    clickSound.play(); // Play sound on button click
    navigate('/Home'); // Navigate to /Home
  };

  return (
    <Grid container minHeight="100vh" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette.background.default }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper sx={{ padding: '30px', borderRadius: '15px', backgroundColor: theme.palette.background.paper }}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Typography variant='h3' align='center' sx={{ fontFamily: theme.typography.fontFamily, color: theme.palette.primary.main }}>
                Free Dictionary
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={10}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    placeholder='Search for word'
                    InputProps={{
                      style: {
                        borderTopLeftRadius: '15px',
                        borderBottomLeftRadius: '15px'
                      }
                    }}
                    value={word}
                    onChange={handleChange}
                    sx={{ backgroundColor: theme.palette.background.default }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button 
                    variant='contained' 
                    fullWidth 
                    onClick={handleSearch}
                    sx={{ height: '100%', borderRadius: '0px 15px 15px 0px', backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}
                  >
                    <SearchIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleHomeRedirect}
                sx={{ backgroundColor: theme.palette.info.main, '&:hover': { backgroundColor: theme.palette.info.dark }, marginBottom: '20px' }}
              >
                <HomeIcon />
                {' '}
                Go to Home
              </Button>
              {error && (
                <Typography color="error" align='center'>{error}</Typography>
              )}
              {data && (
                <Grid container spacing={2}>
                  {data.map((entry, index) => (
                    <Grid item xs={12} key={index}>
                      <Card variant="outlined" sx={{ borderRadius: '15px', backgroundColor: theme.palette.background.paper, boxShadow: `0 4px 8px ${theme.palette.grey[500]}` }}>
                        <CardContent>
                          <Typography variant="h5" component="div" gutterBottom sx={{ fontFamily: theme.typography.fontFamily }}>
                            {entry.word}
                            {entry.phonetics.length > 0 && (
                              <Button 
                                variant="outlined" 
                                sx={{ ml: 2, borderRadius: '15px', textTransform: 'none', borderColor: theme.palette.primary.main }}
                                onClick={() => handlePronunciation(entry.phonetics[0].audio)}
                              >
                                Pronounce
                              </Button>
                            )}
                          </Typography>
                          {entry.phonetics.map((phonetic, i) => (
                            <Typography variant="subtitle1" color="textSecondary" key={i}>
                              {phonetic.text}
                            </Typography>
                          ))}
                          <Divider sx={{ margin: '10px 0' }} />
                          {entry.meanings.map((meaning, i) => (
                            <div key={i}>
                              <Typography variant="subtitle1" component="div">
                                <strong>{meaning.partOfSpeech}</strong>
                              </Typography>
                              {meaning.definitions.map((def, j) => (
                                <Typography key={j} variant="body1">
                                  - {def.definition}
                                </Typography>
                              ))}
                              <Divider sx={{ margin: '10px 0' }} />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Dictionary;
