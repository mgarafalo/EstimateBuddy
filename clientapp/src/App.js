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
import { AdminContext } from './Context/AdminContext';

export const url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/api'
  : 'https://estimate-buddy.herokuapp.com/api'

function App() {
  document.title = 'EstimateBuddy'

  const [shop, setShop] = useState(null)
  const [admin, setAdmin] = useState(null)

  const Shop = useMemo(() => ({ shop, setShop }), [shop, setShop])
  const Admin = useMemo(() => ({ admin, setAdmin }), [admin, setAdmin])

  return (
    <>
      <BrowserRouter>
        <ShopContext.Provider value={Shop}>
        <AdminContext.Provider value={Admin}>
            <NavBar />
            <Routes>
              <Route exact='true' path='/' element={shop ? <Portal /> : <HomePage />} />
              <Route exact='true' path='/howto' element={<HowTo />} />
              <Route exact='true' path='/signup' element={<SignUpForm />} />
              <Route exact='true' path='/login' element={<Login />} />
              <Route exact='true' path='/portal' element={<Portal />} />
              <Route exact='true' path='/newEstimate' element={<NewEstimate />} />
            </Routes>
        </AdminContext.Provider>
        </ShopContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
