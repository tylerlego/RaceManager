import { AppShell, Avatar, Burger, Button, ButtonGroup, Container, Group, Text } from "@mantine/core";
import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import classes from '../Styles/header-menu.module.scss';
import { SocialIcon } from "react-social-icons";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { Link } from "react-router-dom";

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
  const user = useAppSelector((state) => state.app.user);
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);
  const dispatch = useAppDispatch();

  const items = links.map((link) => {
    return (
      <Link 
        to={link.link} 
        className={classes.link} 
        data-active={active === link.link || undefined}
        key={link.label}
      >
        {link.label}
      </Link>
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
        navbar={{ width: 300, breakpoint: 'md', collapsed: {mobile: !opened, desktop: true}}}
        padding="md"
      >
        <AppShell.Header className={classes.header}>
          <Container className={classes.headerContainer} size="lg">
            <div className={classes.inner}>
              <Button variant="transparent" component="a" href='/' className={classes.logo}>
                <Text className={classes.logoText}>
                  <span className={classes.logoFirst}>JJC </span>
                  <span className={classes.logoSecond}>RACING</span>  
                </Text>
              </Button>
              <Group gap={5} visibleFrom="md">
                {items}
              </Group>
              <Burger className={classes.burger} opened={opened} onClick={toggle} size="sm" hiddenFrom="md" />
            </div>
          </Container>
        </AppShell.Header>
        <AppShell.Navbar p="sm">
          <ButtonGroup className={classes.sideNavGroup} orientation='vertical'>
            <Link onClick={toggle} className={classes.sideNavLink} to='/' > 
              Home
            </Link>
            <Link onClick={toggle} className={classes.sideNavLink} to="/profile">
              Profile
            </Link>
            <Link onClick={toggle} className={classes.sideNavLink} to='/events'>
              Upcoming Events
            </Link>
            <Link onClick={toggle} className={classes.sideNavLink} to='/teamstats'>
              Team Results
            </Link>
            <Link onClick={toggle} className={classes.sideNavLink} to='/dashboard'>
              Staff Dashboard
            </Link>
            <Link onClick={toggle} className={classes.sideNavLink} to='/creator'>
              Event Creator
            </Link> 
        </ButtonGroup>
        <Container style={{padding: '10px', fontStyle: 'italic'}} hiddenFrom="md">
          <Group style={{justifyContent: "center", padding: '5px'}}>
            <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://www.instagram.com/jjcracing2751/"/>
            <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://www.youtube.com/@JJCRacing2751"/>
            <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://discord.gg/Q63EVQ9qGK"/>
          </Group>
          {/* <Group style={{justifyContent: "center", padding: '5px'}}>
            <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://www.linkedin.com/in/tylerlego/"/>
            <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://github.com/tylerlego"/>
          </Group>
          <Group style={{justifyContent: "center"}}>
            Tyler Lego 2024
          </Group> */}
        </Container>
      </AppShell.Navbar>
        <AppShell.Main>
          <h1>
            {title}
          </h1>
          <Outlet />
        </AppShell.Main>
        <AppShell.Footer withBorder={false} visibleFrom="sm">
          <Container className={classes.footer} fluid={true} size="md">
            <Group className={classes.footerGroupLeft}>
              <Avatar size="md" src={require('../imgs/jjc.jpeg')} alt="JJC Racing" />               <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://www.instagram.com/jjcracing2751/"/>
              <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://www.youtube.com/@JJCRacing2751"/>
              <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://discord.gg/Q63EVQ9qGK"/>
            </Group>
            <Group className={classes.footerGroupRight}>
              <Text>Tyler Lego 2024</Text>
              <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://www.linkedin.com/in/tylerlego/"/>
              <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://github.com/tylerlego"/>
              <Avatar size="md" src={user.discordAvatar} alt="no image here" />
             </Group>
          </Container>
        </AppShell.Footer>
      </AppShell>
    );
  } else {
    return <></>
  }
}