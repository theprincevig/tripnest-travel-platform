import { Route, Routes } from 'react-router-dom';
import { useAuthStore } from './stores/useAuthStore';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useExchangeRateStore } from './stores/useExchangeRateStore';

import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';
import Home from './pages/dashboard/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Listing from './pages/dashboard/Listing';
import MyListings from './pages/dashboard/MyListings';
import ChangePassword from './pages/password/ChangePassword';
import CreateListing from './pages/listing/CreateListing';
import UpdateListing from './pages/listing/UpdateListing';
import ViewProfile from './pages/profile/ViewProfile';
import UpdateProfile from './pages/profile/UpdateProfile';

function App() {
  const { session } = useAuthStore();
  const { fetchRates } = useExchangeRateStore();

  useEffect(() => {
    session();
    fetchRates();
  }, [session, fetchRates]);

  return (
    <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/listings/:listingId' element={<Listing />} />
          <Route path='/listings/:listingId/edit' element={
              <ProtectedRoute>
                <RoleRoute role="host">
                  <UpdateListing />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />

          <Route path='/new' element={
              <ProtectedRoute>
                <RoleRoute role="host">
                  <CreateListing />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

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

          {/* User's profile */}
          <Route path='/users/:username' element={
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            }
          />
          <Route path='/users/me' element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Toaster />
    </div>
  )
}

export default App
