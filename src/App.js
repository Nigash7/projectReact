import './App.css';
import Login from './pages/Login.js';
import Signup from './pages/signup.js';
import Router from './pages/router.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './pages/navbar.js';
import Home from './pages/HomePage.js';
import ProtectedRoute from './pages/Protected_Route.js';
import Compare from './pages/Compare.js';
import Logout from './pages/Logout.js';

function App() {
  return (
    <BrowserRouter basename="/projectReact">
      <div>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route index element={<Signup />} />
          <Route
            path='/compare'
            element={
              <ProtectedRoute>
                <Compare />
              </ProtectedRoute>
            }
          />
          <Route
            path='/logout'
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
