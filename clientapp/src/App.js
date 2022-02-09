import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar';
import HowTo from './components/HowTo';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
import { useMemo, useState } from 'react';
import { ShopContext } from './Context/ShopContext';

export const url = 'http://localhost:8000/api'

function App() {
  document.title = 'EstimateBuddy'

  const [shop, setShop] = useState(null);
  const Shop = useMemo(() => ({ shop, setShop }), [shop, setShop])

  return (
    <>
      <BrowserRouter>
      <ShopContext.Provider value={Shop}>
        <NavBar />
        <Routes>
            <Route exact='true' path='/' element={<HomePage />} />
            <Route exact='true' path='/howto' element={<HowTo />} />
            <Route exact='true' path='/signup' element={<SignUpForm />} />
            <Route exact='true' path='/login' element={<Login />} />
        </Routes>
        </ShopContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
