import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'prod' ? 
    process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_LOCAL
});

class CarService {
  public async getAllCarClasses(): Promise<any> {
    try {
      const response = await client.get('api/car/classes', {withCredentials: true});
      return response.data;
    } catch (error) {
      throw new Error('Failed to get car class data');
    }
  }

  public async getAllCars(): Promise<any> {
    try {
      const response = await client.get('api/car', {withCredentials: true});
      return response.data;
    } catch (error) {
      throw new Error('Failed to get car data');
    }
  }

  public async addCar(car: any): Promise<any> {
    try {
      const response = await client.post('api/car', car, {withCredentials: true});
      return response.data;
    } catch (error) {
      throw new Error('Failed to add car');
    }
  }
}

export { CarService };
