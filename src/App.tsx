import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './utils/store.ts';
import Login from "./pages/Auth/LoginPage.tsx";
import AppRouter from './pages/AppRouter.tsx';
import api from './utils/Axios.ts';
import { useEffect, useState } from 'react';
import { setUser } from './utils/Slices/userSlice.ts';
import Loading from './components/Loading/Loading.tsx';

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);



  const authenticatedUser = async () => {

    try {
      setLoading(true);

      let response = await api.get('auth/getAuthenticatedUser');

      if (response.status === 200) {
        let user = {
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          isAuthenticated: true
        }
        if(user.email === '' || user.name === '' || user.role === ""){
          window.history.replaceState({}, '', "/")

        }

        dispatch(setUser(user));
        setLoading(false);
      }

    } catch (error: any) {
      setLoading(false);
      window.history.replaceState({}, '', "/")
    }

  }

  useEffect(() => {

    authenticatedUser();

  }, []);

  if (loading) {

    return (
      <Loading />
    );
  }

  if (user.isAuthenticated) {

    return (
      <div className=' flex flex-col w-full h-full'>
        <AppRouter />
      </div>

    );
  } else {

    window.history.pushState({}, '', '/login');
    return (
      <Login />
    );

  }

}


export default App;
