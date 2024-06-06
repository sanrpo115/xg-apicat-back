import { compareSync, hashSync } from "bcryptjs";
import { BcryptAdapter } from "../../src/config";

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn(),
  compareSync: jest.fn()
}));

describe('BcryptAdapter', () => {
  describe('hash', () => {
    it('should call bcryptjs hashSync with the correct parameters', () => {
      const password = 'password123';
      BcryptAdapter.hash(password);
      expect(hashSync).toHaveBeenCalledWith(password);
    });
  });

  describe('compare', () => {
    it('should call bcryptjs compareSync with the correct parameters', () => {
      const password = 'password123';
      const hashedPassword = 'hashedPassword';
      BcryptAdapter.compare(password, hashedPassword);
      expect(compareSync).toHaveBeenCalledWith(password, hashedPassword);
    });
  });
});