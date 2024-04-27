import { Button } from "@mantine/core";
import { UserService } from "../../Services/UserService";

export default function LoginComponent() {
  const userService = new UserService();

  const baseURL = process.env.REACT_APP_ENVIRONMENT === 'prod' ? 
      process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_LOCAL;

  const fetchUser = async () => {
    const res = await userService.getAuthUser().catch((error) => {
      console.error('Failed to get user', error);
    });

    if (res) {
      console.log("User data", res.data);
      return res.data;
    }

  }

  const discordLogin = async () => {
    let timer: NodeJS.Timeout | null = null;
    const discordLoginURL =`${baseURL}/api/auth/login/discord`;
    const newWindow = window.open(
      discordLoginURL,
      "_blank",
      "width=500,height=1000"
    );

    if (newWindow) {
      timer = setInterval(async () => {
        if (newWindow.closed) {
          if (timer) clearInterval(timer);
          const user = fetchUser();
          console.log("User", user);
          window.location.href = '/home';
        }
      }, 100);
    }
  };

  return (
    <div>
      <Button onClick={ discordLogin }>Login with Discord</Button>
    </div>
  );
}