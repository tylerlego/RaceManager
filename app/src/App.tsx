import React, { useEffect, useState } from 'react';
import './App.css';
import '@mantine/core/styles.css';
import { AppShell, Burger, Button, ButtonGroup } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import StaffDashboard from './Components/StaffDashboardComponent';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './Components/HomeComponent';
import EventListComponent from './Components/EventListComponent';

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [title, setTitle] = useState('JJC Racing Member Site');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('JJC Racing Member Site');
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
      default:
        setTitle('JJC Racing Member Site');
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
      <AppShell.Header  >
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>
          <p>
            JJC Racing Member Site - Under Construction!
          </p>
        </div>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <ButtonGroup
          orientation='vertical'
          style={{ textAlign: 'center' }}
        >
          <AppShell.Section>
            <Button component='a' href='/' variant='subtle'>
              Home
            </Button>
          </AppShell.Section>
          <AppShell.Section>
            <Button component='a' href='/profile' variant='subtle'>
              Profile
            </Button>
          </AppShell.Section>
          <AppShell.Section>
            <Button component='a' href='/events' variant='subtle'>
              Upcoming Events
            </Button>
          </AppShell.Section>
          <AppShell.Section>
            <Button component='a' href='/teamstats' variant='subtle'>
              Team Results
            </Button>
          </AppShell.Section>
          <AppShell.Section>
            <Button component='a' href='/dashboard' variant='subtle'>
              Staff Dashboard
            </Button>
          </AppShell.Section>
        </ButtonGroup>
      </AppShell.Navbar>
      <AppShell.Main>
          <header className="App-header">
            <h1>
              {title}
            </h1>
          </header>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/profile' element={<p>page not implemented</p>} />
              <Route path='/events' element={<EventListComponent />} />
              <Route path='/teamstats' element={<p>page not implemented</p>} />
              <Route path='/dashboard' element={<StaffDashboard />} />
            </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
