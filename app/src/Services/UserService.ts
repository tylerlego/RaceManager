import axios from 'axios';

const client = axios.create({
  baseURL: process.env.ENVIRONMENT === 'prod' ? 
    process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_LOCAL
});

class UserService {
  public async getUserById(userId: number): Promise<any> {
    try {
      const user = await client.get(`api/user/${userId}`, {withCredentials: true});
      if (!user) {
        throw new Error('User not found');
      } else {
        return user;
      }
    } catch (error) {
      throw new Error('Failed to get user');
    }
  }

  // public async getAllUsers(): Promise<any> {
  //   try {
  //     const users = await client.get(`api/user/`);
  //     if (!users.data) {
  //       throw new Error('Users not found');
  //     } else {
  //       return users.data;
  //     }
  //   } catch (error) {
  //     throw new Error('Failed to get users');
  //   }
  // }

  public async getAuthUser(): Promise<any> {
    try {
      const user = await client.get(`api/user/auth-user`, {withCredentials: true});
      if (!user) {
        throw new Error('User not found');
      } else {
        return user;
      }
    } catch (error) {
      throw new Error('Failed to get user');
    }
  }
}

export { UserService };