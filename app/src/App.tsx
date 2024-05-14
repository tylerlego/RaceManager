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
import { setIsAuthenticated, setIsStaff, setUser } from './Store/appSlice';
import { RoleEnum } from './Types/Role';

function App() {
  const [isChecking, setIsChecking] = useState(true);
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);
  const isStaff = useAppSelector((state) => state.app.isStaff);
  
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();
  const userService = new UserService();

  const setAuth = async () => {
    console.log("is auth??", isAuthenticated);
    console.log("user", user);
    if (isAuthenticated && user) {
      return;
    }
    await userService.getAuthUser().then((res: any) => {
      if (res.status === 200 && res.data) {
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(res.data));
      }
      return;
    });
  };

  const setStaff = async () => {
    if (user) {
      const staff = true;
      // const staff = user.roles.includes(RoleEnum.TOP_STAFF || RoleEnum.OWNER);

      dispatch(setIsStaff(staff));
      setIsChecking(false);
      return staff;
    }
    setIsChecking(false);
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
    setAuth().then(() => {
      setStaff();
    });
  }, [isAuthenticated]);

  if(isChecking) return (
    <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
  )

  return (
    <RouterProvider router={router} />
  );
}

export default App;
