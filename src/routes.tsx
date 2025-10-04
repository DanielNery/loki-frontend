import { Routes as RoutesDOM, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Entries from './pages/Entries';
import Entry from './pages/Entry';
import Investing from './pages/Investing';
import Login from './pages/Login';
import Extract from './pages/Extract';
import Habits from './pages/Habits';
import Compras from './pages/Compras';

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('access_token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default function Routes() {
    return (
        <RoutesDOM>
            <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
            <Route path='/entries' element={<RequireAuth><Entries /></RequireAuth>} />
            <Route path='/entry/:id' element={<RequireAuth><Entry /></RequireAuth>} />
            <Route path='/investing' element={<RequireAuth><Investing /></RequireAuth>} />
            <Route path='/compras' element={<RequireAuth><Compras /></RequireAuth>} />
            <Route path='/login' element={<Login />} />
            <Route path='/extract' element={<RequireAuth><Extract /></RequireAuth>} />
            <Route path='/habits' element={<RequireAuth><Habits /></RequireAuth>} />
        </RoutesDOM>
    )
}