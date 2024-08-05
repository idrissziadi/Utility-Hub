import React, { useState } from 'react';
import { Grid, Paper, Button, Box, Typography, useTheme, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Axios from 'axios';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom';

const LanguageTranslator = () => {
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('es');
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const theme = useTheme();
    const navigate = useNavigate();

    const clickSound = new Howl({ src: ['/assets/button.wav'] });
    const translateSound = new Howl({ src: ['/assets/button.wav'] });

    const handleSourceLangChange = (event) => {
        setSourceLang(event.target.value);
        clickSound.play();
    };

    const handleTargetLangChange = (event) => {
        setTargetLang(event.target.value);
        clickSound.play();
    };

    const handleTranslate = () => {
        const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions'; // L'URL pour l'API OpenAI
        const headers = {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Remplace par ta clé API OpenAI
            'Content-Type': 'application/json',
        };
        const body = {
            prompt: `Translate the following text from ${sourceLang} to ${targetLang}: "${text}"`,
            max_tokens: 1000,
            temperature: 0.3,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };

        Axios.post(url, body, { headers, timeout: 10000 }) // Timeout de 10 secondes
            .then(response => {
                translateSound.play();
                setTranslatedText(response.data.choices[0].text.trim()); // Assure-toi que la réponse correspond à cette structure
            })
            .catch(error => {
                console.error('Error translating text:', error);
            });
    };

    const handleHomeRedirect = () => {
        clickSound.play();
        navigate('/Home');
    };

    return (
        <Grid container minHeight={"100vh"} sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.palette.background.default }}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper sx={{ padding: "30px", borderRadius: "15px", boxShadow: 3 }}>
                    <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
                        Language Translator
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Source Language</InputLabel>
                                    <Select
                                        value={sourceLang}
                                        onChange={handleSourceLangChange}
                                        label="Source Language"
                                    >
                                        {['en', 'es', 'fr', 'de', 'it', 'pt', 'ru'].map((lang, index) => (
                                            <MenuItem key={index} value={lang}>{lang}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ marginLeft: 2 }}>
                                    <InputLabel>Target Language</InputLabel>
                                    <Select
                                        value={targetLang}
                                        onChange={handleTargetLangChange}
                                        label="Target Language"
                                    >
                                        {['en', 'es', 'fr', 'de', 'it', 'pt', 'ru'].map((lang, index) => (
                                            <MenuItem key={index} value={lang}>{lang}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center' }}>
                                <TextField
                                    label="Text to translate"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    sx={{ marginBottom: 2 }}
                                />
                                <Button variant="contained" fullWidth onClick={handleTranslate}>Translate</Button>
                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                    Translated Text:
                                </Typography>
                                <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
                                    <Typography variant="body1">
                                        {translatedText}
                                    </Typography>
                                </Paper>
                                <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                                    <Grid item xs={12}>
                                        <Button variant="contained" fullWidth onClick={handleHomeRedirect} sx={{ backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: theme.palette.secondary.dark } }}>Go to Home</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LanguageTranslator;
