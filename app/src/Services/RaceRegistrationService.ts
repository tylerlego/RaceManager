import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'prod' ? 
    process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_LOCAL
});

class RaceRegistrationService {
  public async addRaceRegistration(registrationData: any): Promise<any> {
    try {
      const response = await client.post('api/race/registration', registrationData, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add race registration');
    }
  }

  public async getAllRegistrationRecords(): Promise<any> {
    try {
      const response = await client.get('api/race/registration', { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get race registration data');
    }
  }
}

export { RaceRegistrationService };
