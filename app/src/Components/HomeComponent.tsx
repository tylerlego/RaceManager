import { AppShell, Burger, Button, ButtonGroup, Container, Group, Image } from "@mantine/core";
import { Route, Routes, useLocation } from "react-router";
import ProfileComponent from "./ProfileComponent";
import EventListComponent from "./Event/EventListComponent";
import StaffDashboardComponent from "./StaffDashboardComponent";
import CreatorComponent from "./CreatorComponent";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import classes from '../Styles/header-menu.module.scss';

const links = [
  { link: '/', label: 'Home' },
  { link: '/profile', label: 'Profile' },
  { link: '/events', label: 'Events' },
  { link: '/teamstats', label: 'Team Stats' },
  { link: '/dashboard', label: 'Staff Dashboard' },
  { link: '/creator', label: 'Event Creator', links: [] },
];
export default function HomeComponent() {
  const [opened, { toggle }] = useDisclosure();
  const [title, setTitle] = useState('');
  const [active, setActive] = useState('');
  const location = useLocation();

  const items = links.map((link) => {
    return (
      <Button 
        component="a"
        data-active={active === link.link || undefined} 
        key={link.label} 
        href={link.link}
        className={classes.link}
      >
        {link.label}
      </Button>
    );
  });

  useEffect(() => {
    setActive(location.pathname);
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

  if (title) {
    return (
      <AppShell
        header={{ height: 60 }}  
        navbar={{ width: 300, breakpoint: 'lg', collapsed: {mobile: !opened, desktop: true}}}
        padding="md"
      >
        <AppShell.Header className={classes.header}>
          <Container size="md">
            <div className={classes.inner}>
              <a href='/' className={classes.logo}>
                <Image src={require('../imgs/jjc_text_logo.png')} alt="JJC Racing" width={50} height={30} />
              </a>
              <Group gap={5} visibleFrom="sm">
                {items}
              </Group>
              <Burger className={classes.burger} opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
              {/* <p><Avatar size="md" src={require('../imgs/jjc.jpeg')} alt="JJC Racing" /></p> */}
            </div>
          </Container>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <ButtonGroup orientation='vertical'>
            <Button className={classes.sideNavLink} component='a' href='/' variant='subtle'>
              Home
            </Button>
            <Button className={classes.sideNavLink} component='a' href='/profile' variant='subtle'>
              Profile
            </Button>
            <Button className={classes.sideNavLink} component='a' href='/events' variant='subtle'>
              Upcoming Events
            </Button>
            <Button className={classes.sideNavLink} component='a' href='/teamstats' variant='subtle'>
              Team Results
            </Button>
            <Button className={classes.sideNavLink} component='a' href='/dashboard' variant='subtle'>
              Staff Dashboard
            </Button>
            <Button className={classes.sideNavLink} component='a' href='/creator' variant='subtle'>
              Event Creator
            </Button> 
        </ButtonGroup>
      </AppShell.Navbar>
        <AppShell.Main>
          <h1>
            {title}
          </h1>
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
  } else {
    return <></>
  }
}