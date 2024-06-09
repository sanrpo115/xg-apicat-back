
import { CustomError } from "../../../../src/domain";
import { UserMapper } from "../../../../src/infrastructure";

describe('Unit test user mapper', () => {

  it ('should return bad request error by Missing id', async () => {
    let responseObject = { name: "John Doe", email: 'john@example.com', password: 'password123' };
    
    try {
      UserMapper.userEntityFromObject(responseObject);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Missing id');
      expect(error.statusCode).toBe(400);
    }
      
  })
  
  it ('should return bad request error by Missing name', async () => {
    let responseObject = { id: '123', _id: '456', email: 'john@example.com', password: 'password123' };
    
    try {
      UserMapper.userEntityFromObject(responseObject);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Missing name');
      expect(error.statusCode).toBe(400);
    }
      
  })
  
  it ('should return bad request error by Missing email', async () => {
    let responseObject = { id: '123', _id: '456', name: "John Doe", password: 'password123' };
    
    try {
      UserMapper.userEntityFromObject(responseObject);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Missing email');
      expect(error.statusCode).toBe(400);
    }
      
  })
  
  it ('should return bad request error by Missing password', async () => {
    let responseObject = { id: '123', _id: '456', name: "John Doe", email: 'john@example.com' };
    
    try {
      UserMapper.userEntityFromObject(responseObject);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe('Missing password');
      expect(error.statusCode).toBe(400);
    }
      
  })
});