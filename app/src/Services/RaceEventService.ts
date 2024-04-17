import axios from 'axios';
import { RaceEvent } from '../Types/RaceEvent';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

class RaceEventService {
  public async getAllEvents(): Promise<any> {
    try {
      const response = await client.get('api/events');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get race event data');
    }
  }

  public async addRaceEvent(raceEventData: RaceEvent): Promise<any> {
    try {
      const response = await client.post('api/events/create', raceEventData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create race event');
    }
  }
}

export { RaceEventService };
