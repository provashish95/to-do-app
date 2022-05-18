
import './App.css';
import Navbar from './components/Header/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Home from './components/Home/Home';
import RequireAuth from './components/Home/RequireAuth';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/home' element={
          <RequireAuth>
            <Home></Home>
          </RequireAuth>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
