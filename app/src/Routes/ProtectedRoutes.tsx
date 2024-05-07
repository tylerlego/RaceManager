import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserService } from '../Services/UserService';
import { Loader, LoadingOverlay } from '@mantine/core';

export default function PrivateRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const userService = new UserService();
  const isAuth = async () => {
    await userService.getAuthUser().then((res: any) => {
      if (res.status === 200 && res.data) setIsLoggedIn(true)
      setIsChecking(false);
      return;
    })
  };

  useEffect(() => {
    isAuth();
  }, [isLoggedIn]);

  if(isChecking) return (
    <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
  )

  return (
    isLoggedIn ? <Outlet/> : <Navigate to='/login'/>
  )
}

