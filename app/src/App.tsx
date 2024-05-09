import '@mantine/core/styles.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginComponent from './Components/Login/LoginComponent';
import LoginSuccessComponent from './Components/Login/LoginSuccessComponent';
import LoginErrorComponent from './Components/Login/LoginErrorComponent';
import HomeComponent from './Components/HomeComponent';
import ProfileComponent from './Components/ProfileComponent';
import EventListComponent from './Components/Event/EventListComponent';
import StaffDashboardComponent from './Components/StaffDashboardComponent';
import CreatorComponent from './Components/CreatorComponent';
import { useEffect, useState } from 'react';
import { UserService } from './Services/UserService';
import { LoadingOverlay } from '@mantine/core';
import { useAppDispatch, useAppSelector } from './Store/hooks';
import { setIsAuthenticated, setUser } from './Store/appSlice';

function App() {
  const [isChecking, setIsChecking] = useState(true);
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();
  const userService = new UserService();

  const isAuth = async () => {
    console.log("is auth??", isAuthenticated);
    if (isAuthenticated) {
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(user));
      setIsChecking(false);
      return;
    }
    await userService.getAuthUser().then((res: any) => {
      if (res.status === 200 && res.data) {
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(res.data));
      }
      setIsChecking(false);
      return;
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <HomeComponent /> : <Navigate to='/login'/>,
      children: [
      {
        index: true,
        element: <p>JJC Racing</p>,
      },
      {
        path: "profile",
        element: <ProfileComponent />,
      },
      {
        path: "events",
        element: <EventListComponent />,
      },
      {
        path: "teamstats",
        element: <p>page not implemented</p>,
      },
      {
        path: "dashboard",
        element: <StaffDashboardComponent />,
      },
      {
        path: "creator",
        element: <CreatorComponent />,
      }]
    },
    {
      path: "/login",
      element: <LoginComponent />,
      children: [
        {
          path: "success",
          element: <LoginSuccessComponent />,
        },
        {
          path: "error",
          element: <LoginErrorComponent />,
        }
      ]
    }
  ]);

  useEffect(() => {
    isAuth();
  }, [isAuthenticated]);

  if(isChecking) return (
    <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
  )

  return (
    <RouterProvider router={router} />
  );
}

export default App;
