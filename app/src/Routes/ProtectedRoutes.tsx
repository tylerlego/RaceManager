import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserService } from '../Services/UserService';

export default function PrivateRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const userService = new UserService();
  const isAuth = async () => {
    await userService.getAuthUser().then((res: any) => {
      console.log("USER?", res);
      if (res.status === 200 && res.data) setIsLoggedIn(true)
      setIsChecking(false);
      return;
    })
  };

  useEffect(() => {
    isAuth();
  }, [isLoggedIn]);

  if(isChecking) return <p>Checking for user....</p>

  return (
    isLoggedIn ? <Outlet/> : <Navigate to='/login'/>
  )
}

