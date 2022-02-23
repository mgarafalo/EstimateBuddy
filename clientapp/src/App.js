import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar';
import HowTo from './components/HowTo';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
import { useMemo, useState } from 'react';
import { ShopContext } from './Context/ShopContext';
import Portal from './components/Portal';
import NewEstimate from './components/NewEstimate';

export const url = process.env.REACT_APP_API
console.log(process.env)

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
            <Route exact='true' path='/' element={shop ? <Portal /> : <HomePage />} />
            <Route exact='true' path='/howto' element={<HowTo />} />
            <Route exact='true' path='/signup' element={<SignUpForm />} />
            <Route exact='true' path='/login' element={<Login />} />
            <Route exact='true' path='/portal' element={<Portal />} />
            <Route exact='true' path='/newEstimate' element={<NewEstimate />} />
        </Routes>
        </ShopContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
