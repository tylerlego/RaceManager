import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'prod' ? 
    process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_LOCAL,
  withCredentials: true,
});

class IndexService {
  constructor() { 
    client.defaults.withCredentials = true;
  }
  public async getServerStatus(): Promise<any> {
    try {
      const response = await client.get('api/home');
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to get server status', error);
    }
  }
}

export { IndexService };