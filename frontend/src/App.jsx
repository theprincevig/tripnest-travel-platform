import { Route, Routes } from 'react-router-dom';
import { useAuthStore } from './stores/useAuthStore';
import { useEffect } from 'react';

import Home from './pages/dashboard/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Listing from './pages/dashboard/Listing';
import MyListings from './pages/dashboard/MyListings';
import ChangePassword from './pages/password/ChangePassword';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';
import RootRoute from './routes/RootRoute';

function App() {
  const { session } = useAuthStore();

  useEffect(() => {
    session();
  }, []);

  return (
    <div>
        <Routes>
          <Route path='/' element={<RootRoute />} />
          <Route path='/listings' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/listings/:listingId' element={<Listing />} />

          {/* Only host */}
          <Route path='/my-listings' element={
            <ProtectedRoute>
              <RoleRoute role="host">
                <MyListings />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path='/change-password' element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
        </Routes>
    </div>
  )
}

export default App
