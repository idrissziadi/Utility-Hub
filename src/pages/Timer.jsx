import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Paper, Typography, TextField, IconButton, Slider, Snackbar, useTheme } from '@mui/material';
import { VolumeUp, Fullscreen, FullscreenExit, Home } from '@mui/icons-material';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom';

const Timer = () => {
    const [isStart, setIsStart] = useState(false);
    const [time, setTime] = useState(0);
    const [countdown, setCountdown] = useState(false);
    const [alertTime, setAlertTime] = useState(0);
    const [color, setColor] = useState('#000000');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const timerRef = useRef(null);
    const theme = useTheme();
    const navigate = useNavigate();

    const beepSound = new Howl({ src: ['/assets/beep.mp3'] });

    useEffect(() => {
        if (isStart) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => {
                    let newTime = prevTime + 10;
                    if (newTime % 1000 === 0) {
                        newTime += 900; // Adjust to properly reset milliseconds to 0 and add a second
                    }
                    if (countdown && alertTime > 0 && newTime >= alertTime) {
                        beepSound.play();
                        setSnackOpen(true);
                    }
                    return newTime;
                });
            }, 10);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isStart, countdown, alertTime]);

    const handlePause = () => setIsStart(false);

    const handleResetStart = () => {
        if (isStart) {
            setTime(0);
        }
        setIsStart(!isStart);
    };

    const formatTime = (time) => {
        const milliseconds = Math.floor((time / 10) % 100);
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 60000) % 60);
        const hours = Math.floor(time / 3600000); 

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const handleFullscreenToggle = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    const handleAlertTimeChange = (event) => {
        setAlertTime(Number(event.target.value) * 1000); // Convert to milliseconds
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleSnackbarClose = () => {
        setSnackOpen(false);
    };

    return (
        <Grid container minHeight={"100vh"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: theme.palette.background.default }}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: "30px", borderRadius: "15px", backgroundColor: theme.palette.background.paper, color }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} textAlign={"center"}>
                            <Typography variant='h3'>Timer</Typography>
                        </Grid>
                        <Grid item xs={12} textAlign={"center"}>
                            <Typography variant='h4'>{formatTime(time)}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant='contained'
                                onClick={handlePause}
                                disabled={!isStart}
                            >
                                Pause
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant='contained'
                                onClick={handleResetStart}
                            >
                                {isStart ? "Reset" : "Start"}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Alert Time (seconds)"
                                type="number"
                                fullWidth
                                variant="outlined"
                                onChange={handleAlertTimeChange}
                                sx={{ marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Timer Color"
                                type="color"
                                fullWidth
                                variant="outlined"
                                onChange={handleColorChange}
                                sx={{ marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Slider
                                defaultValue={0}
                                min={0}
                                max={60}
                                step={1}
                                valueLabelDisplay="auto"
                                onChange={(e, newValue) => setAlertTime(newValue * 1000)}
                                sx={{ marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <IconButton onClick={handleFullscreenToggle} color="primary">
                                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant='contained'
                                color="primary"
                                startIcon={<Home />}
                                onClick={() => navigate('/Home')}
                                sx={{ backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: theme.palette.secondary.dark } }}
                            >
                                Home
                            </Button>
                        </Grid>
                    </Grid>
                    <Snackbar
                        open={snackOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        message="Alert Time Reached!"
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Timer;
