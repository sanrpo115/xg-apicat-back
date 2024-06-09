import { CustomError, LoginUserDto } from "../../../../../src/domain";

describe('Unit test Login User DTO', () => {
  
  it ('should return bad request error by Email not valid', async () => {
    let dto = { email: '@example.c', password: 'password123' };
    try {
      LoginUserDto.create(dto);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Email is not valid');
      expect(error.statusCode).toBe(400);
    }
  });
  
  it ('should return bad request error by Missing password', async () => {
    let dto = { email: 'john@example.com' };
    try {
      LoginUserDto.create(dto);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Missing password');
      expect(error.statusCode).toBe(400);
    }
  });
  
  it ('should return bad request error by Password to short', async () => {
    let dto = { email: 'john@example.com', password: '12' };
    try {
      LoginUserDto.create(dto);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Password too short');
      expect(error.statusCode).toBe(400);
    }
  });

});