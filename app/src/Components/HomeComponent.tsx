import { AppShell, Avatar, Burger, Button, ButtonGroup, Container, Group, Text } from "@mantine/core";
import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import classes from '../Styles/header-menu.module.scss';
import { SocialIcon } from "react-social-icons";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { Link } from "react-router-dom";
import { User } from "../Types/User";

const links = [
  { link: '/', label: 'Home', staff: false },
  { link: '/profile', label: 'Profile', staff: false},
  { link: '/events', label: 'Events', staff: false},
  { link: '/teamstats', label: 'Team Stats', staff: false},
  { link: '/dashboard', label: 'Staff Dashboard', staff: true},
  { link: '/creator', label: 'Event Creator', staff: true },
];

export default function HomeComponent() {
  const [opened, { toggle }] = useDisclosure();
  const [title, setTitle] = useState('');
  const [active, setActive] = useState('');
  const [linkItems, setLinkItems] = useState([] as any);
  const isStaff = useAppSelector((state) => state.app.isStaff);
  const location = useLocation();
  const user: User | null = useAppSelector((state) => state.app.user);

  useEffect(() => {
    const items = links.map((link) => {
      if (!link.staff) {      
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
      } else if (isStaff) {
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
      }
    });
    setLinkItems(items);
  }, [active]);

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

  if (title && user) {
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
                {linkItems}
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
              Events
            </Link>
            <Link onClick={toggle} className={classes.sideNavLink} to='/teamstats'>
              Team Stats
            </Link>
            {isStaff && (
              <>
                <Link onClick={toggle} className={classes.sideNavLink} to='/dashboard'>
                  Staff Dashboard
                </Link>
                <Link onClick={toggle} className={classes.sideNavLink} to='/creator'>
                  Event Creator
                </Link>
              </>
            )}
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
              <Avatar size="md" src={require('../imgs/jjc.jpeg')} alt="JJC Racing" />               
              <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://www.instagram.com/jjcracing2751/"/>
              <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://www.youtube.com/@JJCRacing2751"/>
              <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://discord.gg/Q63EVQ9qGK"/>
            </Group>
            <Group className={classes.footerGroupRight}>
              <Text>Tyler Lego 2024</Text>
              <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://www.linkedin.com/in/tylerlego/"/>
              <SocialIcon style={{height: '30px', width: '30px'}} target="_blank" bgColor="black" url="https://github.com/tylerlego"/>
             </Group>
          </Container>
        </AppShell.Footer>
      </AppShell>
    );
  } else {
    return <></>
  }
}