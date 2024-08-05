import React, { useState } from 'react';
import { Grid, Paper, Tabs, Tab, Button, Box, Typography, useTheme, IconButton } from '@mui/material';
import Axios from 'axios';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '@mui/icons-material'; // Import Material-UI icons

const AvatarGenerator = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [seed, setSeed] = useState(1000); // Set an initial seed value
    const [size, setSize] = useState('400'); // Size of the avatar
    const navigate = useNavigate(); // Hook for navigation
    const theme = useTheme(); // Access the theme

    // Initialize sound objects
    const clickSound = new Howl({ src: ['/assets/button.wav'] });
    const downloadSound = new Howl({ src: ['/assets/button.wav'] });

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
        clickSound.play(); // Play sound on tab change
    };

    const handleGenerate = () => {
        let x = Math.floor(Math.random() * 1000);
        setSeed(x);
        clickSound.play(); // Play sound on button click
    };

    const downloadImage = () => {
        const sprite = ['avataaars', 'human', 'bottts', 'jdenticon', 'identicon', 'gridy', 'micah'][selectedTab];
        const url = `https://newapi.example.com/api/v1/${sprite}/${seed}.svg`; // Updated API URL

        Axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer'
        })
        .then(response => {
            downloadSound.play(); // Play sound on download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(
                new Blob([response.data], { type: 'application/octet-stream' })
            );
            link.download = `${seed}.svg`;
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(link);
            }, 200);
        })
        .catch(error => {
            console.error('Error downloading image:', error);
        });
    };

    const handleHomeRedirect = () => {
        clickSound.play(); // Play sound on button click
        navigate('/Home'); // Navigate to /Home
    };

    const handlePrevTab = () => {
        setSelectedTab(prev => (prev > 0 ? prev - 1 : 6));
        clickSound.play(); // Play sound on button click
    };

    const handleNextTab = () => {
        setSelectedTab(prev => (prev < 6 ? prev + 1 : 0));
        clickSound.play(); // Play sound on button click
    };

    return (
        <Grid container minHeight={"100vh"} sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.palette.background.default }}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper sx={{ padding: "30px", borderRadius: "15px", boxShadow: 3 }}>
                    <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
                        Avatar Generator
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <IconButton onClick={handlePrevTab} sx={{ color: theme.palette.primary.main }}>
                                    <ArrowLeft />
                                </IconButton>
                                <Tabs value={selectedTab} onChange={handleChange} variant="fullWidth">
                                    {['avataaars', 'human', 'bottts', 'jdenticon', 'identicon', 'gridy', 'micah'].map((sprite, index) => (
                                        <Tab key={index} label={sprite} />
                                    ))}
                                </Tabs>
                                <IconButton onClick={handleNextTab} sx={{ color: theme.palette.primary.main }}>
                                    <ArrowRight />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                                    <img 
                                        src={`https://avatars.dicebear.com/api/v2/${['avataaars', 'human', 'bottts', 'jdenticon', 'identicon', 'gridy', 'micah'][selectedTab]}/${seed}.svg`} 
                                        alt="Avatar" 
                                        style={{ width: '100%', height: `${size}px` }}
                                    />
                                </Paper>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item xs={12} md={6}>
                                        <Button variant="contained" fullWidth onClick={handleGenerate}>Next</Button>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Button variant="contained" fullWidth onClick={downloadImage}>Download</Button>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Button variant="contained" fullWidth onClick={handleHomeRedirect} sx={{ backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: theme.palette.secondary.dark } }}>Go to Home</Button>
                                    </Grid>
                                </Grid>
                                <Box sx={{ marginTop: 2 }}>
                                    <Typography variant="body1" align="center">
                                        <strong>Select Size:</strong>
                                    </Typography>
                                    <Grid container spacing={1} justifyContent="center">
                                        {[200, 300, 400, 500].map((sizeOption) => (
                                            <Grid item key={sizeOption}>
                                                <Button 
                                                    variant={size === sizeOption.toString() ? "contained" : "outlined"} 
                                                    onClick={() => setSize(sizeOption.toString())}
                                                >
                                                    {sizeOption}px
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AvatarGenerator;
