export default class CarsController {
  constructor(request) {
    this.request = request;
  }

  async createCar(data) {
    return this.request.post('/api/cars', {
      data,
    });
  }

  async deleteCar(carId) {
    return this.request.delete(`/api/cars/${carId}`);
  }
}