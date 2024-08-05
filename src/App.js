import React from 'react';
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import MemeGenerator from './pages/MemeGenerator';
import QRGenerator from './pages/QRGenerator';
import QuoteGenerator from './pages/QuoteGenerator';
import Dictionary from './pages/Dictionary';
import AvatarGenerator from './pages/AvatarGenerator';

function App() {
  return (
    <ThemeProvider theme={theme}> 
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/Home' Component={Home}/>
        <Route path='/About' Component={AboutUs} />
        <Route path='/Contact' Component={ContactUs} />
        <Route path='memegenerator' Component={MemeGenerator} />
        <Route path='qrgenerator' Component={QRGenerator} />
        <Route path='quotegenerator' Component={QuoteGenerator} />
        <Route path='dictionary' Component={Dictionary} />
        <Route path='avatargenerator' Component={AvatarGenerator} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
