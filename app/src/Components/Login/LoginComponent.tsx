import { Card, Center, Group, Paper, Text } from "@mantine/core";
import { DiscordLoginButton } from "react-social-login-buttons";
import classes from '../../Styles/login.module.scss';
import { useDisclosure } from "@mantine/hooks";
import { SocialIcon } from 'react-social-icons'
import { Outlet } from "react-router";

export default function LoginComponent() {
  const [loginHoverState, handleLoginHoverState ] = useDisclosure(false);
  const [inviteHoverState, handleInviteHoverState ] = useDisclosure(false);

  const baseURL = process.env.REACT_APP_ENVIRONMENT === 'prod' ? 
      process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_LOCAL;

  const discordLogin = async () => {
    let timer: NodeJS.Timeout | null = null;
    const discordLoginURL =`${baseURL}/api/auth/login/discord`;
    const newWindow = window.open(
      discordLoginURL,
      "_blank",
    );

    if (newWindow) {
      timer = setInterval(async () => {
        if (newWindow.closed) {
          if (timer) clearInterval(timer);
          window.location.href = '/';
        }
      }, 100);
    }
  };

  return (
    <Paper style={{textAlign: 'center'}} radius="md" p="xl">
      <Center>
        <Card className={classes.loginCard} withBorder shadow="sm" padding="lg" radius="sm">
          <Center>
            <Group style={{maxWidth: "500px"}} mb="md" mt="md">
              <Text className={classes.loginText}>Welcome to JJC Racing! If you are already a member of the JJC Racing Discord server, click below to access the app:</Text>
              <DiscordLoginButton onMouseEnter={handleLoginHoverState.open} onMouseLeave={handleLoginHoverState.close} iconColor={loginHoverState ? '#EF8C01' : 'black'} className={classes.loginButton} text="Login with Discord" align="center" onClick={ discordLogin } />
              <Text className={classes.loginText}>If you wish to become a member of the team or check out what we are all about, join our server with the button below!</Text>
              <DiscordLoginButton onMouseEnter={handleInviteHoverState.open} onMouseLeave={handleInviteHoverState.close} iconColor={inviteHoverState ? '#EF8C01' : 'black'} className={classes.loginButton} text="Join JJC Racing" align="center" onClick={ () => window.open('https://discord.gg/Q63EVQ9qGK', '_blank') } />
              <SocialIcon target="_blank" bgColor="black" url="https://www.instagram.com/jjcracing2751/"/>
              <SocialIcon target="_blank" bgColor="black" url="https://www.youtube.com/@JJCRacing2751"/>
            </Group>
          </Center>
        </Card>    
      </Center>
      <Outlet />
    </Paper>
  );
}