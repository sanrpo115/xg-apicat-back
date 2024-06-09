import { CustomError, RegisterUserDto } from "../../../../../src/domain";

describe('Unit test RegisterUserDto', () => {

  it ('should return bad request Missing name', async () => {
    let dto = { email: 'john@example.com', password: 'password123' };
    try {
      RegisterUserDto.create(dto);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Missing name');
      expect(error.statusCode).toBe(400);
    }
  });
  
  it ('should return bad request by Email is not valid', async () => {
    let dto = { name: 'John Doe', email: '@example.com', password: 'password123' };
    try {
      RegisterUserDto.create(dto);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Email is not valid');
      expect(error.statusCode).toBe(400);
    }
  });
  

  it ('should return bad request error by Missing password', async () => {
    let dto = { name: 'John Doe', email: 'john@example.com' };
    try {
      RegisterUserDto.create(dto);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Missing password');
      expect(error.statusCode).toBe(400);
    }
  });
  
  it ('should return bad request error by Password to short', async () => {
    let dto = { name: 'John Doe', email: 'john@example.com', password: '12' };
    try {
      RegisterUserDto.create(dto);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Password too short');
      expect(error.statusCode).toBe(400);
    }
      
  });

});