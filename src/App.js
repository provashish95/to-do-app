import logo from './logo.svg';
import './App.css';
import Navbar from './components/Header/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
