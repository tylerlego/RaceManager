import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'prod' ? 
    process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_LOCAL,
  withCredentials: true,
});

class CarService {
  baseURL = process.env.REACT_APP_ENVIRONMENT === 'prod' ? 
    process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_LOCAL;

  public async getAllCarClasses(): Promise<any> {
    try {
      const response = await client.get('api/car/classes');
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to get car class data', error);
    }
  }

  public async getAllCars(): Promise<any> {
    try {
      const response = await client.get('api/car');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get car data');
    }
  }

  public async addCar(car: any): Promise<any> {
    try {
      const response = await client.post('api/car', car);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add car');
    }
  }

  public async getCarById(carId: string): Promise<any> {
    try {
      const response = await client.get(`api/car/${carId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get car by id');
    }
  }
}

export { CarService };
