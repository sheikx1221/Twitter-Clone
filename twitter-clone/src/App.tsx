import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoadingState } from './enums/loading';
import { HomePage } from './pages/home';
import { LoaderScreen } from './pages/loader';
import { LoginPage } from './pages/login';
import './scss/styles.scss';
import { UserContextProvider } from './providers/user';

function App() {
  const [loading, setLoading] = useState(LoadingState.LOADING);
  // const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  async function validateUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, 5000);
    })
  }

  useEffect(() => {
    async function init() {
      const user = await validateUser();
      setLoading(LoadingState.NONE);
      if (!user) navigate("/flow/login");
      else navigate(location.pathname || "/home");
    }

    init();
  }, []);

  return (
    <>
      {loading === LoadingState.LOADING ? (
        <LoaderScreen />
      ) : (
        <UserContextProvider >
          <Routes >
            <Route path='/home' element={<HomePage />} />
            <Route path='/flow/login' element={<LoginPage />} />
          </Routes>
        </UserContextProvider>
      )}
    </>
  )
}

export default App
