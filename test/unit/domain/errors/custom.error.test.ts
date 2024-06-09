import { CustomError } from "../../../../src/domain";

describe('', () => {

  it('should return CustomError unauthorized', () => {
    const error = CustomError.unauthorized('Unauthorized');
    expect(error.statusCode).toBe(401);
  })
  
  it('should return CustomError forbidden', () => {
    const error = CustomError.forbidden('Forbidden');
    expect(error.statusCode).toBe(403);
  })
  
  it('should return CustomError notFound', () => {
    const error = CustomError.notFound('Not Found');
    expect(error.statusCode).toBe(404);
  })
  
  it('should return CustomError unauthorized', () => {
    const error = CustomError.internalServer();
    expect(error.statusCode).toBe(500);
  })

});