import React from 'react';
import './App.css';
import RaceSignupForm from './Components/RaceSignupForm';
import '@mantine/core/styles.css';
import { AppShell, Burger, Image, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider>
      {/* <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 150,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <div>
            <Image
              radius="md"
              h={55}
              w={55}
              src="http://localhost:3000/imgs/jjc.jpeg"
            />
          </div>
        </AppShell.Header>
        <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

        <AppShell.Main>
          <div className="App">
            <header className="App-header">
              <p>
                JJC Racing Special Event Registration Form
              </p>
            </header>
            <RaceSignupForm />
          </div>
        </AppShell.Main>
      </AppShell> */}

      <div className="App">
        <header className="App-header">
          <p>
            JJC Racing Special Event Registration Form
          </p>
        </header>
        <RaceSignupForm />
      </div>
    </MantineProvider>
  );
}

export default App;
