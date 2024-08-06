import React, { useState, useEffect } from 'react';
import { Grid, IconButton, InputAdornment, Paper, TextField, Typography, Button } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import Datagrid from './../components/Datagrid'; // Assurez-vous que Datagrid est correctement importé
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DrawerAppBar from '../components/DrawerAppBar';
import Footer from '../components/Footer';

const CryptoCurrency = () => {
    const [searchValue, setSearchValue] = useState('');
    const [cryptoList, setCryptoList] = useState([]);
    const [filteredCryptoList, setFilteredCryptoList] = useState([]);
    const navigate = useNavigate();

    // Colonnes à afficher dans le Datagrid
    const columns = [
        { field: 'rank', headerName: 'Rank', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'symbol', headerName: 'Symbol', flex: 1 },
        { field: 'marketCap', headerName: 'Market Cap', flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1 },
        { field: 'availableSupply', headerName: 'Available Supply', flex: 1 },
        { field: 'volume24hrs', headerName: 'Volume (24hrs)', flex: 1 },
    ];

    const inputSound = new Howl({ src: ['/assets/keyboard.wav'] });
    const clickSound = new Howl({ src: ['/assets/button.wav'] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets',
                    {
                        params: {
                            vs_currency: 'usd', // Vous pouvez changer en 'inr' pour les roupies indiennes
                            per_page: 100, // Limite de 100 résultats par page
                            page: 1, // Première page
                        },
                    }
                );
                const formattedData = response.data.map((crypto, index) => ({
                    id: index + 1,
                    rank: crypto.market_cap_rank,
                    name: crypto.name,
                    symbol: crypto.symbol.toUpperCase(),
                    marketCap: crypto.market_cap,
                    price: crypto.current_price,
                    availableSupply: crypto.total_supply || crypto.circulating_supply,
                    volume24hrs: crypto.total_volume,
                }));
                setCryptoList(formattedData);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filtrer la liste de cryptomonnaies en fonction de searchValue
        if (!searchValue) {
            setFilteredCryptoList(cryptoList); // Si searchValue est vide, afficher toutes les cryptomonnaies
        } else {
            const filtered = cryptoList.filter(crypto =>
                crypto.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                crypto.symbol.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredCryptoList(filtered);
        }
    }, [cryptoList, searchValue]);

    const handleSearchChange = (event) => {
        inputSound.play();
        setSearchValue(event.target.value);
    };

    const handleClearSearch = () => {
        clickSound.play();
        setSearchValue('');
    };

    const handleHomeRedirect = () => {
        clickSound.play();
        navigate('/Home');
    };

    return (
        <Grid container direction="column" sx={{ minHeight: '100vh', backgroundColor: theme => theme.palette.background.default }}>
            <Grid item>
                <DrawerAppBar title="Utility Hub" backgroundColor="primary" />
            </Grid>
            <Grid item xs sx={{ paddingBottom: { xs: '40px', md: '100px' } }}>
                <Grid container sx={{ minHeight: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} md={9.8}>
                        <Paper sx={{ padding: "30px", borderRadius: "15px" }}>
                            <Grid container rowSpacing={2}>
                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <Typography variant="h3" sx={{ fontFamily: 'Do Hyeon, sans-serif' }}>
                                        Crypto Currency
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type='search'
                                        placeholder='Search for crypto currency ...'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Search />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={handleClearSearch}>
                                                        <Clear />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        value={searchValue}
                                        onChange={handleSearchChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Datagrid rows={filteredCryptoList} columns={columns} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleHomeRedirect}
                                        sx={{ backgroundColor: theme => theme.palette.secondary.main, '&:hover': { backgroundColor: theme => theme.palette.secondary.dark } }}
                                    >
                                        Go to Home
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Footer />
            </Grid>
        </Grid>
    );
};

export default CryptoCurrency;
