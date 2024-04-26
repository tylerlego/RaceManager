import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'prod' ? 
    process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_LOCAL
});

class CarService {
  public async getAllCarClasses(): Promise<any> {
    try {
      const response = await fetch('http://localhost:4000/api/car/classes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        },
        credentials: 'include',
      });
      const classes = await response.json();
      console.log("CLASS RES", classes)
      // const response = await client('api/car/classes', {
      //   method: 'GET',
      //   withCredentials: true
      // });
      return response;
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
