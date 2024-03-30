import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

class CarService {
  public async getAllCarClasses(): Promise<any> {
    try {
      const response = await client.get('car/classes');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get car class data');
    }
  }

  public async getAllCars(): Promise<any> {
    try {
      const response = await client.get('car');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get car data');
    }
  }
}

export { CarService };
