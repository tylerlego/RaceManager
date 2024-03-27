import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL ? process.env.REACT_APP_BASE_API_URL : 'http://localhost:4000/api/',
});

class RaceSignupService {
  // constructor() {}  
  public async addRaceRegistration(registrationData: any): Promise<any> {
    try {
      const response = await client.post('race/registration', registrationData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add race registration');
    }
  }
}

export { RaceSignupService };
