import '@mantine/core/styles.css';
import { Route, Routes } from 'react-router-dom';
import LoginComponent from './Components/Login/LoginComponent';
import LoginSuccessComponent from './Components/Login/LoginSuccessComponent';
import LoginErrorComponent from './Components/Login/LoginErrorComponent';
import HomeComponent from './Components/HomeComponent';
import PrivateRoutes from './Routes/ProtectedRoutes';


function App(){
  return (
    <Routes>
      <Route element={<PrivateRoutes />}> 
        <Route path='/*' element={<HomeComponent />} />
      </Route>
      <Route path='/login' element={<LoginComponent />} />
      <Route path='/login/success' element={<LoginSuccessComponent />} />
      <Route path='/login/error' element={<LoginErrorComponent />} /> 
    </Routes>
  );
}

export default App;
