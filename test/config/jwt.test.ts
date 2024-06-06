import * as jwt from 'jsonwebtoken';
import { JwtAdapter } from '../../src/config';

jest.mock('jsonwebtoken');

describe('JwtAdapter', () => {
  const payload = { userId: 1 };
  const token = 'sample_token';
  const JWT_SEED = 'XpertGroup';

  describe('generateToken', () => {
    it('should generate a token', async () => {
      const signMock = jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options, callback) => {
        callback(null, token);
      });

      const result = await JwtAdapter.generateToken(payload);

      expect(signMock).toHaveBeenCalledWith(payload, JWT_SEED, { expiresIn: '2h' }, expect.any(Function));
      expect(result).toBe(token);

      signMock.mockRestore();
    });

    it('should return null if there is an error generating token', async () => {
      const signMock = jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options, callback) => {
        callback(new Error('sign error'), "");
      });

      const result = await JwtAdapter.generateToken(payload);

      expect(signMock).toHaveBeenCalledWith(payload, JWT_SEED, { expiresIn: '2h' }, expect.any(Function));
      expect(result).toBeNull();

      signMock.mockRestore();
    });
  });

  describe('validateToken', () => {
    it('should validate a token and return the decoded payload', async () => {
      const decodedPayload = { userId: 1 };
      const verifyMock = jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
        (callback as jwt.VerifyCallback)(null, decodedPayload);
      });

      const result = await JwtAdapter.validateToken<typeof payload>(token);

      expect(verifyMock).toHaveBeenCalledWith(token, JWT_SEED, expect.any(Function));
      expect(result).toEqual(decodedPayload);

      verifyMock.mockRestore();
    });

    it('should return null if there is an error validating token', async () => {
      const verifyMock = jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
        (callback as jwt.VerifyCallback)(new jwt.JsonWebTokenError('verify error'), "");
      });

      const result = await JwtAdapter.validateToken<typeof payload>(token);

      expect(verifyMock).toHaveBeenCalledWith(token, JWT_SEED, expect.any(Function));
      expect(result).toBeNull();

      verifyMock.mockRestore();
    });
  });
});