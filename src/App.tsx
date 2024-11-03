import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './utils/store.ts';
import Login from "./pages/Auth/LoginPage.tsx";
import AppRouter from './pages/AppRouter.tsx';
import api from './utils/Axios.ts';
import { useEffect, useState } from 'react';
import { setUser } from './utils/userSlice.ts';

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);



  const authenticatedUser = async () => {

    try {
      setLoading(true);

      let response = await api.get('/auth/getAuthenticatedUser');

      if (response.status === 200) {
        let user = {
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          isAuthenticated: true
        }
        dispatch(setUser(user));
        setLoading(false);
      }

    } catch (error: any) {
      setLoading(false);
    }

  }

  useEffect(() => {

      authenticatedUser();


  }, []);

  if (loading) {

    return (
      <div className="w-full h-full flex justify-center items-center ">
        <div className="loader scale-150"></div>
      </div>
    );
  }

  return (
    <div>
      {user.isAuthenticated ? <AppRouter /> : <Login />}
    </div>
  );
}


export default App;
