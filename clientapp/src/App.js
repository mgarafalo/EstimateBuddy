import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar';
import HowTo from './components/HowTo';
import SignUpForm from './components/SignUpForm';

export const url = 'http://localhost:8000/api'

function App() {
  document.title = 'EstimateBuddy'
  return (
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route exact='true' path='/' element={<HomePage />} />
          <Route exact='true' path='/howto' element={<HowTo />} />
          <Route exact='true' path='/signup' element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
