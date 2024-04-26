import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'prod' ? 
    process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_LOCAL
});

class CarService {
  public async getAllCarClasses(): Promise<any> {
    try {
      const response = await client('api/car/classes', {
        method: 'GET',
        withCredentials: true
      });
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to get car class data', error);
    }
  }

  public async getAllCars(): Promise<any> {
    try {
      const response = await client('api/car', {
        method: 'GET',
        withCredentials: true
      });
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
