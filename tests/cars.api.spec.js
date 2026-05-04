import { test, expect } from '@playwright/test';
import AuthController from '../support/controllers/AuthController';
import CarsController from '../support/controllers/CarsController';

test.describe('Cars API', () => {
  let carsController;

  test.beforeEach(async ({ request }) => {
    const authController = new AuthController(request);
    carsController = new CarsController(request);

    const signInResponse = await authController.signIn(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD
    );

    expect(signInResponse.status()).toBe(200);
  });

  test('Positive: should create a car with valid data', async () => {
    const response = await carsController.createCar({
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.status).toBe('ok');
    expect(body.data.carBrandId).toBe(1);
    expect(body.data.carModelId).toBe(1);
    expect(body.data.mileage).toBe(122);

    await carsController.deleteCar(body.data.id);
  });

  test('Negative1: should not create a car without mileage', async () => {
    const response = await carsController.createCar({
      carBrandId: 1,
      carModelId: 1,
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.status).toBe('error');
  });

  test('Negative2: should not create a car with invalid brand id', async () => {
    const response = await carsController.createCar({
      carBrandId: 999999,
      carModelId: 1,
      mileage: 122,
    });

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.status).toBe('error');
  });
});