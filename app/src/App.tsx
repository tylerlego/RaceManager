import React from 'react';
import './App.css';
import RaceSignupForm from './Components/RaceSignupForm';
import '@mantine/core/styles.css';
import { AppShell, Burger, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import StaffDashboard from './Components/StaffDashboard';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const [opened, { toggle }] = useDisclosure();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RaceSignupForm />,
    },
    {
      path: "/signup",
      element: <RaceSignupForm />,
    },
    {
      path: "/dashboard",
      element: <StaffDashboard />,
    },
  ]);

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
              JJC Racing Member Site
            </p>
          </div>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Group 
            justify='center'
          >
            <AppShell.Section>
              <Button component='a' href='404' variant='subtle'>
                Profile/Stats
              </Button>
            </AppShell.Section>
            <AppShell.Section>
              <Button component='a' href='/signup' variant='subtle'>
                Upcoming Events
              </Button>
            </AppShell.Section>
            <AppShell.Section>
              <Button component='a' href='404' variant='subtle'>
                Team Results
              </Button>
            </AppShell.Section>
            <AppShell.Section>
              <Button component='a' href='/dashboard' variant='subtle'>
                Staff Dashboard
              </Button>
            </AppShell.Section>
          </Group>
        </AppShell.Navbar>
        <AppShell.Main>
            <RouterProvider router={router} />
        </AppShell.Main>
      </AppShell>

  );
}

export default App;
