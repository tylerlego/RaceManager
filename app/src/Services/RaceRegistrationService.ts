import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

class RaceRegistrationService {
  public async addRaceRegistration(registrationData: any): Promise<any> {
    try {
      const response = await client.post('api/race/registration', registrationData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add race registration');
    }
  }

  public async getAllRegistrationRecords(): Promise<any> {
    try {
      const response = await client.get('api/race/registration');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get race registration data');
    }
  }
}

export { RaceRegistrationService };
