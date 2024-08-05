import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const QuoteGenerator = () => {
    const [quote, setQuote] = useState('');
    const theme = useTheme();
    const navigate = useNavigate(); // Hook for navigation

    // Load sounds
    const clickSound = new Howl({ src: ['/assets/button.wav'] });

    const handleGenerate = async () => {
        clickSound.play(); // Play sound on button click
        try {
            const response = await axios.get(`https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`);
            const { advice } = response.data.slip;
            setQuote(advice);
        } catch (error) {
            console.error(error);
        }
    };

    const handleHomeRedirect = () => {
        clickSound.play(); // Play sound on button click
        navigate('/Home'); // Navigate to /Home
    };

    return (
        <Grid container minHeight="100vh" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.palette.background.default }}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: '30px', borderRadius: '15px', backgroundColor: theme.palette.background.paper }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} textAlign="center">
                            <Typography variant="h3" sx={{ fontFamily: theme.typography.fontFamily }}>Quote Generator</Typography>
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Typography variant="h6" color={theme.palette.secondary.main}>{quote}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleGenerate}
                                sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}
                            >
                                Generate
                            </Button>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleHomeRedirect}
                                sx={{ backgroundColor: theme.palette.info.main, '&:hover': { backgroundColor: theme.palette.info.dark } }}
                            >
                                Go to Home
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default QuoteGenerator;
