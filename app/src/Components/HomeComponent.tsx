import { AppShell, Burger, Button, ButtonGroup } from "@mantine/core";
import { Route, Routes, useLocation } from "react-router";
import ProfileComponent from "./ProfileComponent";
import EventListComponent from "./EventListComponent";
import StaffDashboardComponent from "./StaffDashboardComponent";
import CreatorComponent from "./CreatorComponent";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export default function HomeComponent() {
  const [opened, { toggle }] = useDisclosure();
  const [title, setTitle] = useState('JJC Racing Member Site');
  const location = useLocation();

  return (
    <>
      <AppShell.Header >
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
        <ButtonGroup
          orientation='vertical'
        >
            <Button component='a' href='/home' variant='subtle'>
              Home
            </Button>
            <Button component='a' href='/home/profile' variant='subtle'>
              Profile
            </Button>
            <Button component='a' href='/home/events' variant='subtle'>
              Upcoming Events
            </Button>
            <Button component='a' href='/home/teamstats' variant='subtle'>
              Team Results
            </Button>
            <Button component='a' href='/home/dashboard' variant='subtle'>
              Staff Dashboard
            </Button>
            <Button component='a' href='/home/creator' variant='subtle'>
              Event Creator
            </Button> 
        </ButtonGroup>
      </AppShell.Navbar>
      <AppShell.Main>
        <header className="App-header">
          <h1>
            {title}
          </h1>
        </header>
        <Routes>
          <Route path='/' element={<p>JJC RACING</p>} />
          <Route path='/profile' element={<ProfileComponent />} />
          <Route path='/events' element={<EventListComponent />} />
          <Route path='/teamstats' element={<p>page not implemented</p>} />
          <Route path='/dashboard' element={<StaffDashboardComponent />} />
          <Route path='/creator' element={<CreatorComponent />} />
          <Route path='*' element={<p>404 not found</p>} />
        </Routes>
      </AppShell.Main>
  </>
  );
}