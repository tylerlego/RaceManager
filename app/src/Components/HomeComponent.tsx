import { AppShell, Burger, Button, ButtonGroup } from "@mantine/core";
import { Route, Routes, useLocation } from "react-router";
import ProfileComponent from "./ProfileComponent";
import EventListComponent from "./EventListComponent";
import StaffDashboardComponent from "./StaffDashboardComponent";
import CreatorComponent from "./CreatorComponent";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export default function HomeComponent() {
  const [opened, { toggle }] = useDisclosure();
  const [title, setTitle] = useState('JJC Racing Member Site');
  const location = useLocation();

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
      <AppShell.Header >
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        JJC Racing
        {/* <span>
          <Avatar src={process.env.REACT_APP_GUILD_ICON} alt="no image here" />
        </span> */}

      </AppShell.Header>
      <AppShell.Navbar p="md">
        <ButtonGroup
          orientation='vertical'
        >
            <Button component='a' href='/' variant='subtle'>
              Home
            </Button>
            <Button component='a' href='/profile' variant='subtle'>
              Profile
            </Button>
            <Button component='a' href='/events' variant='subtle'>
              Upcoming Events
            </Button>
            <Button component='a' href='/teamstats' variant='subtle'>
              Team Results
            </Button>
            <Button component='a' href='/dashboard' variant='subtle'>
              Staff Dashboard
            </Button>
            <Button component='a' href='/creator' variant='subtle'>
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
    </AppShell>
  );
}