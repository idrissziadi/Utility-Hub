import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography, TextField, Select, MenuItem, IconButton, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom';
import ExchangeIcon from '@mui/icons-material/SwapHoriz';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const inputSound = new Howl({ src: ['/assets/keyboard.wav'] });
  const clickSound = new Howl({ src: ['/assets/button.wav'] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/b2562d01fa0965ed8c2df387/latest/USD');
        const data = await response.json();
        setCurrencies(Object.keys(data.conversion_rates));
        setRates(data.conversion_rates);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/b2562d01fa0965ed8c2df387/latest/${fromCurrency}`);
        const data = await response.json();
        setRates(data.conversion_rates);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch rates');
        setLoading(false);
      }
    };
    if (fromCurrency) {
      fetchRates();
    }
  }, [fromCurrency]);

  useEffect(() => {
    if (rates[toCurrency]) {
      setConvertedAmount(amount * rates[toCurrency]);
    }
  }, [amount, toCurrency, rates]);

  const handleAmountChange = (e) => {
    inputSound.play();
    setAmount(Number(e.target.value));
  };

  const handleFromCurrencyChange = (e) => {
    inputSound.play();
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    inputSound.play();
    setToCurrency(e.target.value);
  };

  const handleExchangeClick = () => {
    clickSound.play();
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleHomeRedirect = () => {
    clickSound.play();
    navigate('/Home');
  };

  if (loading) {
    return (
      <Grid container minHeight="100vh" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette.background.default }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container minHeight="100vh" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette.background.default }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Grid>
    );
  }

  return (
    <Grid container minHeight="100vh" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette.background.default }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper sx={{ padding: '30px', borderRadius: '15px', backgroundColor: theme.palette.background.paper }}>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Typography variant="h3" sx={{ fontFamily: theme.typography.fontFamily }}>Currency Converter</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="filled"
                size="medium"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                InputProps={{ style: { fontSize: '30px', color: theme.palette.text.primary } }}
                label="Amount"
                sx={{ label: { color: theme.palette.text.secondary } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Select
                    fullWidth
                    variant="filled"
                    size="small"
                    value={fromCurrency}
                    onChange={handleFromCurrencyChange}
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton onClick={handleExchangeClick} sx={{ color: theme.palette.text.primary }}>
                    <ExchangeIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Select
                    fullWidth
                    variant="filled"
                    size="small"
                    value={toCurrency}
                    onChange={handleToCurrencyChange}
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
              <Paper sx={{ borderRadius: '15px', padding: '20px', backgroundColor: theme.palette.background.paper }}>
                <Typography variant="h6" sx={{ fontFamily: theme.typography.fontFamily, color: theme.palette.text.primary }}>
                  {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleHomeRedirect}
                sx={{ backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: theme.palette.secondary.dark } }}
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

export default CurrencyConverter;
