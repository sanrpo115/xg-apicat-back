import { Validators } from "../../../src/config";

describe('Validators email', () => {
  
  it('should validate correct email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co',
      'user_name@domain.com',
      'user-name@domain.com',
      'user.name+tag+sorting@example.com',
    ];
    validEmails.forEach(email => {
      expect(Validators.email.test(email)).toBe(true);
    });
  });

  it('should invalidate incorrect email addresses', () => {
    const invalidEmails = [
      'plainaddress',
      '@missingusername.com',
      'username@.com',
      'username@domain.c',
      'username@domain.toolong',
      'username@domain.c_m',
      'username@domain.com.',
      'usern@me@domain.com',
    ];

    invalidEmails.forEach(email => {
      expect(Validators.email.test(email)).toBe(false);
    });
  });

});