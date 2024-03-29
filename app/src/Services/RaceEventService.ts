import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

class RaceEventService {
  public async getAllEvents(): Promise<any> {
    try {
      const response = await client.get('events');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get race event data');
    }
  }
}

export { RaceEventService };
