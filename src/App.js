import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Moderator from './pages/Moderator/Moderator';
import { bilgilerGetir } from './features/yoneticiler/yoneticiSlice';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {

  const yoneticiStorage = JSON.parse(localStorage.getItem('yonetici'))
  const { isSuccess } = useSelector((state) => state.yoneticiState)
  const dispatch = useDispatch()

  useEffect(() => {
    if (yoneticiStorage) {
      dispatch(bilgilerGetir(yoneticiStorage.uid))
    }
  }, [isSuccess])

  return (
    <div className="body">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/moderator' element={<Moderator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
