import React, { useEffect, useState } from 'react';
import '@mantine/core/styles.css';
import { AppShell, Burger, Button, ButtonGroup } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import StaffDashboard from './Components/StaffDashboardComponent';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './Components/HomeComponent';
import EventListComponent from './Components/EventListComponent';
import CreatorComponent from './Components/CreatorComponent';
import ProfileComponent from './Components/ProfileComponent';
import LoginComponent from './Components/Login/LoginComponent';
import LoginSuccessComponent from './Components/Login/LoginSuccessComponent';
import LoginErrorComponent from './Components/Login/LoginErrorComponent';
import HomeComponent from './Components/HomeComponent';

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [title, setTitle] = useState('JJC Racing Member Site');
  const location = useLocation();
  const isAuthenticated = true;

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('Home');
        break;
      case '/profile':
        setTitle('Profile');
        break;
      case '/events':
        setTitle('Upcoming Events');
        break;
      case '/teamstats':
        setTitle('Team Results');
        break;
      case '/dashboard':
        setTitle('Staff Dashboard');
        break;
      case '/creator':
        setTitle('Event Creator');
        break;
      default:
        setTitle('');
        break;
    };
  }, [location]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path='/login/success' element={<LoginSuccessComponent />} />
        <Route path='/login/error' element={<LoginErrorComponent />} />
        <Route path='/home/*' element={<HomeComponent />} />
      </Routes>
    </AppShell>
  );
}

export default App;
